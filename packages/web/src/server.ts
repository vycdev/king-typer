import koa from "koa";
import serve from "koa-static";

import path from "path";

// Create a new server app and find the path for it.
const app = new koa();
const serverPath = path.resolve(__dirname);

// Take port form the env variables, if it doesnt exist use port 8080
const port = process.env.PORT || 8080;

// Error handeling for the server
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err;
        ctx.app.emit("error", err, ctx);
    }
});
app.on("error", err => {
    console.log(err);
});

// Use koa-static to server the SPA
app.use(serve(serverPath));
// Start the app on port ${port}
app.listen(port, () => {
    console.log(`Wep app started on port ${port}`);
});
