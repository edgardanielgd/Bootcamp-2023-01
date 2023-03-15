import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Question from 'App/Models/Question'

export default class QuestionsController {
    public async registrar({request}: HttpContextContract){
        const {
            question
        } = request.all();

        const pregunta = new Question();

        pregunta.question = question;
        pregunta.state = true;

        await pregunta.save();
        return{pregunta, "msg": "Pregunta registrada"}
    }

    public async getListarPreguntas(): Promise<Question[]> {
        const question = await Question.all();
        return question;
    }
}
