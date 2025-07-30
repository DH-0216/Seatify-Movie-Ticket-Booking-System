import React from "react";
import Addshows from "@/app/Addshows/page";
import Bookinglists from "@/app/Bookinglists/page";
import Dashboard from "@/app/Dashboard/page";
import Listshows from "@/app/Listshows/page";

const Content = ({ selectedSection, setSelectedSection }) => {
  return (
    <div className="p-5">
      {selectedSection === "dashboard" && <Dashboard />}
      {selectedSection === "addshows" && <Addshows />}
      {selectedSection === "bookinglists" && <Bookinglists />}
      {selectedSection === "listshows" && <Listshows />}
      {!["dashboard", "addshows", "bookinglists", "listshows"].includes(
        selectedSection
      ) && <div className="p-5 text-white">Select a section</div>}
    </div>
  );
};

export default Content;
