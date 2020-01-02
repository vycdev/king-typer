import Koa from "koa";

const app = new Koa();

const init = () => {
    console.info("Server started.");
};
export const server = () => {
    app.use(init);

    app.listen(8080);
};
