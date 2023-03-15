import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TipoDocumento from 'App/Models/DocumentType';


export default class TipoDocumentosController {
    public async registrar({request}: HttpContextContract){
        const {tipo_documento} = request.all();
        const tipoDoc = new TipoDocumento();
        tipoDoc.name = tipo_documento;
        await tipoDoc.save();
        return{tipoDoc, "msj": "Tipo Documento registrado"}
    }

    public async getListarDocumentos(): Promise<TipoDocumento[]> {
        const tipoDoc = await TipoDocumento.all();
        return tipoDoc;
    }

    public async getTipoDocumento({params}: HttpContextContract){
        const tipoDoc = await TipoDocumento.find(params.id);
        return tipoDoc;
    }

    public async actualizar({request, params}: HttpContextContract){
        const {tipo_documento} = request.all();
        const tipoDoc = await TipoDocumento.find(params.id);
        if( !tipoDoc ){
            return {
                state: false,
                msg: "Tipo Documento no encontrado"
            }
        }

        tipoDoc.name = tipo_documento;
        await tipoDoc.save();
        return{tipoDoc, "msj": "Tipo Documento actualizado"}
    }

    public async delete({params}: HttpContextContract){
        const tipoDoc = await TipoDocumento.find(params.id);

        if( !tipoDoc ){
            return {
                state: false,
                msg: "Tipo Documento no encontrado"
            }
        }

        await tipoDoc.delete();
        return{tipoDoc, "msj": "Tipo Documento eliminado"}
    }

}
