import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import DashboardPage from "pages/dashboard";
import CommunicationPage from "pages/communication";
import LoginPage from "pages/login";
import { AuthGuard, UnAuthGuard } from "guards";
import AppHeader from "containers/AppHeader";
import "App.css";

function App() {
  return (
    <div>
      <AppHeader />

      <div>
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
    </div>
  );
}

export default App;
