import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'

export default class BooksController {
    public async index({}: HttpContextContract) {
        const books = await Book.all()
        return books
    }

    public async store({ request }: HttpContextContract) {
        const { title, author } = request.all()
        const book = await Book.create({ title, author })
        return book
    }
}
