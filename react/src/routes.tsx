import { RouteProps } from "react-router"
import Home from "@src/shared/pages/home"
import Reports from "@src/shared/pages/reports"
import ReportPage from "@src/shared/pages/report"

const routes: RouteProps[] = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/reports",
    exact: true,
    component: Reports,
  },
  {
    path: "/reports/:report",
    exact: true,
    component: ReportPage,
  },
]

export default routes
