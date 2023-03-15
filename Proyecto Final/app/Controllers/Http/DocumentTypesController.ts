import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DocumentType from 'App/Models/DocumentType'


export default class DocumentTypeController {
    public async registrar({request}: HttpContextContract){
        const {tipo_documento} = request.all();
        const tipoDoc = new DocumentType();

        tipoDoc.name = tipo_documento;
        tipoDoc.state = true;

        await tipoDoc.save();
        return{tipoDoc, "msg": "Tipo Documento registrado"}
    }

    public async getListarDocumentos(): Promise<DocumentType[]> {
        const tipoDoc = await DocumentType.all();
        return tipoDoc;
    }


    public async getDocumento({params}: HttpContextContract){
        const tipoDoc = await DocumentType.find(params.id);
        return tipoDoc;
    }

    public async update({request, params}: HttpContextContract){
        const tipoDoc = await DocumentType.find(params.id);

        if( !tipoDoc ){
            return {
                state: false,
                msg: "Tipo Documento no encontrado"
            }
        }

        const {tipo_documento} = request.all();

        tipoDoc.name = tipo_documento;
        tipoDoc.state = true;

        await tipoDoc.save();
        return{tipoDoc, "msg": "Tipo Documento actualizado"}
    }

    public async delete({params}: HttpContextContract){
        const tipoDoc = await DocumentType.find(params.id);

        if( !tipoDoc ){
            return {
                state: false,
                msg: "Tipo Documento no encontrado"
            }
        }

        tipoDoc.delete();
        return{tipoDoc, "msg": "Tipo Documento eliminado"}
    }

}
