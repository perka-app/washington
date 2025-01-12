import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import DashboardPage from "pages/dashboard";
import CommunicationPage from "pages/communication";
import LoginPage from "pages/login";
import { AuthGuard, UnAuthGuard } from "guards";
import AppHeader from "containers/AppHeader";
import "App.scss";

function App() {
  return (
    <div className="App">
      <AppHeader />

      <div className="App-Body">
        <div className="App-LeftBar">
          <img className="App-Arrow App-Arrow__1" src="./assets/images/arrow_3.png" alt="Left 1" />
          <img className="App-Arrow App-Arrow__2" src="./assets/images/arrow_4.png" alt="Left 2" />
          <img className="App-Arrow App-Arrow__3" src="./assets/images/arrow_2.png" alt="Left 3" />
        </div>

        <div className="App-Content">
          <BrowserRouter>
            <Routes>
                <Route
                index
                element={<AuthGuard comp={<DashboardPage />} />}
                ></Route>

                <Route
                path="/communication"
                element={<AuthGuard comp={<CommunicationPage />} />}
                />

                <Route
                path="/login"
                element={<UnAuthGuard comp={<LoginPage />} />}
                />
            </Routes>
          </BrowserRouter>
        </div>

        <div className="App-RightBar">
          <img className="App-Arrow App-Arrow__1" src="./assets/images/arrow_2.png" alt="Left 1" />
          <img className="App-Arrow App-Arrow__2" src="./assets/images/arrow_4.png" alt="Left 2" />
          <img className="App-Arrow App-Arrow__3" src="./assets/images/arrow_3.png" alt="Left 3" />
        </div>
      </div>
    </div>
  );
}

export default App;
