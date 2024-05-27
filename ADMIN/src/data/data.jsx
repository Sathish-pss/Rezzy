import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
// Side bar data
export const sideBar = [
  {
    id: 1,
    name: "Dashboard",
    link: "/",
    icon: <DashboardIcon className="icon" />,
  },
  {
    id: 2,
    name: "Users",
    link: "/users",
    icon: <PersonOutlineIcon className="icon" />,
  },
  {
    id: 3,
    name: "Hotels",
    link: "/hotels",
    icon: <StoreIcon className="icon" />,
  },
  {
    id: 4,
    name: "Rooms",
    link: "/rooms",
    icon: <CreditCardIcon className="icon" />,
  },
];
