import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsuariosController {
    public async indexUsers({}: HttpContextContract) {
        const users = await User.all()
        return users
    }

    public async indexUserById({ request }: HttpContextContract) {

        const user = await User.findOrFail( request.params().id )
        return user
    }

    public async editUser({ request, response }: HttpContextContract) {
        const user_data = request.only(
            [
                'usr_nombres', 'usr_apellidos', 'usr_email', 'password', 
                'usr_telefono', 'usr_doc_tipo', 'usr_documento',
                'usr_direccion', 'usr_barrio', 'usr_ciudad',
                'usr_departamento', 'per_id'
            ]
        )

        if( ! await this.validateUser( user_data.usr_documento ) ) {
            return response.badRequest( { message: 'El documento ya existe' } )
        }

        const user = await User.findOrFail( request.params().id )
        user.usr_nombres = user_data.usr_nombres
        user.usr_apellidos = user_data.usr_apellidos
        user.usr_email = user_data.usr_email
        user.password = user_data.password
        user.usr_telefono = user_data.usr_telefono
        user.usr_doc_tipo = user_data.usr_doc_tipo
        user.usr_documento = user_data.usr_documento
        user.usr_direccion = user_data.usr_direccion
        user.usr_barrio = user_data.usr_barrio
        user.usr_ciudad = user_data.usr_ciudad
        user.usr_departamento = user_data.usr_departamento
        await user.save()

        return user
    }

    public async deleteUser({ request }: HttpContextContract) {
        const user = await User.findOrFail( request.params().id )
        await user.delete()
        return user
    }

    private async validateUser( user_identification : number ) {
        const user = await User.query().where('usr_documento', user_identification)
        
        if( user ) {
            return false
        }
        return true
    }
}
