import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FaultReportListPage from "./pages/FaultReportListPage";
import FaultReportEditPage from "./pages/FaultReportEditPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/fault-reports" element={<FaultReportListPage />} />
        <Route path="/fault-reports/:id" element={<Index />} />
        <Route path="/fault-reports/create" element={<FaultReportEditPage />} />
        <Route path="/fault-reports/:id/edit" element={<FaultReportEditPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;