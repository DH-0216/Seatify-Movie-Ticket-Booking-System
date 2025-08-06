import React from "react";
import Dashboard from "./sections/DashboardSections/Dashboard";
import AddShows from "./sections/DashboardSections/AddShows";
import BookingLists from "./sections/DashboardSections/BookingLists";
import ListShows from "./sections/DashboardSections/ListShows";

const Content = ({ selectedSection}) => {
  return (
    <div className="p-5">
      {selectedSection === "dashboard" && <Dashboard />}
      {selectedSection === "addshows" && <AddShows />}
      {selectedSection === "bookinglists" && <BookingLists />}
      {selectedSection === "listshows" && <ListShows />}
      {!["dashboard", "addshows", "bookinglists", "listshows"].includes(
        selectedSection
      ) && <div className="p-5 text-white">Select a section</div>}
    </div>
  );
};

export default Content;
