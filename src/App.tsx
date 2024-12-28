import React from "react";
import { cn } from "src/lib/utils";
import { BrowserRouter, Routes, Route } from "react-router";

import AnimatedGridPattern from "src/components/ui/animated-grid-pattern";
import DashboardPage from "src/pages/dashboard";
import CommunicationPage from "src/pages/communication";
import LoginPage from "src/pages/login";
import { AuthGuard, UnAuthGuard } from "src/guards";
import "src/App.css";

function App() {
  return (
    <div className="App full-width">
      <div className="AppHeader sticky-header center-vertical">
        <h1 className="text-left">PERKA</h1>
      </div>

      <BrowserRouter>
        <Routes>
          <Route index element={<AuthGuard comp={<DashboardPage />} />}></Route>
          <Route
            path="/communication"
            element={<AuthGuard comp={<CommunicationPage />} />}
          />
          <Route path="/login" element={<UnAuthGuard comp={<LoginPage />} />} />
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
