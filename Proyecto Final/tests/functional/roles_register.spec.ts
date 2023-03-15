import { test } from '@japa/runner';
import { obtenerToken } from './users_login.spec';

test('register role', async ({ client }) => {
    const token = await obtenerToken();
    const response = await client.post('/api/v1/roles/create')
        .header('Authorization', `Bearer ${token}`)
        .field('name', 'Test')
        .field('description', 'Test');

    response.assertStatus(200);
});
