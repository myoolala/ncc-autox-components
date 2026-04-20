// import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// import LoginPage from "./pages/login";
// import DashboardPage from "./pages/DashboardPage";
// import NotFoundPage from "./pages/notFound";
import Header from "./components/header";
import Home from "./pages/home";


export default function App() {
  return (
    <div id="app">
      <Header></Header>
      <Routes>
        {/* Routes that do not require the user to be logged in */}
        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} /> */}
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}