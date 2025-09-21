"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [shows, setShows] = useState([]);
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(false);

  const image_base_url = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

  const { user } = useUser();
  const { getToken } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const fetchIsAdmin = async () => {
    if (!user?.id || isCheckingAdmin) return;

    setIsCheckingAdmin(true);

    try {
      const token = await getToken();
      if (!token) {
        setIsAdmin(false);
        return;
      }

      const { data } = await axios.get("/api/admin/is-admin", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const adminStatus = data?.success === true && data?.isAdmin === true;
      setIsAdmin(adminStatus);

      // Only redirect if not admin and on protected routes
      if (!adminStatus && (pathname === "/" || pathname === "/admin") && pathname !== "/landing" && pathname !== "/admin-signin") {
        router.push("/admin-signin");
        toast.error("You are not authorized to access the admin dashboard");
      }
    } catch (error) {
      console.error("Error checking admin status:", error);
      setIsAdmin(false);

      if ((pathname === "/" || pathname === "/admin") && pathname !== "/landing" && pathname !== "/admin-signin") {
        router.push("/admin-signin");
        toast.error("Error verifying admin access");
      }
    } finally {
      setIsCheckingAdmin(false);
    }
  };

  const fetchShows = async () => {
    try {
      const { data } = await axios.get("/api/show/all");
      if (data.success) {
        setShows(data.shows);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  useEffect(() => {
    if (user) {
      fetchIsAdmin();
    } else {
      setIsAdmin(false);
      setIsCheckingAdmin(false);
    }
  }, [user?.id]); // Only depend on user ID

  const value = {
    axios,
    fetchIsAdmin,
    user,
    getToken,
    router,
    shows,
    image_base_url,
    isAdmin,
    setIsAdmin,
    isCheckingAdmin,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
