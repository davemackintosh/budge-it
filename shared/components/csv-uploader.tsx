import React, { SyntheticEvent, useContext, Fragment } from "react"
import { CSVContext } from "@src/shared/contexts/csv"
import { parseCsvFile } from "@src/shared/utils"
import { ParsedCsvEntry } from "types/csv"
import { BankContext } from "@src/shared/contexts/bank"

const CSVUpload = (): JSX.Element => {
  const { indexer } = useContext(BankContext)
  const { setParsedCsv } = useContext(CSVContext)
  const onInputChange = (event: SyntheticEvent<HTMLInputElement>): void => {
    const file = (event.currentTarget.files as FileList)[0]
    parseCsvFile(file, indexer).then((parsedCsvFile: ParsedCsvEntry[]) => {
      console.log(parsedCsvFile)
      setParsedCsv && setParsedCsv(parsedCsvFile)
    })
  }

  return (
    <Fragment>
      <label htmlFor="csv-upload">Upload your bank statement</label>
      <input
        type="file"
        onChange={onInputChange}
        multiple={false}
        name="csv-upload"
        id="csv-upload"
      />
    </Fragment>
  )
}

export default CSVUpload
