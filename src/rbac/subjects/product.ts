import { z } from 'zod'

export const productSubjectSchema = z.tuple([
  z.union([
    z.literal('create'), 
    z.literal('delete'), 
    z.literal('update'), 
    z.literal('read'), 
    z.literal('manage')]),
  z.literal('Product'),
])

export type ProductSubject = z.infer<typeof productSubjectSchema>