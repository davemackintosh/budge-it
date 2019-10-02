import React from "react"

export const FeatureFlagContext = React.createContext({
  totalsGraph: process.env.GRAPHS_TOTAL_FF,
  monthlyBreakdown: process.env.MONTHLY_BREAKDOWN_FF,
})
export const FeatureFlagProvider = FeatureFlagContext.Provider
export const FeatureFlagConsumer = FeatureFlagContext.Consumer
