'use client'

import { useEffect, useState } from 'react'
import { eachDayOfInterval, format, formatISO, getDay, parseISO, subMonths } from 'date-fns'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
  type Activity,
} from './contribution-graph/contribution-graph'

export default function GitHubActivity({ username = 'agent19music' }: { username?: string }) {
  const [data, setData] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const [blockSize, setBlockSize] = useState(12)
  const [figure, setFigure] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    async function load() {
      setLoading(true)
      setError(false)
      try {
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`, { signal: controller.signal })
        if (!response.ok) throw new Error('GitHub activity unavailable')
        const result = await response.json() as { contributions?: Activity[] }
        if (!controller.signal.aborted) setData(result.contributions ?? [])
      } catch {
        if (!controller.signal.aborted) setError(true)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }
    void load()
    return () => controller.abort()
  }, [username, attempt])

  const sortedData = [...data].sort((a, b) => a.date.localeCompare(b.date))
  const latestDate = sortedData.length > 0 ? parseISO(sortedData[sortedData.length - 1]!.date) : null
  const rangeStart = latestDate ? subMonths(latestDate, 12) : null
  const activityByDate = new Map<string, Activity>(sortedData.map((activity): [string, Activity] => [activity.date, activity]))
  const recentData = latestDate && rangeStart
    ? eachDayOfInterval({ start: rangeStart, end: latestDate }).map((day) => {
        const date = formatISO(day, { representation: 'date' })
        return activityByDate.get(date) ?? { date, count: 0, level: 0 }
      })
    : []
  const weekCount = rangeStart && recentData.length > 0
    ? Math.ceil((getDay(rangeStart) + recentData.length) / 7)
    : 53

  useEffect(() => {
    if (!figure) return
    const observer = new ResizeObserver(([entry]) => {
      const availableWidth = entry.contentRect.width - 32
      const fittedSize = Math.floor((availableWidth - (weekCount - 1)) / weekCount)
      setBlockSize(Math.min(12, Math.max(3, fittedSize)))
    })
    observer.observe(figure)
    return () => observer.disconnect()
  }, [figure, weekCount])

  if (loading) return <div className="flex h-45 items-center justify-center text-sm text-muted-foreground" role="status">Loading GitHub contributions…</div>
  if (error || data.length === 0) return (
    <div className="flex min-h-32 flex-wrap items-center justify-center gap-3 border-y border-border p-4 text-sm text-muted-foreground">
      <p>{error ? 'GitHub contributions could not be loaded.' : 'No contributions available.'}</p>
      {error && <button type="button" onClick={() => setAttempt(value => value + 1)} className="underline underline-offset-4">Retry</button>}
      <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">View GitHub</a>
    </div>
  )

  return (
    <figure ref={setFigure} className="border-y border-border">
      <ContributionGraph className="mx-auto gap-4 py-4" data={recentData} blockSize={blockSize} blockMargin={1} blockRadius={0} fontSize={blockSize < 5 ? 10 : blockSize < 7 ? 12 : 14} aria-label="GitHub Contributions Graph">
        <ContributionGraphCalendar className="w-full overflow-hidden px-4 **:data-[slot=month-labels]:text-muted-foreground" title="GitHub Contributions" aria-hidden>
          {({ activity, dayIndex, weekIndex }) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <g><ContributionGraphBlock activity={activity} dayIndex={dayIndex} weekIndex={weekIndex} /></g>
              </TooltipTrigger>
              <TooltipContent>
                {activity.count} contribution{activity.count !== 1 ? 's' : ''} on {format(parseISO(activity.date), 'd MMM yyyy')}
              </TooltipContent>
            </Tooltip>
          )}
        </ContributionGraphCalendar>
        <ContributionGraphFooter className="px-4 text-sm">
          <ContributionGraphTotalCount>
            {({ totalCount }) => (
              <figcaption className="text-pretty tabular-nums">
                {totalCount.toLocaleString()} contributions, {format(parseISO(recentData[0]!.date), 'd MMM yyyy')} – {format(parseISO(recentData[recentData.length - 1]!.date), 'd MMM yyyy')}. Source: <a href={`https://github.com/${username}`} className="underline underline-offset-4" target="_blank" rel="noopener noreferrer">GitHub</a>.
              </figcaption>
            )}
          </ContributionGraphTotalCount>
          <ContributionGraphLegend aria-hidden />
        </ContributionGraphFooter>
      </ContributionGraph>
    </figure>
  )
}
