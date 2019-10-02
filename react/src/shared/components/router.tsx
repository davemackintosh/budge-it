import React from "react"
import { Route, RouteProps, Switch } from "react-router"

interface Props {
  routes: RouteProps[]
}

function Router(props: Props): JSX.Element {
  return (
    <Switch>
      {props.routes.map((route: RouteProps, index: number) => (
        <Route key={index} {...route} />
      ))}
    </Switch>
  )
}

export default Router
