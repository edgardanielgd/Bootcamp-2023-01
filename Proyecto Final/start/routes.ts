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
  return { hello: 'world' }
}).middleware("auth")

Route.group(() => {
    Route.get('/listar', 'AnswersController.getListarRespuestas');
    Route.post('/registrar', 'AnswersController.registrar');
}).prefix('api/v1/respuestas').middleware("auth")

Route.group(() => {
    Route.get('/listar', 'RolesController.getListarRoles');
    Route.post('/registrar', 'RolesController.registrar');
} ).prefix('api/v1/roles').middleware("auth")

Route.group(() => {
    Route.get('/listar', 'FormsController.getListarFormularios');
    Route.post('/registrar', 'FormsController.registrar');
}).prefix('api/v1/formularios').middleware("auth")

Route.group(() => {
    Route.get('/listar', 'DocumentTypesController.getListarDocumentos');
    Route.post('/registrar', 'DocumentTypesController.registrar');
} ).prefix('api/v1/tipos-documentos').middleware("auth")

Route.group(() => {
    Route.get('/listar', 'QuestionsController.getListarPreguntas');
    Route.post('/create', 'QuestionsController.registrar');
}).prefix('api/v1/questions').middleware("auth")

Route.group(() => {
    Route.get('/listar', 'UsersController.getListarUsuarios');
    
} ).prefix('api/v1/usuarios').middleware("auth")

Route.group(() => {
  Route.post('/login', 'UsersController.login');
}).prefix('api/v1/')

Route.group(() => {
    Route.post('/create', 'UsersController.registrar');
}).prefix('api/v1/user/')

Route.group(() => {
    Route.get('/listar', 'UsersController.getListarUsuarios');
    Route.post('/getUsers', 'UsersController.getUsers');
    Route.put('/update/:id', 'UsersController.update');
    Route.get('/delete/:id', 'UsersController.delete');
    Route.get('/get/:id', 'UsersController.get');
}).prefix('api/v1/user/').middleware("auth")