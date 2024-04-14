import { Prisma } from '@prisma/client'
import { DynamicQueryExtensionCbArgs, InternalArgs, DefaultArgs, DynamicModelExtensionArgs } from '@prisma/client/runtime/library'

type PrismaSchema = Prisma.TypeMap<InternalArgs & DefaultArgs>
type Entities = PrismaSchema['model']
type EntityOperations<E extends keyof Entities> = keyof Entities[E]['operations']

/*
 Useful utility for defining the types of Prisma query extension functions.
 Ideal when you only need to type a single query extension function.
 Usage example: 
 type TeamCreateQueryExtensionParams = QueryExtParams<'Team', 'create'>
*/
export type QueryExtParams<
  T extends keyof Entities, // takes an entity name, eg. 'Team'
  K extends keyof Entities[T]['operations'] // takes an operation name, eg. 'create'
> = DynamicQueryExtensionCbArgs<PrismaSchema, 'model', T, K>

/*
 Utility for typing Prisma query extension functions, organized by entity.
 Comes in handy when you need to type multiple query extension functions for the same entity.
 Here's how you can type query extension parameters for the 'Team' entity:
 
 type TeamQueryExtensionParams = QueryExtensionParamsByEntity<'Team'>
 TeamQueryExtensionParams['create'] (same as using QueryExtParams<'Team', 'create'>)
 
 export const teamPrismaExtension = {
   async create({ args, query }: TeamQueryExtensionParams['create']) {
     // your implementation goes here
   },
   async update({ args, query }: TeamQueryExtensionParams['update']) {
     // your implementation goes here
   }
 }
*/
export type QueryExtensionParamsByEntity<E extends keyof Entities> = {
  [K in EntityOperations<E>]: QueryExtParams<E, K>
}
