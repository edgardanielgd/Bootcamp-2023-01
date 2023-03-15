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
    Route.get('/get', 'AnswersController.getListarRespuestas');
    Route.post('/create', 'AnswersController.registrar');
    Route.put('/update/:id', 'AnswersController.update');
    Route.delete('/delete/:id', 'AnswersController.delete');
    Route.get('/get/:id', 'AnswersController.getRespuesta');
}).prefix('api/v1/respuestas').middleware("auth")

Route.group(() => {
    Route.get('/get', 'RolesController.getListarRoles');
    Route.post('/create', 'RolesController.registrar');
    Route.put('/update/:id', 'RolesController.update');
    Route.delete('/delete/:id', 'RolesController.delete');
    Route.get('/get/:id', 'RolesController.getRol');
} ).prefix('api/v1/roles').middleware("auth")

Route.group(() => {
    Route.get('/get', 'FormsController.getListarFormularios');
    Route.post('/create', 'FormsController.registrar');
    Route.put('/update/:id', 'FormsController.update');
    Route.delete('/delete/:id', 'FormsController.delete');
    Route.get('/get/:id', 'FormsController.getFormulario');
}).prefix('api/v1/formularios').middleware("auth")

Route.group(() => {
    Route.get('/get', 'DocumentTypesController.getListarDocumentos');
    Route.post('/create', 'DocumentTypesController.registrar');
    Route.put('/update/:id', 'DocumentTypesController.update');
    Route.delete('/delete/:id', 'DocumentTypesController.delete');
    Route.get('/get/:id', 'DocumentTypesController.getDocumento');

} ).prefix('api/v1/tipos-documentos').middleware("auth")

Route.group(() => {
    Route.get('/get', 'QuestionsController.getListarPreguntas');
    Route.post('/create', 'QuestionsController.registrar');
    Route.put('/update/:id', 'QuestionsController.update');
    Route.delete('/delete/:id', 'QuestionsController.delete');
    Route.get('/get/:id', 'QuestionsController.getPregunta');
}).prefix('api/v1/questions').middleware("auth")

Route.group(() => {
  Route.post('/login', 'UsersController.login');
}).prefix('api/v1/')

Route.group(() => {
    Route.post('/create', 'UsersController.registrar');
}).prefix('api/v1/user/')

Route.group(() => {
    Route.get('/get', 'UsersController.getUsers');
    Route.put('/update/:id', 'UsersController.update');
    Route.get('/delete/:id', 'UsersController.delete');
    Route.get('/get/:id', 'UsersController.get');
}).prefix('api/v1/user/').middleware("auth")