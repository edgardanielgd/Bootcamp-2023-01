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

Route.group( () => {
  Route.get('/listar-usuarios', 'UsuariosController.getListarUsuarios');
  Route.get('/listar-perfil', 'UsuariosController.getListarUsuariosYPerfil');
  Route.get('/listar-publicaciones', 'UsuariosController.getListarUsuariosYPublicacion');
  Route.get('/listar-usuarios-grupos', 'UsuariosController.getListarUsuariosGrupo');
  Route.get('/listar-usuario-por-ID/:id', 'UsuariosController.getUsuarioPorID');

  Route.post('/registrar-usuarios', 'UsuariosController.setRegistrarUsuarios');
  Route.post('/registrar-perfil', 'PerfilsController.setRegistrarPerfil');
  Route.post('/registrar-publicaciones', 'PublicacionsController.setRegistrarPublicacion');
  Route.post('/registrar-grupo', 'GruposController.setRegistrarUsuarioGrupo');
  Route.post('/registrar-usuario-grupo', 'GrupoUsuariosController.setRegistrarUsuarioGrupo');

  Route.delete('/eliminar-usuario/:id', 'UsuariosController.setEliminarUsuario');

  Route.put('/actualizar-usuario/:id', 'UsuariosController.setActualizarUsuario');

}).prefix('/alcaldia');
