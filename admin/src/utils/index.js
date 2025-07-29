import {
  LayoutDashboardIcon,
  ListCollapseIcon,
  ListIcon,
  PlusSquareIcon,
} from "lucide-react";
import { assets } from "@/assets/assets";




export const user = {
  FirstName: "Admin",
  LastName: "User",
  Imageurl: assets.profile,
};


export const sidebarItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboardIcon,
    active: true,
  },
  {
    id: "addshows",
    label: "AddShows",
    icon: PlusSquareIcon,
    active: false,
  },
  {
    id: "bookinglists",
    label: "BookingLists",
    icon: ListIcon,
    active: false,
  },
  {
    id: "listshows",
    label: "ListShows",
    icon: ListCollapseIcon,
    active: false,
  },
];