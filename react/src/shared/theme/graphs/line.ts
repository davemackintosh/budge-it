import styled from "styled-components"
import theme from "@src/shared/theme/theme"

export const LineGraphLine = styled.polyline`
  stroke: ${theme.colors.lineGraph.lineColour};
  stroke-width: 5;
  fill: none;
`
export const LineGraphPoint = styled.circle`
  fill: ${theme.colors.lineGraph.lineColour};
`
