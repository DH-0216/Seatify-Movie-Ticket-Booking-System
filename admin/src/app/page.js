"use client";

import Content from "@/components/Content";
import AdminNavBar from "@/components/Shared/Adminnavbar";
import AdminSideBar from "@/components/Shared/Adminsidebar";

import React, { useState } from "react";

export default function Home() {
  const [selectedSection, setSelectedSection] = useState("dashboard");

  return (
    <>
      <div className="flex h-screen  overflow-hidden">
        <AdminSideBar
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminNavBar />
          <div className="flex-1 overflow-y-auto">
            <Content
              selectedSection={selectedSection}
              setSelectedSection={setSelectedSection}
            />
          </div>
        </div>
      </div>
    </>
  );
}
