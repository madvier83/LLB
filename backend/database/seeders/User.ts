import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        username: 'dimasrio',
        password: await Hash.make('mas'),
      },
    ])
  }
}
