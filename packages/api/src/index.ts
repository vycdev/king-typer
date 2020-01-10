import koa, { Context } from "koa"

const app = new koa()
const port = process.env.PORT || 8090

app.use(async (context: Context) => {
    context.body = "Hello world!"
})

app.listen(port, () => {
    console.log(`App started at port ${port}`);
})
