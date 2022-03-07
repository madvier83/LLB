// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Settings from 'App/Models/Setting'
import BaseController from './BaseController'

export default class SettingsController extends BaseController {
  public model = Settings

  public async store({ request }) {
    return super.store({
      key: request.all().key,
      value: request.all().value,
    })
  }

  public async update({ params, request }) {
    return super.update(params.id, {
      key: request.all().key,
      value: request.all().value,
    })
  }
}
