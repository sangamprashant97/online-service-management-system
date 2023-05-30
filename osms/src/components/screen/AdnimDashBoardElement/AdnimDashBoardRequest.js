import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
function AdnimDashBoardRequest() {
  const [counts, setCounts] = useState({});

  // Toast functions
  const notifyA = (msg) => toast.error(msg);

  useEffect(() => {     
    fetch("/api/admin/workCounts", {
      method: "get",
    })
      .then((res) => res.json())
      .then((counts) => {
        if (counts.error) {
          notifyA(counts.error);
        } else {
          setCounts(counts);
        }
      });
  }, []);
  return (
    <div>
      <div class="overview-boxes">
        <div class="box">
          <div class="right-side">
            <div class="box-topic">Request Received</div>
            <div class="number">{counts.totalWorks}</div>
            <div class="indicator">
              <i class="bx bx-up-arrow-alt"></i>
              <span class="text">View</span>
            </div>
          </div>
        </div>
        <div class="box">
          <div class="right-side">
            <div class="box-topic">Assigned Work</div>
            <div class="number">{counts.notNullTechCount}</div>
            <div class="indicator">
              <i class="bx bx-up-arrow-alt"></i>
              <span class="text">View</span>
            </div>
          </div>
        </div>
        <div class="box">
          <div class="right-side">
            <div class="box-topic">Pending Work</div>
            <div class="number">{counts.nullTechCount}</div>
            <div class="indicator">
              <i class="bx bx-up-arrow-alt"></i>
              <span class="text">View</span>
            </div>
          </div>
        </div>
        <div class="box">
          <div class="right-side">
            <div class="box-topic">No.of Technician</div>
            <div class="number">{counts.totalTechnicians}</div>
            <div class="indicator">
              <i class="bx bx-up-arrow-alt"></i>
              <span class="text">View</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdnimDashBoardRequest;
