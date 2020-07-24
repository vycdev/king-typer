import { games } from "../gamesData";
import gameFinished from "./gameFinished";

export default async () => {
    Object.entries(games).map(l => {
        if (l[1].endTime < Date.now()) {
            gameFinished((l[0] as unknown) as number, l[1]);
            delete games[l[0]];
        }
    });
};
