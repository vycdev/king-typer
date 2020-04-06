const randomText = [
    `Hello world!`,
    `Keyboard on fire? Still not enough!`,
    `Over 9000 WPM!!!!`,
    `Typing is fun!`,
    `Imagine any typing website, but better.`,
    `Try typing faster than you can speak.`,
    `WPM = words per minute`,
    `CPM = characters per minute`,
    `Don't look at the keyboard while typing, it will slow you down.`,
    `Keyboards can get pretty dirty, clean your keyboard.`,
    `Practice makes perfect.`,
    `You can be slow at the beginning, keep practicing.`,
    `It's important to follow the rules of typing.`,
    `Don't forget about your posture.`,
    `Drink some water, hydration is important.`,
    `Typrrrrrr`,
    `Fingers on fire? Still not enough!`,
    `A pandemic can't stop you practicing!`,
    `You can take a break if you want, but later.`,
    `There are many types of keyboards, some can help you improve, some will do the opposite.`,
    `Just keep typing, typing, typing...`,
    `Queen typer, Prince typer, and Princess typer not included.`,
    `If you think you're typing too much, take a break and go type something instead.`,
    `The perfect website for practicing typing doesn't exis...`,
    `Don't smash your keyboard, don't lose CONTROL`,
    `If you have no Home you should find a replacement key.`,
    `This typing website has no escape.`,
    `My keyboard works for everyone except me, I guess it just isn't my type.`,
    `The F and J keys have bumps on them, that helps you find them easier.`,
    `You know the rules and so do I.`
];

export const getRandomText = (): Array<string> => {
    let array = randomText;
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};
