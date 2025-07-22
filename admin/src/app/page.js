import Adminnavbar from "@/components/Adminnavbar";
import Adminsidebar from "@/components/Adminsidebar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Adminnavbar />
      <div className="flex">
        <Adminsidebar />
      </div>
    </>
  );
}
