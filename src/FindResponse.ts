import { APIResponse } from './APIResponse.js';

export interface FindResponse extends APIResponse {
  numrows: number,
  rowchk: number,
  rows: any[]
}

export interface FindJobRow {
  Id: string
  JobNo_: string
  JobName: string
  StartText: string
  SellToName: string
  ShipToAddress: string
  ShipToCity: string
}
