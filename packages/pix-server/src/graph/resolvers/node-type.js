import nodeTypeMap from '../node-type-map'

export default function nodeTypeResolver(model) {
  return nodeTypeMap[model.__type].Type
}
