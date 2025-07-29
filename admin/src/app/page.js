"use client";

import Adminnavbar from "@/components/Adminnavbar";
import Adminsidebar from "@/components/Adminsidebar";
import Content from "@/components/Content";
import React, { useState } from "react";

export default function Home() {
  const [selectedSection, setSelectedSection] = useState("dashboard");

  return (
    <>
      <div className="flex h-screen  overflow-hidden">
        <Adminsidebar
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Adminnavbar />
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
