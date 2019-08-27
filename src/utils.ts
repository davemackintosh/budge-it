export const monthNames = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
]

export const currencyMap = {
  /* eslint-disable @typescript-eslint/camelcase */
  en_GB: "GBP",
  en_US: "USD",
  /* eslint-enable @typescript-eslint/camelcase */
}

/**
 * Format the amount into the local format
 * specified by the LANG environmental variable.
 *
 * if no process.env.LANG present. will default to "en_GB".
 *
 * @param {number} amount - the number to format.
 * @returns {string} locale formatted version of amount.
 * @example ```javascript
 * import {money} from "./utils"
 *
 * console.log(money(165983)) // -> £165,983.00
 * ```
 */
export function money(amount: number): string {
  const lang = (process.env.LANG || "en_GB").replace(
    /_(\w+)/gi,
    (match: string): string => match.toUpperCase(),
  )
  const langValue = lang.split(".")[0]
  return Number(amount).toLocaleString(langValue.replace("_", "-"), {
    style: "currency",
    currency: currencyMap[langValue as keyof typeof currencyMap] || "GBP",
  })
}
