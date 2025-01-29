import { catchError, filter, map, of, switchMap } from 'rxjs'
import { Epic, combineEpics } from 'redux-observable'

import { http } from 'api/http'
import statisticsMock from 'api/mocks/statistics.mock.json'
import { dashboardActions as actions } from 'state/dashboard'

const getStatistics$: Epic = (actions$, state$) =>
  actions$.pipe(
    filter(actions.fetchData.match),
    switchMap(() =>
      http()
        .get('/organisations/statistics')
        .pipe(
          // map((response) => actions.fetchDataSuccess(response.data)),
          map(() => actions.fetchDataSuccess(statisticsMock)), // TODO: remove this line after implementing the real API call
          catchError((error) => of(actions.fetchDataError(error))),
        ),
    ),
    // handleEpicError(actions.fetchDataError, 'Failed to get statistics'),
  )

export const dashboardEpics = combineEpics(getStatistics$)
