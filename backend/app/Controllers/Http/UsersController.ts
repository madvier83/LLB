// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import BaseController from './BaseController'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

export default class UsersController extends BaseController {
  public model = User

    public async login({ request,view }) {
      try {
        const user = await User.findBy('username', request.all().username)
        if (user !== null) {
          const userPass = user?.password
          if (await Hash.verify(userPass, request.all().password)) {
            return user
            // return view.render('/dashboard')
          } else {
            return { message: 'You have entered an invalid username or password' }
          }
        } else {
          return { message: 'You have entered an invalid username or password' }
        }
      } catch (error) {
        return error.message
      }

    }

    public async store({ request }) {
      return super.store({
        username: request.all().username,
        password: request.all().password,
      })
    }

    public async update({ params, request }) {
      return super.update(params.id, {
        username: request.all().username,
        password: request.all().password,
      })
    }
  }




