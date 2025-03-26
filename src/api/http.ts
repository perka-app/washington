/* eslint-disable immutable/no-mutation */
import { Store } from 'redux'
import Axios from 'axios-observable'
import { AxiosRequestConfig } from 'axios'

import { authInterceptor } from 'api/interceptors/auth.interceptor'

import { RootState } from 'state/store'

const baseURL = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : 'http://localhost:3000'

// eslint-disable-next-line immutable/no-let
let instance: Axios | null = null

export interface RequestConfig extends AxiosRequestConfig {
  context?: { noBasicHeaders?: boolean; noLoadingBar?: boolean; provider?: string }
  params: any
  headers: any
}

export const setupInterceptors = (axi: Axios, store: Store<RootState>): void => {
  axi.interceptors.request.use(authInterceptor(store))
}

export const http = (): Axios => {
  if (!instance) {
    instance = Axios.create({ baseURL })
  }

  return instance
}

export type Provider = { authHeader: string; authValue: string }

export type Providers = { [key: string]: Provider }
