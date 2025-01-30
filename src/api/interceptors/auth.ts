import { AxiosRequestConfig } from 'axios'
import { Store } from 'redux'

import providersData from 'api/providers.json'
import { Provider, Providers, RequestConfig } from 'api/http'

import { RootState } from 'state/store'
import { getToken } from 'state/user/user.token'

export const authInterceptor =
  (store: Store<RootState>) =>
  (request: AxiosRequestConfig): AxiosRequestConfig => {
    const { context } = request as RequestConfig
    const providers = providersData as Providers
    const authHeaders: Record<string, string> = {}
    const provider: Provider = providers[context?.provider || 'london']

    if (!provider || !provider.authHeader || !provider.authValue) {
      console.error('Provider not found or badly configured')
      return request
    }

    // eslint-disable-next-line immutable/no-mutation
    authHeaders[provider.authHeader] = provider.authValue.includes('Bearer')
      ? `Bearer ${getToken()}`
      : provider.authValue

    return {
      ...request,
      headers: {
        ...request.headers,
        ...authHeaders,
      } as any,
    }
  }
