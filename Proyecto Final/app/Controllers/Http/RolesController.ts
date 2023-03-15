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
}
