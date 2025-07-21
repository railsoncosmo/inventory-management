import { z } from 'zod'

export const inventorySubjectSchema = z.tuple([
  z.union([
    z.literal('create'), 
    z.literal('delete'), 
    z.literal('update'), 
    z.literal('read'), 
    z.literal('manage')]),
  z.literal('Inventory'),
])

export type InventorySubject = z.infer<typeof inventorySubjectSchema>