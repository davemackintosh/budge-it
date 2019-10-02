import React, { Fragment } from "react"
import ReactDOM from "react-dom"
import { AppContainer } from "react-hot-loader"
import { IntlProvider } from "react-intl"
import { BrowserRouter } from "react-router-dom"

import BaseApp from "@components/base-app/base-app"
import Router from "@components/router"
import routes from "@src/routes"
import { GlobalStyle } from "@styled/global"
import enGB from "@translations/en-gb"

const rootNode = document.getElementById("container")

const app = (
  <AppContainer>
    <IntlProvider locale="en-gb" messages={enGB}>
      <BrowserRouter>
        <Fragment>
          <GlobalStyle />
          <BaseApp>
            <Router routes={routes} />
          </BaseApp>
        </Fragment>
      </BrowserRouter>
    </IntlProvider>
  </AppContainer>
)

ReactDOM.render(app, rootNode)

/* eslint-disable @typescript-eslint/no-explicit-any */
if ((module as any).hot) {
  ;((module as any).hot as any).accept()
}
/* eslint-enable @typescript-eslint/no-explicit-any */
