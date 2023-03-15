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

    public async getPregunta({params}: HttpContextContract){
        const question = await Question.find(params.id);
        return question;
    }

    public async update({request, params}: HttpContextContract){
        const preguntaObj = await Question.find(params.id);

        if( !preguntaObj ){
            return {
                state: false,
                msg: "Pregunta no encontrada"
            }
        }

        const {
            pregunta
        } = request.all();

        pregunta.question = pregunta;
        pregunta.state = true;

        await pregunta.save();
        return{
            state : true,
            pregunta, "msg": "Pregunta actualizada"
        }
    }

    public async delete({params}: HttpContextContract){
        const question = await Question.find(params.id);

        if( !question ){
            return {
                state: false,
                msg: "Pregunta no encontrada"
            }
        }

        question.delete();
        return{
            state : true,
            question, 
            "msg": "Pregunta eliminada"
        }
    }
    
}
