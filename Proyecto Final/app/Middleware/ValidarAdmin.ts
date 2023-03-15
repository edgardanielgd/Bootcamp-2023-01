import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsersController from 'App/Controllers/Http/UsersController'
import User from 'App/Models/User'

export default class ValidarAdmin {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    const authorizationHeader: any = ctx.request.header('authorization')      
    const authorizedRoleId = 1;
    try{
      const usuariosController = new UsersController()
      const {id} = await usuariosController.obtenerPayload(authorizationHeader)  
      const usuario = await User.find(id) 

      if(!usuario){
        return ctx.response.status(401).json({
          msj: 'Token no válido'
        })
      }
      
      if(usuario.rol_id != authorizedRoleId){
        return ctx.response.status(401).json({
          msj: 'No tiene permisos para realizar esta acción'
        })
      }
      
      await next()
    }catch(error){            
      console.log(error);
      ctx.response.status(400).json({"msj": "Token no valido"})
    }    
  }
}
