import React, { useEffect } from "react";
import AdnimDashBoardRequesters from "./AdnimDashBoardElement/AdnimDashBoardRequesters";
import AdnimDashBoardRequest from "./AdnimDashBoardElement/AdnimDashBoardRequest";

function AdminDashboard({ setTitle }) {
  useEffect(() => {
    setTitle("Admin Dashboard");
  });
  return (
    <div>
      <AdnimDashBoardRequest />
      <AdnimDashBoardRequesters />
    </div>
  );
}

export default AdminDashboard;
