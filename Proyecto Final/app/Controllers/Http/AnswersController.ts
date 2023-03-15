import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Answer from 'App/Models/Answer'

export default class AnswersController {
    public async registrar({request}: HttpContextContract){
        const {
            answer, is_correct, question_id
        } = request.all();

        const respuesta = new Answer();

        respuesta.answer = answer;
        respuesta.state = true;
        respuesta.is_correct = is_correct;
        respuesta.question_id = question_id;

        await answer.save();
        return{answer, "msg": "Respuesta registrada"}
    }

    public async getListarRespuestas(): Promise<Answer[]> {
        const answer = await Answer.all();
        return answer;
    }
}
