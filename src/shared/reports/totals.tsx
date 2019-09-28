import React, { useContext } from "react"
import { ReportContainer } from "@src/shared/theme/report"
import Graph from "@src/shared/components/graphs/graph-container"
import { CSVContext } from "@src/shared/contexts/csv"
import BarGraph from "@src/shared/components/graphs/bar"

export function TotalsReport(): JSX.Element {
  const csvContext = useContext(CSVContext)
  return (
    <ReportContainer>
      <Graph
        minX={csvContext.minX}
        minY={csvContext.minY}
        maxY={csvContext.maxY}
        maxX={csvContext.maxX}
        xLabel="Month"
        yLabel="Amount"
      >
        <BarGraph />
      </Graph>
    </ReportContainer>
  )
}
