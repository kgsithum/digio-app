
export type LogLine = {
  ipAddress: string,
  url: string,
  statusCode: number
}

export type LogResult = {
  uniqueIpCount: number,
  mostVisitedUrls: Array<string>,
  mostActiveIps: Array<string>
}
