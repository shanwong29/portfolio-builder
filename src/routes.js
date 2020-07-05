import Admin from "./components/Admin";
import Profile from "./components/Profile";

export const routes = [
  { path: "/", component: Profile },
  { path: "/admin", component: Admin },
  { path: "*", redirect: "/" },
];
