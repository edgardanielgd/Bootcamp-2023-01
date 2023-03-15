import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

export async function obtenerToken() {
    const endpoint = '/api/v1/login';
    const body = {
        email: 'edgonzalezdi@unal.edu.co',
        password: '12345678'
    }
    const response = await axios.post(
        `${Env.get("PATH_APP") + endpoint}`, 
        body
    );

    return response.data['token'];
}