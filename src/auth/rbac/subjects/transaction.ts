import { z } from 'zod'

export const transactionSubjectSchema = z.tuple([
  z.union([
    z.literal('create'), 
    z.literal('delete'), 
    z.literal('update'), 
    z.literal('read'), 
    z.literal('manage')]),
  z.literal('Transaction'),
])

export type TransactionSubject = z.infer<typeof transactionSubjectSchema>