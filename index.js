const fs = require('fs');
const path = require('path');

const DATA_DIR = '2025-data',
      SCORES = {
        '1': 10,
        '2': 9,
        '3': 8,
        '4': 7,
        '5': 6,
        '6': 5,
        '7': 4,
        '8': 3,
        '9': 2,
        '10': 1
      };

const parseFile = async filePath => {
    let rawData = await fs.promises.readFile(filePath);
    rawData = rawData.toString('utf-8');
    let toReturn = {};

    if (rawData.toString().trim().length < 1)
        return;

    const lines = rawData.split("\n");
    let data = {};
    let drivingClass;
    for (let line of lines) {
        line = line.trim();
        console.log(line);

        if (!line.length || line.startsWith('[') || line.startsWith('+')) {
            continue;
        } else if (line.match(/^\d+/)) {
            let pieces = line.match(/(^\d+)[^0-9]+\d{3}([^0-9]+)/);
            if (!pieces) {
                console.log(`This line is badly formatted: "${line}"`);
                throw new Error('fsnajilfnsadjkfdsnajk');
            }
            if (!line.match(/\d\d\.\d{3}/))
                continue;
            
            data[pieces[2].trim()] = SCORES[pieces[1]] || 0;
        } else {
            if (drivingClass) {
                toReturn[drivingClass] = data;
            }
            drivingClass = line.split(' ')[0];
            data = {};
        }
    }
    toReturn[drivingClass] = data;
    return toReturn;
};

const readData = async dataDir => {
    let toReturn = {};
    // read directory
    let fileNames = await fs.promises.readdir(dataDir);
        console.log(fileNames)

    for (let i in fileNames) {
        let filename = fileNames[i].toLowerCase();
        if (filename.endsWith('csv'))
            continue;
            
        console.log(`Reading file ${filename}`);
        // get current file name
        const name = path.parse(filename).name;
        // get current file extension
        const ext = path.parse(filename).ext;
        // get current file path
        const filepath = path.resolve(dataDir, filename);

        // get information about the file
        let stat = await fs.promises.stat(filepath);

        // check if the current path is a file or a folder
        const isFile = stat.isFile();

        // exclude folders
        if (isFile) {
            // callback, do something with the file
            const contents = await parseFile(filepath);
            if (contents) {
                console.log(filename)
                let eventName = filename.match(/event \d+/);
                toReturn[eventName[0]] = contents;
            }
        }
    }
    return toReturn;
};

const combineResults = results => {
    let toReturn = {};
    for (let event of Object.keys(results)) {
        const eventData = results[event];
        for (let driverClass of Object.keys(eventData)) {
            if (!toReturn[driverClass])
                toReturn[driverClass] = {};
            for (let driver of Object.keys(eventData[driverClass])) {
                if (!toReturn[driverClass][driver])
                    toReturn[driverClass][driver] = [eventData[driverClass][driver]];
                else
                    toReturn[driverClass][driver].push(eventData[driverClass][driver]);
            }
        }
    }
    return toReturn;
};

const dropLowest = (results, keep = 4) => {
    for (let i of Object.keys(results)) {
        const peopleByClass = results[i];
        for (let name of Object.keys(peopleByClass)) {
            peopleByClass[name].sort((a, b) => b - a);
            peopleByClass[name] = peopleByClass[name].filter((a, i) => !!a && i < keep);
        }
    }
    return results;
};

const mapResults = results => {
    let toReturn = {}
    for (let i of Object.keys(results)) {
        const peopleByClass = results[i];
        toReturn[i] = [];
        for (let name of Object.keys(peopleByClass)) {
            toReturn[i].push({
                name,
                scores: peopleByClass[name],
                total: peopleByClass[name].reduce((a, b) => a+b, 0)
            });
        }
        toReturn[i].sort((a, b) => b.total - a.total);
    }
    return toReturn;
}

const exportToCsv = async results => {
    let data = [];
    for (let className of Object.keys(results)) {
        data.push(className);
        for (let record of results[className]) {
            data.push([
                '', record.name, record.total, ...record.scores
            ].join(','));
        }
    }
    console.log(data);
    await fs.promises.writeFile('output.csv', data.join("\n"));
};

const main = async () => {
    let allData = await readData(DATA_DIR);
    let classResults = combineResults(allData);
    classResults = dropLowest(classResults);
    classResults = mapResults(classResults);
    console.log(classResults);

    await exportToCsv(classResults, '2025-results.csv')
};

main().then(() => {
    console.log('Done');
    process.exit(0);
}, err => {
    console.error(err);
    process.exit(1);
})