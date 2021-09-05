import {
  ProviderName,
  ProviderType,
  SmsProvider,
  TwilioConstructorOptions,
  TwilioSmsOptions,
} from '@messageraft/common'

import { Twilio } from 'twilio'

class TwilioProvider extends SmsProvider {
  name = ProviderName.SENDGRID
  type = ProviderType.EMAIL
  twilio: Twilio

  constructor(options: TwilioConstructorOptions) {
    super()
    if (!options.accountSid || !options.authToken)
      throw new Error('Twilio Account SID or Account Auth not provided')

    this.twilio = new Twilio(options.accountSid, options.authToken)
  }

  async send(data: TwilioSmsOptions): Promise<any> {
    return this.twilio.messages.create(data)
  }
}

export { TwilioProvider as provider }
