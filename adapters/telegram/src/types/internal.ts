import FormData from 'form-data'
import { Quester } from '@satorijs/satori'
import Logger from 'reggol'

export interface Internal {}

const logger = new Logger('telegram')

export class Internal {
  constructor(public http: Quester) {}

  static define(method: string) {
    Internal.prototype[method] = async function (this: Internal, data = {}) {
      logger.debug('[request] %s %o', method, data)
      try {
        let response: any
        if (data instanceof FormData) {
          response = await this.http.post('/' + method, data, {
            headers: data.getHeaders(),
          })
        } else {
          response = await this.http.post('/' + method, data)
        }
        logger.debug('[response] %o', response)
        const { ok, result } = response
        if (ok) return result
        throw new Error(`Telegram API error ${response.data.error_code}. ${response.data.description}`)
      } catch (err) {
        if (err.response?.data?.error_code && err.response.data.description) {
          throw new Error(`Telegram API error ${err.response.data.error_code}. ${err.response.data.description}`)
        } else {
          throw err
        }
      }
    }
  }
}
