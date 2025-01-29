/* eslint-disable immutable/no-let */
import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, CircularProgress } from '@mui/material'
import { cn } from '@bem-react/classname'
import isoWeek from 'dayjs/plugin/isoWeek'
import dayjs from 'dayjs'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'

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
  const [timeFrame, setTimeFrame] = useState<Timeframe>('monthly')
  const [data, setData] = useState<DataItem[]>([])

  type Timeframe = 'daily' | 'weekly' | 'monthly'
  type DataItem = { name: string; clients: number }

  dayjs.extend(isoWeek)

  const processData = useCallback(
    (timeFrame: Timeframe, clientsRecords: ClientRecord[]) => {
      let groupedData: Record<string, number> = {}

      clientsRecords.forEach((client) => {
        const date = dayjs(client.joinedAt)
        let key: string

        if (timeFrame === 'daily') {
          key = date.format('YYYY-MM-DD') // e.g., "2025-01-29"
        } else if (timeFrame === 'weekly') {
          key = `Week ${date.isoWeek()} (${date.year()})` // e.g., "Week 4 (2025)"
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
      <DebugInfo info={renderCount} />

      {data && (
        <div className={bem('Content')}>
          <div style={{ marginBottom: 10 }}>
            <Button onClick={() => setTimeFrame('daily')} sx={{ margin: '5px' }}>
              Daily
            </Button>
            <Button onClick={() => setTimeFrame('weekly')} sx={{ margin: '5px' }}>
              Weekly
            </Button>
            <Button onClick={() => setTimeFrame('monthly')} sx={{ margin: '5px' }}>
              Monthly
            </Button>
          </div>

          <ResponsiveContainer width="90%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="clients" fill="#1976d2" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {dataSource?.clientsCount && (
        <div>
          <div>Clients count: {dataSource?.clientsCount}</div>
        </div>
      )}
      {loading && (
        <div>
          <CircularProgress />
        </div>
      )}
      {error && <div className={bem('Error')}>Error: {error}</div>}
    </div>
  )
}
