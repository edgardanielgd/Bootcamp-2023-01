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

Route.group(
  () => {
    Route.post("/register", "AuthController.register");
    Route.post("/login", "AuthController.login");

    Route.get("/book", "BooksController.indexBook").middleware([
      "auth","customAuth:editor,reader"
    ]);
    Route.get("/book/:id", "BooksController.indexBookById").middleware([
      "auth","customAuth:editor,reader"
    ]);
    Route.post("/book", "BooksController.storeBook").middleware([
      "auth","customAuth:editor"
    ]);;
    Route.put("/book/:id", "BooksController.editBook").middleware([
      "auth","customAuth:editor"
    ]);;
    Route.delete("/book/:id", "BooksController.deleteBook").middleware([
      "auth","customAuth:editor"
    ]);

    Route.get("/user", "UsersController.indexUser");
    Route.get("/user/:id", "UsersController.indexUserById");
    Route.put("/user/:id", "UsersController.editUser");
    Route.delete("/user/:id", "UsersController.deleteUser");

    Route.get("/perfil", "PerfilsController.perfilIndex").middleware([
      "auth","customAuth"
    ]);
    Route.get("/perfil/:id", "PerfilsController.perfilIndexById").middleware([
      "auth","customAuth"
    ]);
    Route.post("/perfil", "PerfilsController.perfilStore"); // .middleware("customAuth")

    Route.put("/perfil/:id", "PerfilsController.perfilEdit").middleware([
      "auth","customAuth"
    ]);
    Route.delete("/perfil/:id", "PerfilsController.perfilDelete").middleware([
      "auth","customAuth"
    ]);

  }
).prefix("api")
