/* eslint-disable immutable/no-let */
import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, CircularProgress } from '@mui/material'
import { cn } from '@bem-react/classname'
import isoWeek from 'dayjs/plugin/isoWeek'
import dayjs, { Dayjs } from 'dayjs'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

import {
  dataSelector,
  errorSelector,
  loadingSelector,
} from 'state/dashboard/dashboard.selectors'
import { DebugInfo } from 'components'
import { AppDispatch } from 'state/store'
import { ClientRecord } from 'models'
import { dashboardActions as actions } from 'state/dashboard'

import './DashboardPage.scss'

export const DashboardPage: React.FC = () => {
  const bem = cn('DashboardPage')
  const dataSource = useSelector(dataSelector)
  const error = useSelector(errorSelector)
  const loading = useSelector(loadingSelector)
  const dispatch = useDispatch<AppDispatch>()

  const [renderCount, setRenderCount] = useState<number>(0)
  const [timeFrame, setTimeFrame] = useState<Timeframe>('daily')
  const [data, setData] = useState<DataItem[]>([])

  type Timeframe = 'daily' | 'weekly' | 'monthly'
  type DataItem = { name: string; clients: number }
  type DayjsRecord = { joinedAt: Dayjs }

  dayjs.extend(isoWeek)

  const integerTickFormatter = (tick: number) => {
    return Number.isInteger(tick) ? tick.toString() : ''
  }

  const timeFrameName = (timeFrame: Timeframe) =>
    timeFrame === 'daily' ? 'day' : timeFrame === 'weekly' ? 'week' : 'month'

  const znak = (num: number) => (num > 0 ? `+${num}` : num)

  const timeFrameIncrease =
    znak(data[data.length - 2]?.clients - data[data.length - 3]?.clients) || 0

  const processData = useCallback(
    (timeFrame: Timeframe, clientsRecords: ClientRecord[]) => {
      let groupedData: Record<string, number> = {}

      const records = JSON.parse(JSON.stringify(clientsRecords))
        .map((record: ClientRecord): { joinedAt: Dayjs } => {
          return {
            joinedAt: dayjs(record.joinedAt),
          }
        })
        .sort(
          (a: { joinedAt: Dayjs }, b: { joinedAt: Dayjs }) => a.joinedAt.diff(b.joinedAt),
          'day',
        )

      records.forEach((client: DayjsRecord) => {
        const date = client.joinedAt
        let key: string

        if (timeFrame === 'daily') {
          key = date.format('DD-MM-YY') // e.g., "31-01-25"
        } else if (timeFrame === 'weekly') {
          key = `w${date.isoWeek()} (${date.year()})` // e.g., "Week 4 (2025)"
        } else {
          key = date.format('YYYY-MM') // e.g., "2025-01"
        }

        // eslint-disable-next-line immutable/no-mutation
        groupedData[key] = (groupedData[key] || 0) + 1
      })

      return Object.entries(groupedData).map(([name, clients]) => ({
        name,
        clients: clients as number,
      }))
    },
    [],
  )

  useEffect(() => {
    setRenderCount((prevCount) => prevCount + 1)
  }, [])

  useEffect(() => {
    dispatch(actions.fetchData())
  }, [dispatch])

  useEffect(() => {
    setData(processData(timeFrame, dataSource?.clientsRecords || []))
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
  }, [timeFrame, dataSource, processData])

  return (
    <div className={bem()}>
      {dataSource?.clientsCount && (
        <div className={bem('Header')}>
          <div className={bem('Clients')}>
            <div className={bem('ClientsCount')}>{dataSource?.clientsCount}</div>
            <div className={bem('ClientsTitle')}>Clients</div>
          </div>

          <div className={bem('Increase')}>
            <div className={bem('IncreaseCount')}>{timeFrameIncrease}</div>
            <div className={bem('IncreaseTitle')}>Last {timeFrameName(timeFrame)}</div>
          </div>
        </div>
      )}

      {data && (
        <div className={bem('Content')}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              className={bem('Chart')}
              data={data}
              margin={{ top: 10, right: 20, left: 20, bottom: 60 }}
            >
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="name" angle={-90} textAnchor="end" />
              <YAxis tickFormatter={integerTickFormatter} />
              <Tooltip />
              <Bar dataKey="clients" fill="#1A2264" barSize={50} />
            </BarChart>
          </ResponsiveContainer>

          <div className={bem('Buttons')}>
            <Button
              onClick={() => setTimeFrame('daily')}
              className={bem('Button', { Active: timeFrame === 'daily' })}
            >
              Daily
            </Button>
            <Button
              onClick={() => setTimeFrame('weekly')}
              className={bem('Button', { Active: timeFrame === 'weekly' })}
            >
              Weekly
            </Button>
            <Button
              onClick={() => setTimeFrame('monthly')}
              className={bem('Button', { Active: timeFrame === 'monthly' })}
            >
              Monthly
            </Button>
          </div>
        </div>
      )}

      {loading && (
        <div>
          <CircularProgress />
        </div>
      )}
      {error && <div className={bem('Error')}>Error: {error}</div>}
      <DebugInfo info={`rendered ${renderCount} times`} />
    </div>
  )
}
