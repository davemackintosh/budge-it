import React, { useContext } from "react"
import { FeatureFlagContext } from "@src/shared/contexts/feature-flags"
import { ReportsMenuUl } from "@src/shared/theme/nav"
import { Link } from "react-router-dom"

export const ReportsMenu = (): JSX.Element => {
  const featureFlags = useContext(FeatureFlagContext)
  const features = []

  if (featureFlags.totalsGraph)
    features.push(
      <Link
        to="/reports/totals"
        title="Read the report summarising the totals in your CSV."
      >
        Totals
      </Link>,
    )
  if (featureFlags.monthlyBreakdown)
    features.push(
      <Link
        to="/reports/monthly-breakdown"
        title="See which vendors you spend your money with, per month."
      >
        Monthly Breakdown
      </Link>,
    )
  const items = features.map(
    (feature: JSX.Element): JSX.Element => (
      <li key={feature.props.to}>{feature}</li>
    ),
  )
  return <ReportsMenuUl>{items}</ReportsMenuUl>
}
