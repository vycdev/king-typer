import koa from 'koa';
import serve from 'koa-static';

import path from 'path';

const app = new koa();
const serverPath = path.join(__dirname)

const port = process.env.PORT || 8080

app.use(serve(serverPath));

app.listen(port, ()=>{
    console.log(`Wep app started on port ${port}`);
});
