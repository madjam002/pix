import {GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLInputObjectType} from 'graphql'
import invariant from 'invariant'
import LibraryType from '../types/library'
import Library from 'models/library'

const OutputType = new GraphQLObjectType({
  name: 'CreateLibraryPayload',

  fields: () => ({
    library: {
      type: new GraphQLNonNull(LibraryType),
    },
  }),
})

const InputType = new GraphQLInputObjectType({
  name: 'CreateLibraryInput',

  fields: () => ({
    name: {
      type: GraphQLString,
    },

    path: {
      type: GraphQLString,
    },
  }),
})

export default {
  type: OutputType,
  args: {
    library: {
      type: new GraphQLNonNull(InputType),
    },
  },
  resolve: (_, args, req) => runMutation(args, req),
}

async function runMutation(args, req) {
  invariant(!!req.user, 'Not logged in')

  const library = new Library(args.library)
  library.owner = req.user._id

  await library.save()

  return { library }
}
