import dayjs from 'dayjs'
import { DateProvider } from '@/application/ports/out/date'

export class DayJs implements DateProvider {
  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate()
  }
}