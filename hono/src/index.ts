import { Hono } from 'hono'

const app = new Hono()

const book = new Hono()
//for rounting you have maek a diff stance in every file and export it just like express
app.route('/book',book)
app.get('/', (c) => {
  return c.text('Hello Hono!')
})

book.get('/', (c) => {
  return c.text('Hello Hono!')
})



export default app
