import React from "react";
import { Link } from "react-router-dom";
import SidebarNav from "@/components/layout/SidebarNav";
import FaultReportDetail from "@/components/fault-report/FaultReportDetail";

const Index = () => {
  return (
    <SidebarNav>
      <FaultReportDetail />
    </SidebarNav>
  );
};

export default Index;