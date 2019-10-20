import React, { useContext } from "react"
import { ReportContainer } from "@web-src/shared/theme/report"
import Graph from "@shared-lib/components/graphs/graph-container"
import { CSVContext } from "@src/shared/contexts/csv"
import BarGraph from "@shared/components/graphs/bar"

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
        xOrigin="50%"
      >
        {(svgWidth: number, svgHeight: number): JSX.Element => (
          <BarGraph svgWidth={svgWidth} svgHeight={svgHeight} />
        )}
      </Graph>
    </ReportContainer>
  )
}
