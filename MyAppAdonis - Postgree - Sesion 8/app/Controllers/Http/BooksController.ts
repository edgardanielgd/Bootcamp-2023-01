import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'

export default class BooksController {
    public async indexBook({}: HttpContextContract) {
        const books = await Book.all()
        return books
    }

    public async indexBookById({ request }: HttpContextContract) {
        const book = await Book.findOrFail( request.params().id )
        return book
    }

    public async storeBook({ request }: HttpContextContract) {
        const book_data = request.only(
            [
                'book_title', 'book_editorial', 'book_formato', 'book_paginas'
            ]
        )
        const book = await Book.create(book_data)
        return book
    }

    public async editBook({ request }: HttpContextContract) {
        const book_data = request.only(
            [
                'book_title', 'book_editorial', 'book_formato', 'book_paginas'
            ]
        )

        const book = await Book.findOrFail( request.params().id )
        book.book_title = book_data.book_title
        book.book_editorial = book_data.book_editorial
        book.book_formato = book_data.book_formato
        book.book_paginas = book_data.book_paginas
        await book.save()

        return book
    }

    public async deleteBook({ request }: HttpContextContract) {
        const book = await Book.findOrFail( request.params().id )
        await book.delete()
        return book
    }
}
