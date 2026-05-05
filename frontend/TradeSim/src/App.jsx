import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import LearnPage from "./components/LearnPage";
import PricingPage from "./components/PricingPage";
import HowItWorksPage from "./components/HowItWorksPage";
import PracticePage from "./components/PracticePage";
import LoginPage from "./components/LoginPage";
import DashboardPage from "./components/DashboardPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"            element={<HomePage />}      />
        <Route path="/learn"       element={<LearnPage />}     />
        <Route path="/pricing"     element={<PricingPage />}   />
        <Route path="/howitworks"  element={<HowItWorksPage />} />
        <Route path="/practice"    element={<PracticePage />}  />
        <Route path="/dashboard"   element={<DashboardPage />} />
        <Route path="/login"       element={<LoginPage />}     />
      </Routes>
    </BrowserRouter>
  );
}