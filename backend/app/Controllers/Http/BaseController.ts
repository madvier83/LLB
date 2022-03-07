// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BaseController {
  public model

  public async index() {
    if (this.model !== undefined) {
      return await this.model.all()
    }
  }

  public async store(data) {
    if (this.model !== undefined) {
      try {
        await this.model.create(data)
        return { message: 'success' }
      } catch (error) {
        return error.message
      }
    }
  }

  public async edit({ params }) {
    if (this.model !== undefined) {
      try {
        return await this.model.findOrFail(params.id)
      } catch (error) {
        return { message: 'empty' }
      }
    }
  }

  public async update(id, data) {
    if (this.model !== undefined) {
      try {
        const user = await this.model.findOrFail(id)
        await user.merge(data).save()
        return { message: 'success' }
      } catch (error) {
        return error.message
      }
    }
  }

  public async delete({ params }) {
    if (this.model !== undefined) {
      try {
        ;(await this.model.findOrFail(params.id)).delete()
        return { message: 'success' }
      } catch (error) {
        return { message: 'failed' }
      }
    }
  }
}
