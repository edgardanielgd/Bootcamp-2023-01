import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cliente from 'App/Models/Cliente'

export default class ClientesController {

    public async getListarClientes() : Promise<Cliente[]> {
        const clientes = await Cliente.all();
        return clientes;
    }

    public async actualizaClientes({ request, response } : HttpContextContract ) {
        const cedula = request.param('id');
        const cliente = await Cliente.findOrFail(cedula);
        const data = request.only(['nombre', 'apellido', 'telefono', 'correo']);

        cliente.nombre = data.nombre;
        cliente.apellido = data.apellido;
        cliente.telefono = data.telefono;
        cliente.correo = data.correo;
        await cliente.save();

        return response.status( 200 ).json(
            {
                message: "Actualizado correctamente"
            }
        )
    }

    public async eliminarCliente( { request, response } : HttpContextContract ) {
        const cedula = request.param('id');
        const cliente = await Cliente.findOrFail(cedula);
        await cliente.delete();

        return response.status( 200 ).json(
            {
                message: "Eliminado correctamente"
            }
        );
    }

    public async setRegistrarClientes({request, response}: HttpContextContract){
        const data = request.only(['cedula', 'nombre', 'apellido', 'telefono', 'correo'])
        
        try {
            const existente = await this.getValidarClienteExistente(data.cedula);
            if (existente && existente.length > 0) {
                await Cliente.create( data );
                response.status(200).json(
                    {
                        message : "Registro completado"
                    }
                )
            } else {
                response.status(400).json(
                    {
                        message: "El cliente ya existe"
                    }
                )
            }
        } catch( e ) {
            console.log( e );
            response.status(500).json(
                {
                    message: "Error en el servidor"
                }
            )
        }
        
        const cliente = await Cliente.create(data)
        return response.json(cliente)
    }

    private async getValidarClienteExistente(cedula : number) : Promise<Cliente[] | null> {
        const existente = await Cliente
            .query()
            .where('cedula', cedula)

        return existente;
    }
}
