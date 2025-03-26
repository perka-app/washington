import { AxiosError } from 'axios'
import { Epic, combineEpics } from 'redux-observable'
import { catchError, filter, map, of, switchMap } from 'rxjs'

import { messageActions as actions } from 'state/message'
import mockedResponse from 'api/mocks/send-message.response.json'
import { getPayload } from 'state/operators'
import { http } from 'api/http'

const mockRequest = false
const mockSuccess = true

const sendMessage$: Epic = (actions$, state$) =>
  actions$.pipe(
    filter(actions.sendMessage.match),
    getPayload(),
    switchMap(({ title, message }) => {
      if (mockRequest) {
        return mockSuccess
          ? of(actions.sendMessageSuccess(mockedResponse))
          : of(actions.sendMessageError('Mock error response'))
      }

      return http()
        .post('/messages', { subject: title, text: message })
        .pipe(
          map((response) => actions.sendMessageSuccess(response.data)),
          catchError((error: AxiosError) => of(actions.sendMessageError(error.message))),
        )
    }),
  )

const sendTestMessage$: Epic = (actions$, state$) =>
  actions$.pipe(
    filter(actions.sendTestMessage.match),
    getPayload(),
    switchMap(({ title, message, email }) => {
      if (mockRequest) {
        return mockSuccess
          ? of(actions.sendMessageSuccess(mockedResponse))
          : of(actions.sendMessageError('Mock error response'))
      }

      return http()
        .post(`/messages/${email}`, { subject: title, text: message })
        .pipe(
          map((response) => actions.sendMessageSuccess(response.data)),
          catchError((error: AxiosError) => of(actions.sendMessageError(error.message))),
        )
    }),
  )

export const messageEpics = combineEpics(sendMessage$, sendTestMessage$)
