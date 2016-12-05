import {nodeDefinitions} from 'graphql-relay'

const { nodeInterface, nodeField } = nodeDefinitions(
  (...args) => require('../resolvers/node').default(...args),
  (node) => require('../resolvers/node-type').default(node),
)

export { nodeField }
export default nodeInterface
