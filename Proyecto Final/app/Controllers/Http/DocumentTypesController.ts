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
}
