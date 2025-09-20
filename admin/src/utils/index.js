import {
  LayoutDashboardIcon,
  ListCollapseIcon,
  ListIcon,
  PlusSquareIcon,
} from "lucide-react";

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
    id: "listshows",
    label: "ListShows",
    icon: ListCollapseIcon,
    active: false,
  },
  {
    id: "bookinglists",
    label: "BookingLists",
    icon: ListIcon,
    active: false,
  }
  
];
