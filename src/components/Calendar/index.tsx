import { CaretLeft, CaretRight } from 'phosphor-react'
import {
  CalendarActions,
  CalendarBody,
  Container,
  CalendarHeader,
  CalendarTitle,
  CalendarDay,
} from './styles'
import { getWeekDays } from '../../utills/get-week-days'
import { useMemo, useState } from 'react'
import dayjs from 'dayjs'

interface CalendarWeek {
  week: number
  days: Array<{
    date: dayjs.Dayjs
    disabled: boolean
  }>
}
type CalendarWeeks = CalendarWeek[]

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })
  function handlePreviousMonth() {
    const previousMonthDate = currentDate.subtract(1, 'month')
    setCurrentDate(previousMonthDate)
  }
  function handleNextMonth() {
    const previousMonthDate = currentDate.add(1, 'month')
    setCurrentDate(previousMonthDate)
  }
  const shortWeekDays = getWeekDays({ short: true })
  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')
  const calendarWeeks = useMemo(() => {
    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => {
      return currentDate.set('date', i + 1)
    })
    const firstWeekDay = currentDate.get('day')
    const previousMonthFillArray = Array.from({
      length: firstWeekDay,
    })
      .map((_, i) => {
        return currentDate.subtract(i + 1, 'day')
      })
      .reverse()
    const lastDayInCurrentMonth = currentDate.set(
      'date',
      currentDate.daysInMonth(),
    )
    const lastWeekDay = lastDayInCurrentMonth.get('day')

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1),
    }).map((_, i) => {
      return lastDayInCurrentMonth.add(i + 1, 'day')
    })
    const calendarDays = [
      ...previousMonthFillArray.map((date) => {
        return {
          date,
          disabled: true,
        }
      }),
      ...daysInMonthArray.map((date) => {
        return {
          date,
          disabled: false,
        }
      }),
      ...nextMonthFillArray.map((date) => {
        return {
          date,
          disabled: true,
        }
      }),
    ]
    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, i, original) => {
        const isNewWeek = i % 7 === 0

        if (isNewWeek) {
          weeks.push({
            week: i / 7 + 1,
            days: original.slice(i, i + 7),
          })
        }
        return weeks
      },
      [],
    )
    return calendarWeeks
  }, [currentDate])
  console.log(calendarWeeks)
  return (
    <Container>
      <CalendarHeader>
        <CalendarTitle>
          {currentMonth} <span>{currentYear}</span>
        </CalendarTitle>
        <CalendarActions>
          <button onClick={handlePreviousMonth} title="previous month">
            <CaretLeft />
          </button>
          <button onClick={handleNextMonth} title="next month">
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>
      <CalendarBody>
        <thead>
          <tr>
            {shortWeekDays.map((weekday) => (
              <th key={weekday}>{weekday}.</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              <CalendarDay disabled>2</CalendarDay>
            </td>
            <td>
              <CalendarDay>3</CalendarDay>
            </td>
          </tr>
          <tr>
            <td>
              <CalendarDay>4</CalendarDay>
            </td>
            <td>
              <CalendarDay>5</CalendarDay>
            </td>
            <td>
              <CalendarDay>6</CalendarDay>
            </td>
            <td>
              <CalendarDay>7</CalendarDay>
            </td>
            <td>
              <CalendarDay>8</CalendarDay>
            </td>
            <td>
              <CalendarDay disabled>9</CalendarDay>
            </td>
            <td>
              <CalendarDay>10</CalendarDay>
            </td>
          </tr>
        </tbody>
      </CalendarBody>
    </Container>
  )
}
