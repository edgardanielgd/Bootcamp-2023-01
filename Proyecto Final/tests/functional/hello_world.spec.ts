import { test } from '@japa/runner'
import { obtenerToken } from './users_login.spec'

test('display welcome page', async ({ client }) => {
  const token = await obtenerToken()
  const response = await client.get('/')
    .header('Authorization', `Bearer ${token}`)

  response.assertStatus(200)
  response.assertBodyContains({ hello: 'world' })
})
