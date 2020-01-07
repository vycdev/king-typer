import koa from "koa"

const app = new koa()

app.use(async context => {
    context.body = "Hello world!"
})

app.listen(8090)
