import React from "react";
import { cn } from "src/lib/utils";
import { BrowserRouter, Routes, Route } from "react-router";

import AnimatedGridPattern from "src/components/ui/animated-grid-pattern";
import "src/App.css";
import DashboardPage from "./pages/dashboard";
import CommunicationPage from "./pages/communication";
import LoginPage from "./pages/login";
import { AuthGuard } from "./guards/AuthGuard";

function App() {
  return (
    <div className="App full-width">
      <div className="AppHeader sticky-header center-vertical">
        <h1 className="text-left">PERKA</h1>
      </div>
      <AuthGuard comp={<DashboardPage />} />
      <AuthGuard comp={<CommunicationPage />} />

      <BrowserRouter>
        <Routes>
          <Route index element={<AuthGuard comp={<DashboardPage />} />}></Route>
          <Route
            path="/communication"
            element={<AuthGuard comp={<CommunicationPage />} />}
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>

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
