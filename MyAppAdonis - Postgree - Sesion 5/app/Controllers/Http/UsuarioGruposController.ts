import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Grupo from 'App/Models/Grupo';
import Usuario from 'App/Models/Usuario';
import UsuarioGrupo from 'App/Models/UsuarioGrupo';

export default class UsuarioGruposController {
    public async setRegistrarUsuarioGrupo({
        request, response
    } : HttpContextContract ) {
        try{
            const dataUsuarioGrupo = request.only([
                'usrID', 'gruID', 'u_gInicio'
            ]);

            const { usrID, gruID } = dataUsuarioGrupo;

            const datosExistentes : Number = await this.getValidarDatosGrupoUsuario(
                usrID, gruID
            );
            
            switch( datosExistentes ) {
                case 0:
                    await UsuarioGrupo.create(
                        dataUsuarioGrupo
                    );

                    response.status( 200 ).json({
                        "msg" : "Registro de usuario en grupo completo"
                    });

                    break;
                
                case 1:
                    response.status(400).json({
                        "msg" : "El codigo del usuario no se encuentra registrado"
                    });

                    break;
                
                case 2:
                    response.status(400).json({
                        "msg" : "El codigo del grupo no se encuentra registrado"
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

    private async getValidarDatosGrupoUsuario( usrID : Number, gruID : Number ) : Promise<Number> {
        let total = await Grupo.query().where(
            {
                "gruID" : gruID
            }
        ).count('*').from('grupos');

        let cantidadDatos = parseInt( total[0]['count(*)'] );
        
        if ( cantidadDatos !== 0){
            total = await Usuario.query().where({
                "usrID" : usrID
            }).count('*').from('usuarios');

            cantidadDatos = parseInt( total[0]['count(*)'] );

            if (! cantidadDatos ||  cantidadDatos !== 0 ) {
                return 0;
            } else {
                return 2;
            }
        } else {
            return 1
        }
        
    }
}
