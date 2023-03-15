import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Form from 'App/Models/Form'

export default class FormsController {
    public async registrar({request}: HttpContextContract){
        const {
            answer_id, student_id
        } = request.all();

        const form = new Form();

        form.answer_id = answer_id;
        form.student_id = student_id;
        form.state = true;

        await form.save();
        return{form, "msg": "Formulario registrado"}
    }

    public async getListarFormularios(): Promise<Form[]> {
        const form = await Form.all();
        return form;
    }

    public async getFormulario({params}: HttpContextContract){
        const form = await Form.find(params.id);
        return form;
    }

    public async update({request, params}: HttpContextContract){
        const form = await Form.find(params.id);

        if( !form ){
            return {
                state: false,
                msg: "Formulario no encontrado"
            }
        }

        const {
            answer_id, student_id
        } = request.all();

        form.answer_id = answer_id;
        form.student_id = student_id;
        form.state = true;

        await form.save();
        return{form, "msg": "Formulario actualizado"}
    }

    public async delete({params}: HttpContextContract){
        const form = await Form.find(params.id);

        if( !form ){
            return {
                state: false,
                msg: "Formulario no encontrado"
            }
        }

        form.delete();
        return{form, "msg": "Formulario eliminado"}
    }
}
