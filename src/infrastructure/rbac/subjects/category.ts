import { z } from 'zod'

export const categorySubjectSchema = z.tuple([
  z.union([
    z.literal('create'), 
    z.literal('delete'), 
    z.literal('update'), 
    z.literal('read'), 
    z.literal('manage')]),
  z.literal('Category'),
])

export type CategorySubject = z.infer<typeof categorySubjectSchema>