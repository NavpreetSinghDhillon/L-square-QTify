import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from 'react-router-dom';
import { fetchNewAlbums, fetchTopAlbums, fetchSongs } from "./api/api";
import { StyledEngineProvider } from "@mui/material";

function App() {
  const [data, setData] = useState({});
  const generateData = (key, source) => {
    source().then((data) => {
      setData((prevState) => {
        return { ...prevState, [key]: data};
      });
    });
  }
  useEffect(() => {
    generateData("topAlbums", fetchTopAlbums);
    generateData("newAlbums", fetchNewAlbums);
    generateData("songs", fetchSongs);
  }, []);

  const { topAlbums = [], newAlbums = [], songs = [] } = data;

  return (
    <div>
      
      <StyledEngineProvider injectFirst>
      <Navbar/>
      <Outlet context={{data: { topAlbums, newAlbums, songs}}} />
      </StyledEngineProvider>
    </div>
  );
}

export default App;
