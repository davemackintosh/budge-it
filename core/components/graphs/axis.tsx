import React, { Fragment } from "react"

export interface AxisProps {
  xLabel: string
  yLabel: string
  minX: number
  maxX: number
  minY: number
  maxY: number
  xOrigin?: string
  yOrigin?: string
  svgWidth: number
  svgHeight: number
}

const Axis = (props: AxisProps): JSX.Element => {
  const xOrigin = props.xOrigin || "0"
  const yOrigin = props.yOrigin || "0"
  return (
    <Fragment>
      <g className="grid x-grid">
        <line
          x1={xOrigin}
          x2={xOrigin + props.svgWidth}
          y1={yOrigin}
          y2={yOrigin}
        ></line>
        <text className="x-label" x={xOrigin} y={yOrigin}>
          {props.xLabel}
        </text>
      </g>
      <g className="grid y-grid">
        <line
          x1={xOrigin}
          x2={xOrigin}
          y1={yOrigin}
          y2={yOrigin + props.svgHeight}
        ></line>
        <text className="y-label" x={xOrigin} y={yOrigin}>
          {props.yLabel}
        </text>
      </g>
    </Fragment>
  )
}

export default Axis
