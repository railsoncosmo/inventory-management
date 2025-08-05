import dayjs from 'dayjs'
import { DateProvider } from '../../application/ports/date'

export class DayJs implements DateProvider {
  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate()
  }
}