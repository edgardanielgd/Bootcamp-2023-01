import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import apitokens from 'App/Models/apitokens'

export default class AuthController {
    public async register({ request, auth }: HttpContextContract) {
        const { nombre, email, password } = request.all()
        const user = await apitokens.create({ nombre, email, password })
        
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
}
