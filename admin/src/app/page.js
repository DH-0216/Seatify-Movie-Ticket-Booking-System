"use client";

import Adminnavbar from "@/components/Adminnavbar";
import Adminsidebar from "@/components/Adminsidebar";
import Content from "@/components/Content";
import React, { useState } from "react";

export default function Home() {
  const [selectedSection, setSelectedSection] = useState("dashboard");

  return (
    <>
      <Adminnavbar />
      <div className="flex">
        <Adminsidebar
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        <Content
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
        />
      </div>
    </>
  );
}
