import io from 'socket.io-client'

const socket = io(window._config.serverEndpoint)

export default socket
