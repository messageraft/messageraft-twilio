import RestException from 'twilio/lib/base/RestException'

export function twilioErrorHandler(error: RestException) {
  return {
    statusCode: error.status,
    message: error.message,
    meta: error,
  }
}
