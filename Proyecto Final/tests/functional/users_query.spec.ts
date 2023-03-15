import { test } from '@japa/runner';
import { obtenerToken } from './users_login.spec';

test('getting users', async ({ client }) => {
    const token = await obtenerToken();
    const response = await client.get('/api/v1/user/get')
        .header('Authorization', `Bearer ${token}`);

    response.assertStatus(200);
});
