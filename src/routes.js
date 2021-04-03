import Admin from "./components/Admin";
import Profile from "./components/Profile";
import Initial from "./components/Initial";
import { db } from "./firebase-config/init";

export const routes = [
  {
    path: "/",
    name: "mainPage",
    component: Profile
  },
  { path: "/admin", name: "admin", component: Admin },
  {
    path: "/initial",
    name: "initial",
    component: Initial,
    beforeEnter: async (to, from, next) => {
      try {
        const docRef = db.collection("personalInfo").doc("about");
        const doc = await docRef.get();
        if (doc.exists) {
          next({ name: "mainPage" });
          return;
        }
      } catch (err) {
        console.log(err);
        // TODO: should go to error page
        next({ name: "mainPage" });
        return;
      }

      next();
    }
  },
  { path: "*", redirect: "/" }
];
