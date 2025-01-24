import { Store } from 'redux'
import axios, { Axios } from 'axios-observable'
import { AxiosRequestConfig } from 'axios'

import { authInterceptor } from 'api/interceptors/auth'

import { RootState } from 'state/store'

let instance: Axios | null = null

export interface RequestConfig extends AxiosRequestConfig {
  context?: {
    noBasicHeaders?: boolean
    noLoadingBar?: boolean
    provider?: string
  }
  params: any
  headers: any
}

export const setupInterceptors = (axi: Axios, store: Store<RootState>): void => {
  axi.interceptors.request.use(authInterceptor(store))
}

export const http = (): Axios => {
  if (!instance) {
    instance = axios.create({})
  }

  return instance
}

export type Provider = {
  authHeader: string
  authValue: string
}

export type Providers = {
  [key: string]: Provider
}
