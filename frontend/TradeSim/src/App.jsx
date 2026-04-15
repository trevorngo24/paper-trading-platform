import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import LearnPage from "./components/LearnPage";
import PricingPage from "./components/PricingPage";
import HowItWorksPage from "./components/HowItWorksPage";
 
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"            element={<HomePage />}      />
        <Route path="/learn"       element={<LearnPage />}     />
        <Route path="/pricing"     element={<PricingPage />}   />
        <Route path="/howitworks"  element={<HowItWorksPage />} />
      </Routes>
    </BrowserRouter>
  );
}
 