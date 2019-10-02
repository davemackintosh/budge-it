export interface GraphPropsData {
  /**
   * The value along the X axis of the graph.
   *
   * @type {number | Date}
   */
  x: number

  /**
   * The value to show on the graph.
   * @type {number}
   */
  y: number

  /**
   * Optional label to show along the X axis for this
   * value.
   *
   * @type {string}
   */
  label?: string
}
