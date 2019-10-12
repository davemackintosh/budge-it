import React, { Component, Fragment } from "react"
import { LineGraphLine, LineGraphPoint } from "@src/shared/theme/graphs/line"
import { GraphComponentProps } from "@src/shared/components/graphs/graph-container"
import { normalise } from "@src/shared/utils"

export interface LineGraphPropsData {
  x: number | Date
  y: number | Date
  label?: string
}

export type LineGraphProps = GraphComponentProps

class LineGraph extends Component<LineGraphProps> {
  static defaultProps = {
    data: [],
  }

  render(): JSX.Element {
    const { svgWidth, svgHeight, minY, maxY, data } = this.props

    const baseWidth = svgWidth / data.length
    const points = data.map((data, index) => {
      const normalisedHeight = normalise(data.y.valueOf(), minY, maxY)
      const x = index * baseWidth

      // Flip the Y coords because this aint cartesion.
      return [x, svgHeight - svgHeight * normalisedHeight]
    })
    const linePoints = points.map((args: number[]): string => args.join(","))

    return (
      <Fragment>
        <LineGraphLine
          className="line"
          x={0}
          y={0}
          points={linePoints.join(" ")}
        />
        {points.map((points: number[]) => (
          <LineGraphPoint
            key={points.join("-")}
            r="5"
            cx={points[0]}
            cy={points[1]}
          />
        ))}
      </Fragment>
    )
  }
}

export default LineGraph
