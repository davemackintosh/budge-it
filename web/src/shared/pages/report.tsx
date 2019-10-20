import React, { ComponentType } from "react"
import { useParams } from "react-router"
import { Graph404 } from "@shared/components/graphs/graph-404"
import { TotalsReport } from "@shared/reports/totals"

const ReportPage = (): JSX.Element => {
  let Report: ComponentType<{}> = Graph404
  const params = useParams<{ report: string }>()

  switch (params.report) {
    case "totals":
      Report = TotalsReport
      break
  }

  return <Report />
}

export default ReportPage
