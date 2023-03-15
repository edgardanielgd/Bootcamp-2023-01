import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import Rol from 'App/Models/Rol';
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'
const bcryptjs = require('bcryptjs')

export default class UsersController {
    public async registrar({request}: HttpContextContract){
        const {
            firstName, secondName, surname, secondSurName,
            typeDocument, documentNumber, email, password, 
            rol_id, phone
        } = request.all();

        const salt = bcryptjs.genSaltSync();
        const user = new User();

        user.first_name = firstName;
        user.last_name = secondName;
        user.surname = surname;
        user.second_sur_name = secondSurName;
        user.document_type = typeDocument;
        user.document_number = documentNumber;
        user.email = email;
        user.password = bcryptjs.hashSync(password, salt);
        user.rol_id = rol_id;
        user.phone = phone;
        user.state = true;
        
        await user.save();
        return{
          state : true,
          user,
          "msg": "Usuario registrado"
        }
      }

      public async login({request, response}: HttpContextContract){
        const email = request.input('email');
        const password = request.input('password');
        try {
          //consultar si existe usuario con ese correo
          const user = await User.findBy('email', email)
          if(!user){
            return response.status(400).json({
              state : false,
              msj: 'contraseña o email invalido'})
          }
    
          const validPassword = bcryptjs.compareSync( password, user.password );
          if ( !validPassword ) {
            return response.status(400).json({msj: 'Los datos de acceso no son correctos'})
          }
          //Validar si la contraseña ingresada es igual a la del usaurio
          const payload ={
            'first_name': user.first_name,
            'last_name': user.last_name,
            'id': user.id,
            'cedula': user.document_number,
          }
          const token:string = this.generarToken(payload);

          const role = await Rol.findBy('id', user.rol_id)
    
          response.status(200).json({
            state : true,
            token,
            id: user.id,
            name: user.first_name + ' ' + user.last_name,
            role: role ? role.name : 'Sin rol',
            "message": "Ingreso exitoso"
          })
        } catch (error) {
          console.log( error )
          response.json({
            state : false,
            "msg": "contraseña o email invalido"
          });
        }
      }
    
      public generarToken(payload: any):string{
        const opciones = {
          expiresIn: "5 mins"
        }
        return jwt.sign(payload, Env.get('JWT_SECRET_KEY'), opciones)    
      }
    
      public verificarToken(authorizationHeader:string){
        let token = authorizationHeader.split(' ')[1]
        jwt.verify(token, Env.get('JWT_SECRET_KEY'), (error)=>{
            if(error){
                throw new Error("Token expirado");
                
            }
        })
        return true
      }
      
      public obtenerPayload (authorizationHeader:string) {
        let token = authorizationHeader.split(' ')[1]
        const payload = jwt.verify(token, Env.get("JWT_SECRET_KEY"), {complete: true}).payload
        console.log(payload)
        return payload
      }

      public getUsers({}: HttpContextContract){
        const users = User.all();
        return users;
      }

      public async get({params}: HttpContextContract){
        const user = await User.find(params.id);
        return user;
      }

      public async update({request, params}: HttpContextContract){
        const user = await User.find(params.id);

        if(user){
          const {
            firstName, secondName, surname, secondSurName,
            typeDocument, documentNumber, email, password, 
            rol_id, phone
          } = request.all();
          user.first_name = firstName;
          user.last_name = secondName;
          user.surname = surname;
          user.second_sur_name = secondSurName;
          user.document_type = typeDocument;
          user.document_number = documentNumber;
          user.email = email;
          user.password = password;
          user.rol_id = rol_id;
          user.phone = phone;
          user.state = true;
          await user.save();
          return user;
        }
      }

      public async delete({params}: HttpContextContract){
        const user = await User.find(params.id);
        if(user){
          await user.delete();
          return{
            state : true,
            "msg": "Usuario eliminado"
          }
        }
      }

      
}
