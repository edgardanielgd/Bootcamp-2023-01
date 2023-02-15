import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Perfil from 'App/Models/Perfil';

export default class PerfilsController {
    async setRegistrarPerfil({ request, response } : HttpContextContract ) {
        try{
            const dataPerfil = request.only([
                'perID', 'usrID', 'gruID', 'perNombre', 'perFechaCreacion'
            ]);

            const { perID } = dataPerfil;

            const perfilExistente : Number = await this.getValidarPerfilExistente (
                perID
            );
            
            if( ! perfilExistente || perfilExistente == 0 ) {
                await Perfil.create(
                    dataPerfil
                );

                response.status( 200 ).json({
                    "msg" : "Registro de perfil completado"
                });
            } else {
                response.status(400).json({
                    "msg" : "El codigo del perfil ya se encuentra registrado"
                });
            }
        }
        catch( error ){
            console.log( error );
            response.status(500).json({
                "msg" : "Error en el servidor"
            })
        }
    }

    private async getValidarPerfilExistente( perID : Number ) : Promise<Number> {
        const total = await Perfil.query()
            .where( 'perID' , perID.toString() )
            .count( 'perID as perID' )
            .from('perfils');

        return parseInt( total[0] ['count(*)'] );
    }

}
