import { apiUrl } from "../../../../utils/constants";

export const randomizeEasyText = (text: Array<string>) => {
    const array = text;
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

interface TextInfo {
    id: number;
    title: string;
    text: string;
    ordered: boolean;
    tutorial: boolean;
    author: number;
    requirements: unknown;
}

export const getDataBaseTextInfo = async (mode: "easy" | "hard", id = -1) => {
    const result =
        id === -1
            ? await (
                  await fetch(
                      `${apiUrl}/texts/getrandomtext/${
                          mode === "easy" ? "false" : "true"
                      }`,
                      {
                          method: "GET",
                          credentials: "include",
                          headers: {
                              "Content-Type": "application/json"
                          }
                      }
                  )
              ).json()
            : (
                  await (
                      await fetch(`${apiUrl}/texts/getalltexts`, {
                          method: "GET",
                          credentials: "include",
                          headers: {
                              "Content-Type": "application/json"
                          }
                      })
                  ).json()
              ).filter((value: TextInfo) => {
                  return value.id === id;
              })[0];

    return result;
};
