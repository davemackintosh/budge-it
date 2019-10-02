import React, { useState } from "react"
import { MainNav, MainNavUl, MainNavLi } from "@src/shared/theme/nav"
import { Link } from "react-router-dom"
import { ReportsMenu } from "@src/shared/components/reports-menu"
import CSVUpload from "@src/shared/components/csv-uploader"

export const NavDrawer = (): JSX.Element => {
  const [reportsMenuHover, setHoverState] = useState(false)

  const reportMenu = reportsMenuHover ? <ReportsMenu /> : null

  return (
    <MainNav>
      <MainNavUl>
        <MainNavLi>
          <Link to="/" title="Budge it home page">
            Home
          </Link>
        </MainNavLi>
        <MainNavLi
          onMouseEnter={(): void => setHoverState(true)}
          onMouseLeave={(): void => setHoverState(false)}
        >
          <Link
            to="/reports"
            title="See what financial reports we have to offer to better understand your spending"
            onClick={(): void => setHoverState(true)}
          >
            Reports
          </Link>
          {reportMenu}
        </MainNavLi>
        <MainNavLi>
          <CSVUpload />
        </MainNavLi>
      </MainNavUl>
    </MainNav>
  )
}

export default NavDrawer
