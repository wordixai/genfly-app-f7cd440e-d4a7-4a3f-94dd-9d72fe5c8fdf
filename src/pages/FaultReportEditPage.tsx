import React from "react";
import SidebarNav from "@/components/layout/SidebarNav";
import FaultReportEdit from "@/components/fault-report/FaultReportEdit";

const FaultReportEditPage = () => {
  return (
    <SidebarNav>
      <FaultReportEdit />
    </SidebarNav>
  );
};

export default FaultReportEditPage;