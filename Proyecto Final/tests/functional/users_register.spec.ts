import { test } from '@japa/runner'

test('login page', async ({ client }) => {
    const response = await client.post('/api/v1/user/create')
    .field('firstName', 'Edgar')
    .field('secondName', 'Gonzalez')
    .field('surname', 'Gonzalez')
    .field('secondSurName', 'Diaz')
    .field('email', 'edgardanielgd@unal.edu.co')
    .field('password', '12345678')
    .field('typeDocument', 1)
    .field('documentNumber', "123")
    .field('phone', 123456789)
    .field('rol_id', 1)

    response.assertStatus(200)
})