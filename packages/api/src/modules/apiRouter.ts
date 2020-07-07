import Router from "./Router";

import authRouter from "./auth/router";
import gamesRouter from "./games/router";
import usersRouter from "./users/router";

const apiRouter = new Router({ prefix: "/api" });

apiRouter.use(authRouter);
apiRouter.use(gamesRouter);
apiRouter.use(usersRouter);

export default apiRouter.routes();
