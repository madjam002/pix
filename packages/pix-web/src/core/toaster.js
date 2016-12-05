import {Toaster, Intent} from 'ui'

const toaster = Toaster.create()

export default toaster

export const toastError = (message) =>
  toaster.show({ message, intent: Intent.DANGER })
