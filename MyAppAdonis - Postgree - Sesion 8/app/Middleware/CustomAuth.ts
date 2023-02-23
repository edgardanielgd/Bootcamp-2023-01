import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Perfil from 'App/Models/Perfil'

export default class CustomAuth {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>, perms?: string[] ) {
    if( !auth.user ) {
      response.unauthorized({ message: 'No estas logueado como usuario' })
      return
    }

    const perfil = await Perfil.find( auth.user.per_id );
    const perfil_name = ( perfil ) ? perfil.per_nombre : "None";

    console.log("ola2")
    if ( perfil_name != "admin" && !( perms && ! (perfil_name in perms) ) ) {
      response.unauthorized({ message: 'No tienes permisos para realizar esta acción' })
      return
    }

    console.log("ola")
    
    await next()
  }
}
