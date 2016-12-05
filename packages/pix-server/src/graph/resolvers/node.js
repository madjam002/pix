import {fromGlobalId} from 'core/id'
import nodeTypeMap from '../node-type-map'

export default async function nodeResolver(globalId, viewer) {
  const { id, type } = fromGlobalId(globalId)

  const nodeTypeDef = nodeTypeMap[type]

  if (!nodeTypeDef) {
    throw new Error('Invalid ID "' + globalId + '"')
  }

  const { Model } = nodeTypeDef

  const node = await Model.findById(id)
  if (!node) return null

  node.__type = type

  return node
}
