import React from "react";
import { cn } from "lib/utils";
import { BrowserRouter, Routes, Route } from "react-router";

import AnimatedGridPattern from "components/ui/animated-grid-pattern";
import DashboardPage from "pages/dashboard";
import CommunicationPage from "pages/communication";
import LoginPage from "pages/login";
import { AuthGuard, UnAuthGuard } from "guards";
import "App.css";
import AppHeader from "containers/AppHeader";

function App() {
  return (
    <div className="App full-width">
      <AppHeader />

      <div className="z-10">
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

      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={1}
        repeatDelay={0.1}
        className={cn(
          "[mask-image:radial-gradient(900px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[180%] skew-y-12 z-negative"
        )}
      />
    </div>
  );
}

export default App;
