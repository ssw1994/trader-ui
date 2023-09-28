import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { AppRoutes } from "./Pages/trade-routing";

function App() {
  return (
    <div className="App">
      <RouterProvider router={AppRoutes}></RouterProvider>
    </div>
  );
}

export default App;
