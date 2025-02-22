import { catchError, filter, map, of, switchMap } from 'rxjs'
import { Epic, combineEpics } from 'redux-observable'
import { AxiosError } from 'axios'

import { http } from 'api/http'
import { messageActions as actions } from 'state/message'

const sendMessage$: Epic = (actions$, state$) =>
  actions$.pipe(
    filter(actions.sendMessage.match),
    switchMap(({ payload }) =>
      http()
        .post('/messages', { subject: payload.title, text: payload.message })
        .pipe(
          map((response) => actions.sendMessageSuccess(response.data)),
          catchError((error: AxiosError) => of(actions.sendMessageError(error.message))),
        ),
    ),
  )

const sendTestMessage$: Epic = (actions$, state$) =>
  actions$.pipe(
    filter(actions.sendTestMessage.match),
    switchMap(({ payload }) =>
      http()
        .post(`/messages/${payload.email}`, {
          subject: payload.title,
          text: payload.message,
        })
        .pipe(
          map((response) => actions.sendMessageSuccess(response.data)),
          catchError((error: AxiosError) => of(actions.sendMessageError(error.message))),
        ),
    ),
  )

export const messageEpics = combineEpics(sendMessage$, sendTestMessage$)
