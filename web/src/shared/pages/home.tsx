import React, { Fragment } from "react"
import CSVUpload from "@shared/components/csv-uploader"

function Home(): JSX.Element {
  return (
    <Fragment>
      <h1>Budge It</h1>
      <CSVUpload />
    </Fragment>
  )
}

export default Home
