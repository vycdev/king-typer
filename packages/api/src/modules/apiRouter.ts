import Router from "./Router";

import authRouter from "./auth/router";
import usersRouter from "./users/router";

const apiRouter = new Router({ prefix: "/api" });

apiRouter.use(authRouter);
apiRouter.use(usersRouter);

export default apiRouter.routes();
