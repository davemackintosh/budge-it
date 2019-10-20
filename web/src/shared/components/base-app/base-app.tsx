import React, { Component } from "react"
import Layout from "@src/layout"
import { CSVProvider } from "@shared/contexts/csv"
import { ParsedCsvEntry } from "types/csv"
import { BankProvider } from "@src/shared/contexts/bank"
import { natwest } from "@banks/natwest"
import { Indexer } from "types/bank"

interface Props {
  children?: JSX.Element | JSX.Element[] | undefined
}

interface State {
  parsedCsvFile: ParsedCsvEntry[]
  indexer: Indexer
  minX: number
  maxX: number
  minY: number
  maxY: number
}

class App extends Component<Props, State> {
  state = {
    parsedCsvFile: [],
    indexer: natwest,
    minX: 0,
    maxX: 0,
    minY: 0,
    maxY: 0,
  }

  private getMinMaxAxis(data: ParsedCsvEntry[]): void {
    const Ys = data.map((row: ParsedCsvEntry) => row.difference)
    const Xs = data.map((row: ParsedCsvEntry) => row.date).sort()
    this.setState({
      maxY: Math.max(...Ys),
      minY: Math.min(...Ys),
      maxX: Math.max(...Xs),
      minX: Math.min(...Xs),
    })
  }

  private setParsedCsv(parsedCsvFile: ParsedCsvEntry[]): void {
    console.log(parsedCsvFile)
    this.setState({ parsedCsvFile })
    this.getMinMaxAxis(parsedCsvFile)
  }

  private setIndexer(indexer: Indexer): void {
    this.setState({ indexer })
  }

  render(): JSX.Element {
    const csvProviderArgs = {
      setParsedCsv: this.setParsedCsv.bind(this),
      parsedCsvFile: this.state.parsedCsvFile,
      minX: this.state.minX,
      maxX: this.state.maxX,
      minY: this.state.minY,
      maxY: this.state.maxY,
    }
    const bankProviderArgs = {
      indexer: this.state.indexer,
      setIndexer: this.setIndexer.bind(this),
    }
    return (
      <CSVProvider value={csvProviderArgs}>
        <BankProvider value={bankProviderArgs}>
          <Layout>{this.props.children}</Layout>
        </BankProvider>
      </CSVProvider>
    )
  }
}

export default App
