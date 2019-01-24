declare interface HistoryRows {
  from: string
  to: string
  method: string
  arg: any
  timeStamp: number
}
class History {
  private stack: HistoryRows[] = []
  constructor(private maxLength = 300, public historyHook: (HistoryRows:HistoryRows) => void = undefined) {}

  push (e: HistoryRows) {
    if (this.historyHook) {
      try {
        this.historyHook(e)
      } catch (error) {
        console.warn(error)
      }
    }
    this.stack.push(e)
    if (this.stack.length > this.maxLength) {
      this.stack.splice((this.maxLength - 1) * -1)
    }
  }

  find(timeStampFrom: number, timeStampTo: number = -1) {
    let start = this.stack.findIndex(ele => ele.timeStamp >= timeStampFrom)
    let end = this.stack.findIndex(ele => ele.timeStamp <= timeStampTo)
    return this.stack.slice(start, end)
  }

  setHook (fn: (HistoryRows:HistoryRows) => void) {
    this.historyHook = fn
  }
}

export default History
