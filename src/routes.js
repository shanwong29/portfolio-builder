import Admin from "./components/Admin";
import Profile from "./components/Profile";
import Initial from "./components/Initial";

export const routes = [
  { path: "/", name: "mainPage", component: Profile },
  { path: "/admin", name: "admin", component: Admin },
  { path: "/Initial", name: "initial", component: Initial },
  { path: "*", redirect: "/" },
];
