"use client";

import Content from "@/components/Content";
import AdminNavBar from "@/components/Shared/AdminNavBar";
import AdminSideBar from "@/components/Shared/AdminSideBar";
import { useUser, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";

export default function Home() {
  const [selectedSection, setSelectedSection] = useState("dashboard");
  const { user, isLoaded } = useUser();
  const { isAdmin, isCheckingAdmin } = useAppContext();
  const router = useRouter();
  const { signOut } = useAuth();

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/landing");
    }
  }, [isLoaded, user, router]);

  // Admin check is now handled in AppContext

  // Remove this useEffect - let AppContext handle redirects

  if (!isLoaded || isCheckingAdmin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">Loading...</div>
          <div className="text-gray-400 text-sm">Verifying admin access</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to landing page
  }

  if (!isAdmin) {
    const handleSignAgain = async () => {
      await signOut();
      router.push("/admin-signin");
    };

    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">Access Denied</div>
          <div className="text-gray-400 text-sm mb-4">
            You are not authorized to access the admin dashboard
          </div>
          <button
            onClick={handleSignAgain}
            className="mt-5 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dull transition cursor-pointer"
          >
            Sign in again
          </button>
        </div>
      </div>
    );
  }

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
