import koa, {Context} from "koa"

const app = new koa()

app.use(async (context: Context ) => {
    context.body = "Hello world!"
})

app.listen(8090, ()=>{
    console.log('something');
})
