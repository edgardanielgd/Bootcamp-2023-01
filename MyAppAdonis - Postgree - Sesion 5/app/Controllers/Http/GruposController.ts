import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Grupo from 'App/Models/Grupo'

export default class UsuariosController {
    public async setRegistrarGrupo({
        request, response
    } : HttpContextContract ) {
        try{
            const dataGrupo = request.only([
                "gruID", "gruNombre"
            ]);

            const { gruID } = dataGrupo.gruID;

            const gruExistente = await this.getValidarGrupoExistente( gruID );

            if ( ! gruExistente || gruExistente === 0 ) {
                await Grupo.create(
                    dataGrupo
                );

                response.status(200).json(
                    {
                        "msg" : "Grupo registrado :D"
                    }
                )
            } else {
                response.status( 400 ).json({
                    "msg" : "Ya hay un grupo con ese codigo :P"
                })
            }
            
        }
        catch( error ){
            console.log( error );
            response.status(500).json({
                "msg" : "Error en el servidor"
            })
        }
    }

    private async getValidarGrupoExistente(
        gruID : Number 
    ) : Promise<Number> {
        const total = await Grupo.query()
            .where({
                "gruID" : gruID
            })
            .count('*')
            .from(
                'grupos'
            );

        return parseInt( total[0]["count(*)"]);
    }
}
