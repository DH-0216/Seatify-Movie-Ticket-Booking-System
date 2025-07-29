import Addshows from "@/app/Addshows/page";
import Bookinglists from "@/app/Bookinglists/page";
import Dashboard from "@/app/Dashboard/page";
import Listshows from "@/app/Listshows/page";

import React from "react";

function content({ selectedSection, setSelectedSection }) {
  return (
    <div className="p-5">
      {selectedSection === "dashboard" && <Dashboard />}
      {selectedSection === "addshows" && <Addshows />}

      {selectedSection === "bookinglists" && <Bookinglists />}
      {selectedSection === "listshows" && <Listshows />}

      {!["dashboard", "addshows", "bookinlists", "listshows"].includes(
        selectedSection
      ) && <div className="p-5">Select a section</div>}
    </div>
  );
}

export default content;
