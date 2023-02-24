import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
    public async register({ request, auth, response }: HttpContextContract) {
        const userData = request.only(
            [
                'usr_nombres', 'usr_apellidos', 'usr_email', 'password', 
                'usr_telefono', 'usr_doc_tipo', 'usr_documento',
                'usr_direccion', 'usr_barrio', 'usr_ciudad',
                'usr_departamento', 'per_id'
            ]
        )

        if( ! this.validateUser( userData.usr_documento ) ) {
            return response.badRequest( { message: 'El documento ya existe' } )
        }

        const user = await User.create( userData)
        
        const token = await auth.use("api").login(
            user, {
                expiresIn: "10 minutes"
            }
        )

        return {
            token, 
            msg : "Usuario registrado correctamente"
        }
    }

    public async login({ request, auth }: HttpContextContract) {
        const usr_email = request.input('usr_email')
        const password = request.input('password')

        const token = await auth.use("api").attempt(
            usr_email, password, {
                expiresIn: "60 minutes"
            }
        )

        return {
            token, 
            msg : "Usuario logueado correctamente"
        }
    }

    private async validateUser( user_identification : string ) {
        const user = await User.query().where('usr_documento', user_identification )
        if( user ) {
            return false
        }
        return true
    }
}
