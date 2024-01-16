/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import HomeLayout from "../layouts/HomeLayout/HomeLayout";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || token === undefined) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <HomeLayout />
    </>
  );
};

export default Home;
