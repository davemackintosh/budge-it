import React, { Fragment, useContext, useState, SyntheticEvent } from "react"
import { BarGraphBar } from "@src/shared/theme/graphs/bar"
import { CSVContext } from "@src/shared/contexts/csv"
import { normalise, monthNames } from "@src/shared/utils"
import { ParsedCsvEntry } from "types/csv"
import { CSVContextValue } from "web/src/shared/contexts/csv"

export interface BarGraphPropsData {
  x: number | Date
  y: number | Date
  label?: string
}

interface Props {
  svgWidth: number
  svgHeight: number
}

type BarData = Record<number, Record<string, number>>

const BarGraph = (props: Props): JSX.Element => {
  const [currentYear, updateCurrentYear] = useState<number>(
    new Date().getFullYear(),
  )
  const csvContext = useContext<CSVContextValue>(CSVContext)
  const years = csvContext.parsedCsvFile.reduce(
    (acc: BarData, entry: ParsedCsvEntry): BarData => {
      const date = new Date(entry.date)
      const year = date.getFullYear()
      const month = monthNames[date.getMonth()]
      console.log(year, month)

      if (!acc.hasOwnProperty(year)) acc[year] = {}

      if (!acc[year].hasOwnProperty(month)) acc[year][month] = 0

      acc[year][month] += entry.difference

      return acc
    },
    {},
  )

  const margin = 5
  const totalMargin = margin * 11
  const width = (props.svgWidth - totalMargin) / 12
  const minY = Math.min(...Object.values(years[currentYear]))
  const maxY = Math.max(...Object.values(years[currentYear]))
  const onYearChange = (event: SyntheticEvent<HTMLSelectElement>): void =>
    updateCurrentYear(Number(event.currentTarget.value))

  let yearSelector = null

  if (Object.keys(years).length > 1) {
    yearSelector = (
      <select onChange={onYearChange} name="year" value={currentYear}>
        {Object.keys(years).map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    )
  }

  return (
    <Fragment>
      {yearSelector}
      {Object.values(years[currentYear]).map((amount, index) => {
        const height = props.svgHeight * normalise(amount, minY, maxY)

        return (
          <BarGraphBar
            className="bar"
            key={index}
            x={index * width + margin}
            y={props.svgHeight - height}
            width={width - margin}
            height={height}
          />
        )
      })}
    </Fragment>
  )
}

export default BarGraph
