import {
  ProviderName,
  ProviderType,
  SmsProvider,
  TwilioConstructorOptions,
  TwilioSmsOptions,
} from '@messageraft/common'

import { Twilio } from 'twilio'

class TwilioProvider extends SmsProvider {
  name = ProviderName.TWILIO
  type = ProviderType.SMS
  twilio: Twilio
  from: string | undefined

  constructor(options: TwilioConstructorOptions) {
    super()
    if (!options || !options.accountSid || !options.authToken)
      throw new Error('Twilio Account SID or Account Auth not provided')

    this.twilio = new Twilio(options.accountSid, options.authToken)

    if (options.from) this.from = options.from
  }

  async send(data: TwilioSmsOptions): Promise<any> {
    if (!data.from && !this.from) {
      throw new Error(
        'Field `from` was not provided. Either include in every request or initialize it through an env variable called TWILIO_PHONE_NUMBER'
      )
    }
    if (!data.from && this.from) {
      data.from = this.from
    }
    return this.twilio.messages.create(data)
  }
}

export { TwilioProvider as provider }
