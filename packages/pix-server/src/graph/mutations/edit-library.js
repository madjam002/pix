import {GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLInputObjectType, GraphQLList, GraphQLID} from 'graphql'
import invariant from 'invariant'
import {compileSchema} from 'core/schema'
import {idFromGlobalId} from 'core/id'
import LibraryType from '../types/library'
import Library from 'models/library'

const validateSchema = compileSchema(require('schemas/library.json'))

const OutputType = new GraphQLObjectType({
  name: 'EditLibraryPayload',

  fields: () => ({
    library: {
      type: new GraphQLNonNull(LibraryType),
    },
  }),
})

const InputType = new GraphQLInputObjectType({
  name: 'EditLibraryInput',

  fields: () => ({
    name: {
      type: GraphQLString,
    },

    ignorePatterns: {
      type: new GraphQLList(GraphQLString),
    },
  }),
})

export default {
  type: OutputType,
  args: {
    libraryId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    library: {
      type: new GraphQLNonNull(InputType),
    },
  },
  resolve: (_, args, req) => runMutation(args, req),
}

async function runMutation(args, req) {
  invariant(!!req.user, 'Not logged in')

  const library = await Library.findById(idFromGlobalId(args.libraryId, 'Library'))
  invariant(!!library, 'Library not found')

  Object.assign(library, args.library)

  await validateSchema(library.toObject())
  await library.save()

  return { library }
}
