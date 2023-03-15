import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Rol from 'App/Models/Rol'

export default class RolesController {
    public async registrar({request}: HttpContextContract){
        const {
            name
        } = request.all();
        const rolNuevo = new Rol();

        rolNuevo.name = name;
        rolNuevo.state = true;

        await rolNuevo.save();
        return{rolNuevo, "msg": "Rol registrado"}
    }

    public async getListarRoles(): Promise<Rol[]> {
        const rol = await Rol.all();
        return rol;
    }

    public async getRol({params}: HttpContextContract){
        const rol = await Rol.find(params.id);
        return rol;
    }

    public async update({request, params}: HttpContextContract){
        const rol = await Rol.find(params.id);

        if( !rol ){
            return {
                state: false,
                msg: "Rol no encontrado"
            }
        }

        const {
            name
        } = request.all();

        rol.name = name;
        rol.state = true;

        await rol.save();
        return{rol, "msg": "Rol actualizado"}
    }

    public async delete({params}: HttpContextContract){
        const rol = await Rol.find(params.id);

        if( !rol ){
            return {
                state: false,
                msg: "Rol no encontrado"
            }
        }

        rol.delete();
        return{rol, "msg": "Rol eliminado"}
    }
}
