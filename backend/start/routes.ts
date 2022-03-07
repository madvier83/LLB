/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'LLB | Lembaga Literatur Baptis Api' }
})

Route.group(() => {
  /* Users Routes */
  Route.get('/users', 'UsersController.index')
  Route.get('/users/:id', 'UsersController.edit')
  Route.post('/users', 'UsersController.store')
  Route.put('/users/:id', 'UsersController.update')
  Route.delete('/users/:id', 'UsersController.delete')

  /* Customers Routes */
  Route.get('/customers', 'CustomersController.index')
  Route.get('/customers/:id', 'CustomersController.edit')
  Route.post('/customers', 'CustomersController.store')
  Route.put('/customers/:id', 'CustomersController.update')
  Route.delete('/customers/:id', 'CustomersController.delete')
  Route.put('/address/:id', 'CustomersController.multiAddress')
  Route.post('/import', 'CustomersController.import')

  /* Settings Routes */
  Route.get('/settings', 'SettingsController.index')
  Route.get('/settings/:id', 'SettingsController.edit')
  Route.post('/settings', 'SettingsController.store')
  Route.put('/settings/:id', 'SettingsController.update')
  Route.delete('/settings/:id', 'SettingsController.delete')

  /* Print Routes */
  Route.get('queue', 'PrintQueuesController.index')
  Route.get('preview/:id', 'PrintQueuesController.getSpecificPrint')
  Route.get('queue/:id', 'PrintQueuesController.edit')
  Route.post('queue', 'PrintQueuesController.store')
  Route.put('queue/:id', 'PrintQueuesController.update')
  Route.delete('queue/:id', 'PrintQueuesController.delete')

  Route.delete('print', 'PrintQueuesController.print')

  /* History Router */
  Route.get('history', 'PrintQueuesController.history')

  /* get address */
  Route.get('getAddress', 'CustomersController.getAddress')
  Route.get('getAddress/:kodepos', 'CustomersController.getSpecificAddress')
  Route.get('getAddress/:kodepos/:kelurahan', 'CustomersController.getAddressFromPostId')
  Route.get('getKelurahan/:kodepos', 'CustomersController.getKelurahan')

  /* Login Routes */
  Route.post('/login', 'UsersController.login')
}).prefix('/api')
