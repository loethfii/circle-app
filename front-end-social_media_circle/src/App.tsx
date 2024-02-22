/* eslint-disable @typescript-eslint/no-explicit-any */
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./page/Home";
import Page404 from "./page/404";
import Login from "./page/Login";
import Register from "./page/Register";
import DetailThread from "./page/DetailThread";
import ListFollower from "./page/ListFollower";
import SearchUser from "@/page/SearchUser";
import { useEffect } from "react";

const App = () => {
  const location = useLocation();

  // console.log(pathname);
  useEffect(() => {
    if (location.pathname === "/login") {
      document.title = "circle | Login";
    } else if (location.pathname === "/register") {
      document.title = "circle | Register";
    } else if (location.pathname === "/") {
      document.title = "circle";
    } else if (location.pathname.startsWith("/detail-thread/")) {
      document.title = "circle | Detail Thread";
    } else if (location.pathname === "/search-user") {
      document.title = "circle | search";
    } else if (location.pathname === "/list-follow") {
      document.title = "circle | follow";
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Page404 />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/detail-thread/:threadId" element={<DetailThread />} />
      <Route path="/list-follow" element={<ListFollower />} />
      <Route path="/search-user" element={<SearchUser />} />
    </Routes>
  );
};

export default App;
