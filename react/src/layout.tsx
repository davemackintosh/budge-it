import React, { Fragment } from "react"
import NavDrawer from "@src/shared/components/nav"

interface LayoutProps {
  children?: JSX.Element | JSX.Element[]
}

const Layout = (props: LayoutProps): JSX.Element => (
  <Fragment>
    <NavDrawer />
    <main>{props.children}</main>
  </Fragment>
)

export default Layout
