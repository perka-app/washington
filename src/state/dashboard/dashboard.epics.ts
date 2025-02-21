import { catchError, filter, map, of, switchMap } from 'rxjs'
import { Epic, combineEpics } from 'redux-observable'
import { AxiosError } from 'axios'

import { http } from 'api/http'
import { dashboardActions as actions } from 'state/dashboard'

const getStatistics$: Epic = (actions$, state$) =>
  actions$.pipe(
    filter(actions.fetchData.match),
    switchMap(() =>
      http()
        .get('/organisations/statistics')
        .pipe(
          map((response) => actions.fetchDataSuccess(response.data)),
          catchError((error: AxiosError) => of(actions.fetchDataError(error.message))),
        ),
    ),
  )

export const dashboardEpics = combineEpics(getStatistics$)
