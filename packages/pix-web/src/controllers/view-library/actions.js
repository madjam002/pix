import socket from 'core/socket'

export const indexLibrary = libraryId => {
  socket.emit('library:index', { libraryId })
}
