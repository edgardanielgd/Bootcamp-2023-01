import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario';

export default class UsuariosController {
    public async getListarUsuarios() : Promise<Usuario[]> {
        const users = await Usuario
            .query()
            .from('usuarios');
        return users;
    }

    public async getListarUsuariosYPerfil() : Promise<Usuario[]> {
        const users = await Usuario
            .query()
            .preload('perfil')
        return users;
    }

    public async getListarUsuariosYPublicacion() : Promise<Usuario[]> {
        const users = await Usuario
            .query()
            .preload('publicacions')
        return users;
    }

    public async getListarUsuariosGrupo() : Promise<Usuario[]> {
        const users = await Usuario
            .query()
            .preload('usuario_grupos')
        return users;
    }

    public async getUsuarioPorID( { request } ) : Promise<Usuario | null > {
        const usuario = await Usuario
            .query()
            .where({'usrid': request.param('id').toString() })
            .first();

        return usuario;
    }

    public async setEliminarUsuario( { request } ) : Promise<void> {
        await Usuario
        .query()   
        .where({'usrid': request.params('id').toString() })
        .delete();
    }

    public async setActualizarUsuario( { request } ) : Promise<void> {

        const dataUsuario = request.only([
            "usrNombre", "usrPassword",
            "usrEmail", "usrTelefono", "perfil" 
        ]);

        await Usuario
        .query()   
        .where({'usrid': request.params('id').toString() })
        .update(
            dataUsuario
        );
    }

    public async setRegistrarUsuarios(
        { request, response} : HttpContextContract
    ) {
        const dataUsuario = request.only([
            "usrID", "usrNombre", "usrPassword",
            "usrEmail", "usrTelefono", "perfil" 
        ]);

        try{
            const { usrID } = dataUsuario;

            const usuarioExistente : Number = await this.getValidarUsuarioExistente(
                usrID
            );

            if ( ! usuarioExistente || usuarioExistente === 0 ) {
                await Usuario.create( dataUsuario );
                return response.status(200).json({
                    msg : "Usuario registrado correctamente"
                });
            } else {
                return response.status(400).json({
                    msg : "Usuario ya existe"
                });
            }
        } catch( e ){
            console.log( e )
            return response.status(500).json({
                message : "Error al registrar usuario",
            });
        }
    }

    private async getValidarUsuarioExistente( usrID : Number ) : Promise<Number> {
        const usuarioExistente = await Usuario
            .query()
            .where({'usrID': usrID.toString() })
            .count('*')
            .from('usuarios');

        return usuarioExistente[0]['count(*)'];
    }
}
