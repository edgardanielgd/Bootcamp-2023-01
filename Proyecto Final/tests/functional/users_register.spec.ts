import { test } from '@japa/runner'

test('login page', async ({ client }) => {
    const response = await client.post('/api/auth/register')
    .field('name', 'test')
    
    response.assertStatus(200)
    response.assertBodyContains({ login: 'page' })
})