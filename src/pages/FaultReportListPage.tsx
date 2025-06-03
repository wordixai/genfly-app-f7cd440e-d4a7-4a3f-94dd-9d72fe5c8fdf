import React from "react";
import SidebarNav from "@/components/layout/SidebarNav";
import FaultReportList from "@/components/fault-report/FaultReportList";

const FaultReportListPage = () => {
  return (
    <SidebarNav>
      <FaultReportList />
    </SidebarNav>
  );
};

export default FaultReportListPage;