#!/usr/bin/env node
/**
 * Render "spreadsheet-like CSV" to a sheet-style HTML grid.
 * Usage:
 *   node csv-to-sheet-html.js input.csv output.html
 *
 * Options via env vars:
 *   SHEET_TITLE="My Sheet"
 *   CELL_W=140   (px)
 *   CELL_H=28    (px)
 *   FREEZE_ROWS=1  (number of top rows to freeze; default 1)
 *   FREEZE_COLS=1  (number of left cols to freeze; default 1, for row numbers)
 */

 const fs = require("fs");
 const path = require("path");
 const { parse } = require("csv-parse/sync");
 
 function escapeHtml(v) {
   return String(v ?? "")
     .replaceAll("&", "&amp;")
     .replaceAll("<", "&lt;")
     .replaceAll(">", "&gt;")
     .replaceAll('"', "&quot;")
     .replaceAll("'", "&#39;");
 }
 
 function colName(n) {
   // 1 -> A, 26 -> Z, 27 -> AA
   let s = "";
   while (n > 0) {
     const r = (n - 1) % 26;
     s = String.fromCharCode(65 + r) + s;
     n = Math.floor((n - 1) / 26);
   }
   return s;
 }
 
 function isProbablyNumber(s) {
   const t = String(s ?? "").trim();
   if (!t) return false;
   // allow commas in numbers: 1,234.56
   const normalized = t.replace(/,/g, "");
   return /^-?\d+(\.\d+)?$/.test(normalized);
 }
 
 function buildHtml({ title, grid, maxCols, cellW, cellH, freezeRows, freezeCols }) {
   // We create a big CSS grid: first column is row numbers, first row is column letters.
   // Sticky headers and row numbers imitate a spreadsheet.
   const totalRows = grid.length;
   const totalCols = maxCols;
 
   // Build header row (top-left corner + A..)
   let headerCells = `<div class="corner sticky top left"></div>`;
   for (let c = 1; c <= totalCols; c++) {
     headerCells += `<div class="colhdr sticky top" data-col="${c}">${colName(c)}</div>`;
   }
 
   // Build body rows
   let body = "";
   for (let r = 0; r < totalRows; r++) {
     // row header (numbers start at 1)
     body += `<div class="rowhdr sticky left" data-row="${r + 1}">${r + 1}</div>`;
     const row = grid[r];
     for (let c = 0; c < totalCols; c++) {
       const raw = row[c] ?? "";
       const text = escapeHtml(raw);
       const num = isProbablyNumber(raw);
       const cls = [
         "cell",
         raw === "" ? "empty" : "",
         num ? "num" : "text",
       ].filter(Boolean).join(" ");
 
       // Preserve multiple spaces / line breaks (people sometimes shove "layout" into cells)
       body += `<div class="${cls}" data-r="${r+1}" data-c="${c+1}" title="${escapeHtml(raw)}"><span>${text || "&nbsp;"}</span></div>`;
     }
   }
 
   const css = `
     :root{
       --bg: #0b1020;
       --panel: rgba(255,255,255,0.06);
       --text: rgba(255,255,255,0.92);
       --muted: rgba(255,255,255,0.65);
       --border: rgba(255,255,255,0.14);
       --border2: rgba(255,255,255,0.10);
       --accent: #7dd3fc;
       --cellW: ${cellW}px;
       --cellH: ${cellH}px;
       --rowHdrW: 56px;
       --colHdrH: 34px;
     }
     *{ box-sizing: border-box; }
     body{
       margin:0;
       font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
       background:
         radial-gradient(1200px 600px at 20% 0%, rgba(125,211,252,0.12), transparent 40%),
         radial-gradient(900px 500px at 80% 20%, rgba(167,139,250,0.12), transparent 45%),
         var(--bg);
       color: var(--text);
     }
     .wrap{ max-width: 1400px; margin: 24px auto; padding: 0 16px 40px; }
     header{
       display:flex; flex-wrap:wrap; gap:12px;
       align-items: baseline; justify-content: space-between;
       margin-bottom: 12px;
     }
     h1{ margin:0; font-size: 18px; letter-spacing: 0.2px; }
     .meta{ color: var(--muted); font-size: 12px; }
     .card{
       border: 1px solid var(--border);
       border-radius: 14px;
       background: rgba(255,255,255,0.04);
       overflow: hidden;
       box-shadow: 0 10px 35px rgba(0,0,0,0.35);
     }
     .sheet-wrap{
       overflow: auto;
       max-height: 78vh;
     }
     .sheet{
       display: grid;
       grid-template-columns: var(--rowHdrW) repeat(${totalCols}, var(--cellW));
       grid-template-rows: var(--colHdrH) repeat(${totalRows}, var(--cellH));
       width: max-content;
       min-width: 100%;
       background: rgba(0,0,0,0.10);
     }
 
     /* Header cells */
     .corner, .colhdr, .rowhdr{
       display:flex; align-items:center; justify-content:center;
       font-size: 12px;
       color: var(--muted);
       border-right: 1px solid var(--border);
       border-bottom: 1px solid var(--border);
       background: rgba(11,16,32,0.92);
       backdrop-filter: blur(8px);
       user-select:none;
     }
     .corner{ border-right: 1px solid var(--border); border-bottom: 1px solid var(--border); }
 
     /* Body cells */
     .cell{
       border-right: 1px solid var(--border2);
       border-bottom: 1px solid var(--border2);
       padding: 6px 8px;
       display:flex;
       align-items:center;
       overflow:hidden;
       background: rgba(255,255,255,0.02);
     }
     .cell span{
       display:block;
       width:100%;
       overflow:hidden;
       text-overflow: ellipsis;
       white-space: pre; /* preserve spaces */
     }
     .cell.num{ justify-content:flex-end; font-variant-numeric: tabular-nums; }
     .cell.empty{ background: rgba(255,255,255,0.01); }
 
     /* Sticky headers */
     .sticky.top{ position: sticky; top: 0; z-index: 5; }
     .sticky.left{ position: sticky; left: 0; z-index: 4; }
     .sticky.top.left{ z-index: 6; }
 
     /* Hover + selection vibe */
     .cell:hover{
       outline: 2px solid rgba(125,211,252,0.35);
       outline-offset: -2px;
       background: rgba(125,211,252,0.06);
     }
     .toolbar{
       display:flex; gap:10px; flex-wrap:wrap;
       padding: 10px 12px;
       border-top: 1px solid var(--border);
       background: rgba(0,0,0,0.14);
       color: var(--muted);
       font-size: 12px;
       align-items:center;
       justify-content: space-between;
     }
     .toolbar input{
       background: var(--panel);
       border: 1px solid var(--border);
       color: var(--text);
       padding: 8px 10px;
       border-radius: 10px;
       outline:none;
       min-width: 260px;
     }
     .kbd{
       border: 1px solid var(--border);
       background: var(--panel);
       padding: 2px 6px;
       border-radius: 8px;
       color: var(--muted);
     }
   `;
 
   const js = `
     (function(){
       const q = document.getElementById("q");
       const cells = Array.from(document.querySelectorAll(".cell"));
       const shown = document.getElementById("shown");
       const total = cells.length;
 
       function apply(){
         const term = q.value.trim().toLowerCase();
         let visible = 0;
         for(const c of cells){
           const t = c.textContent.toLowerCase();
           const ok = !term || t.includes(term);
           c.style.display = ok ? "flex" : "none";
           if(ok) visible++;
         }
         shown.textContent = visible + " cells";
       }
 
       q.addEventListener("input", apply);
       shown.textContent = total + " cells";
     })();
   `;
 
   // Layout in DOM order must match grid placement: first full top row, then row-by-row
   return `<!doctype html>
 <html lang="en">
 <head>
   <meta charset="utf-8" />
   <meta name="viewport" content="width=device-width,initial-scale=1" />
   <title>${escapeHtml(title)}</title>
   <style>${css}</style>
 </head>
 <body>
   <div class="wrap">
     <header>
       <div>
         <h1>${escapeHtml(title)}</h1>
         <div class="meta">${totalRows} rows × ${totalCols} columns • spreadsheet-style render</div>
       </div>
       <div class="meta">Tip: scroll like a sheet — headers stay put.</div>
     </header>
 
     <div class="card">
       <div class="sheet-wrap">
         <div class="sheet">
           ${headerCells}
           ${body}
         </div>
       </div>
       <div class="toolbar">
         <div>
           <input id="q" type="search" placeholder="Search cells..." />
         </div>
         <div>
           <span id="shown"></span>
           <span style="margin-left:10px" class="kbd">CSV → Sheet HTML</span>
         </div>
       </div>
     </div>
   </div>
 
   <script>${js}</script>
 </body>
 </html>`;
 }
 
 function main() {
   const [,, input, output] = process.argv;
   if (!input) {
     console.error("Usage: node csv-to-sheet-html.js input.csv output.html");
     process.exit(1);
   }
 
   const inPath = path.resolve(process.cwd(), input);
   const outPath = path.resolve(
     process.cwd(),
     output || input.replace(/\.csv$/i, "") + ".sheet.html"
   );
 
   const title = process.env.SHEET_TITLE || path.basename(inPath);
   const cellW = Number(process.env.CELL_W || 140);
   const cellH = Number(process.env.CELL_H || 28);
   const freezeRows = Number(process.env.FREEZE_ROWS || 1);
   const freezeCols = Number(process.env.FREEZE_COLS || 1);
 
   // Parse: preserve empty cells and uneven rows
   const csvText = fs.readFileSync(inPath, "utf8");
   const records = parse(csvText, {
     columns: false,
     skip_empty_lines: false,     // keep blank lines as rows if present
     relax_quotes: true,
     relax_column_count: true,    // uneven rows allowed
     bom: true
   });
 
   // Normalize into a rectangular grid
   const maxCols = records.reduce((m, r) => Math.max(m, r.length), 0);
   const grid = records.map(r => {
     const row = Array.from(r, v => (v ?? ""));
     while (row.length < maxCols) row.push("");
     return row;
   });
 
   const html = buildHtml({ title, grid, maxCols, cellW, cellH, freezeRows, freezeCols });
   fs.writeFileSync(outPath, html, "utf8");
   console.log(`Wrote: ${outPath}`);
 }
 
 main();
 