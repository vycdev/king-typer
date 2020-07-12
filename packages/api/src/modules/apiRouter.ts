import Router from "./Router";

import authRouter from "./auth/router";
import achievementRouter from "./achievements/router";
import emailRouter from "./email/router";
import gamesRouter from "./games/router";
import textsRouter from "./texts/router";
import tutorialsRouter from "./tutorials/router";
import usersRouter from "./users/router";

const apiRouter = new Router({ prefix: "/api" });

apiRouter.use(authRouter);
apiRouter.use(achievementRouter);
apiRouter.use(emailRouter);
apiRouter.use(gamesRouter);
apiRouter.use(textsRouter);
apiRouter.use(tutorialsRouter);
apiRouter.use(usersRouter);

export default apiRouter.routes();
