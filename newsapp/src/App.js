import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import NewsComponent from "./components/NewsComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

function App (){

  const [country] = useState('us');
  const [pageSize] = useState(13);
  const [progress, setProg] = useState(10);

  let apiKey = process.env.REACT_APP_NEWS_API;

  const setProgress = (prog) => {
    setProg( prog );
  };
    return (
      <>
        <Router>
          <Navbar />
          <LoadingBar
            color="cyan"
            progress={progress}
            shadow={true}
            loaderSpeed={1000}
            height={3}
          />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <NewsComponent apiKey={apiKey}
                  setProgress={setProgress}
                  pageSize={pageSize}
                  country={country}
                  category="general"
                />
              }
            ></Route>
            <Route
              exact
              path="/business"
              element={
                <NewsComponent apiKey={apiKey}
                  setProgress={setProgress}
                  key="business"
                  pageSize={pageSize}
                  country={country}
                  category="business"
                />
              }
            ></Route>
            <Route
              exact
              path="/entertainment"
              element={
                <NewsComponent apiKey={apiKey}
                  setProgress={setProgress}
                  key="entertainment"
                  pageSize={pageSize}
                  country={country}
                  category="entertainment"
                />
              }
            ></Route>
            <Route
              exact
              path="/general"
              element={
                <NewsComponent apiKey={apiKey}
                  setProgress={setProgress}
                  key="general"
                  pageSize={pageSize}
                  country={country}
                  category="general"
                />
              }
            ></Route>
            <Route
              exact
              path="/health"
              element={
                <NewsComponent apiKey={apiKey}
                  setProgress={setProgress}
                  key="health"
                  pageSize={pageSize}
                  country={country}
                  category="health"
                />
              }
            ></Route>
            <Route
              exact
              path="/science"
              element={
                <NewsComponent apiKey={apiKey}
                  setProgress={setProgress}
                  key="science"
                  pageSize={pageSize}
                  country={country}
                  category="science"
                />
              }
            ></Route>
            <Route
              exact
              path="/sports"
              element={
                <NewsComponent apiKey={apiKey}
                  setProgress={setProgress}
                  key="sports"
                  pageSize={pageSize}
                  country={country}
                  category="sports"
                />
              }
            ></Route>
            <Route
              exact
              path="/technology"
              element={
                <NewsComponent apiKey={apiKey}
                  setProgress={setProgress}
                  key="technology"
                  pageSize={pageSize}
                  country={country}
                  category="technology"
                />
              }
            ></Route>
          </Routes>
        </Router>
      </>
    );
  }

export default App;