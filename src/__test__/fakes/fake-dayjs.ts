import { DateProvider } from '@/domain/interfaces/date'

export class FakeDateProvider implements DateProvider {
  addDays(days: number): Date {
    const addExpiresDays = new Date()
    const expireDate = new Date(addExpiresDays)
    expireDate.setDate(addExpiresDays.getDate() + days)
    return expireDate
  }
}