import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Perfil from 'App/Models/Perfil'

export default class PerfilsController {
    public async perfilIndex({}: HttpContextContract) {
        const perfils = await Perfil.all()
        return perfils
    }

    public async perfilIndexById({ request }: HttpContextContract) {
        const perfil = await Perfil.findOrFail( request.params().id )
        return perfil
    }

    public async perfilStore({ request }: HttpContextContract) {
        const perfil_data = request.only(
            [
                'per_nombre', 'per_descripcion'
            ]
        )
        const perfil = await Perfil.create(perfil_data)
        return perfil
    }

    public async perfilEdit({ request }: HttpContextContract) {
        const perfil_data = request.only(
            [
                'per_nombre', 'per_descripcion'
            ]
        )

        const perfil = await Perfil.findOrFail( request.params().id )
        perfil.per_nombre = perfil_data.per_nombre
        perfil.per_descripcion = perfil_data.per_descripcion
        await perfil.save()

        return perfil
    }

    public async perfilDelete({ request }: HttpContextContract) {
        const perfil = await Perfil.findOrFail( request.params().id )
        await perfil.delete()
        return perfil
    }
}
