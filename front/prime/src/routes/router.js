import { createBrowserRouter } from "react-router-dom";
import HeaderAndFooterLayout from "pages/layout/HeaderAndFooterLayout";
import Home from "pages/Home";
import Recruiting from "pages/Recruiting";
import RecruitingCheck from "pages/RecruitingCheck";
import Admin from "pages/Admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HeaderAndFooterLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "recruiting",
        element: <Recruiting />,
      },
      {
        path: "recruiting/check",
        element: <RecruitingCheck />,
      },
      {
        path: "admin",
        element: <Admin />
      }
    ],
  },
]);

export default router;
