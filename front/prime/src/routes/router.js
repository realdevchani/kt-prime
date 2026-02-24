import { createBrowserRouter } from "react-router-dom";
import HeaderAndFooterLayout from "pages/layout/HeaderAndFooterLayout";
import Home from "pages/Home";
import Recruiting from "pages/Recruiting";


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
        path: "cicd-test",
        element: 
      }
    ],
  },
  // {
  //   path: "*",
  //   element: <NotFound />,
  // },
]);

export default router;