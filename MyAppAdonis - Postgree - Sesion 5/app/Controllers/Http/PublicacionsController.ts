import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Publicacions from 'App/Models/Publicacion';

export default class PublicacionsController {
    async setRegistrarPublicacion({ request, response } : HttpContextContract ) {
        try{
            const dataPublicacion = request.only([
                'pubID', 'pubTitulo', 'pubCuerpo', 'usrID'
            ]);

            const { pubID } = dataPublicacion;

            const publicacionExistente : Number = await this.getValidarPublicacionExistente (
                pubID
            );
            
            if( ! publicacionExistente || publicacionExistente == 0 ) {
                await Publicacions.create(
                    dataPublicacion
                );

                response.status( 200 ).json({
                    "msg" : "Registro de publicacion completado"
                });
            } else {
                response.status(400).json({
                    "msg" : "El codigo de la publicacion ya se encuentra registrado"
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

    private async getValidarPublicacionExistente( pubID : Number ) : Promise<Number> {
        const total = await Publicacions.query()
            .where( 'pubID' , pubID.toString() )
            .count( 'pubID as pubID' )
            .from('publicacions');

        return parseInt( total[0] ['count(*)'] );
    }
}
