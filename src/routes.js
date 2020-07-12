import Admin from "./components/Admin";
import Profile from "./components/Profile";
import Initial from "./components/Initial";

export const routes = [
  { path: "/", component: Profile },
  { path: "/admin", component: Admin },
  { path: "/Initial", component: Initial },
  { path: "*", redirect: "/" },
];
