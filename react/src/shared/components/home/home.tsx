import React from "react"
import styled from "styled-components"

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-flow: column;
`

export default function Home(): JSX.Element {
  return <Grid></Grid>
}
