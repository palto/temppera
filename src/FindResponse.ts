import { APIResponse } from './APIResponse.js';

export interface FindResponse<R> extends APIResponse {
  numrows: number,
  rowchk: number,
  rows: R[]
}

export interface FindProjectRow {
  Id: string
  JobNo_: string
  JobName: string
  StartText: string
  SellToName: string
  ShipToAddress: string
  ShipToCity: string
}
