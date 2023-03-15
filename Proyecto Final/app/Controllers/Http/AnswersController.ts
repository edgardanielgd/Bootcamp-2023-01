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

    public async getRespuesta({params}: HttpContextContract){
        const answer = await Answer.find(params.id);
        return answer;
    }

    public async update({request, params}: HttpContextContract){
        const respuesta = await Answer.find(params.id);

        if( !respuesta ){
            return {
                state: false,
                msg: "Respuesta no encontrada"
            }
        }

        const {
            answer, is_correct, question_id
        } = request.all();

        answer.answer = answer;
        answer.state = true;
        answer.is_correct = is_correct;
        answer.question_id = question_id;

        await answer.save();
        return{
            state : true,
            answer, "msg": "Respuesta actualizada"
        }
    }

    public async delete({params}: HttpContextContract){
        const answer = await Answer.find(params.id);

        if( !answer ){
            return {
                state: false,
                msg: "Respuesta no encontrada"
            }
        }

        answer.delete();
        
        return{
            state : true,
            answer, "msg": "Respuesta eliminada"
        }
    }
}
