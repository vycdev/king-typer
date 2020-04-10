const randomText = [
    `Hello world!`,
    `Keyboard on fire? Still not enough!`,
    `Over 9000 WPM!!!!`,
    `Typing is fun!`,
    `Imagine any typing website, but better.`,
    `WPM = Words per Minute`,
    `CPM = Characters per Minute`,
    `Don't look at the keyboard while typing, it will slow you down.`,
    `Keyboards can get pretty dirty, clean your keyboard.`,
    `You can be slow in the beginning, keep practicing.`,
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
    `You know the rules and so do I.`,
    `Perfect practice makes perfect.`,
    `The more you practice the faster you will get.`,
    `Keep your fingers on the home row.`,
    `Typing Day is held on January 8 every year as one week after New Year is a good time to think through and write down plans for the year.`,
    `The first commercially successful typewriter was patented by Sholes, Glidden and Soule about 150 years ago in 1868.`,
    `Sholes and Glidden designed the first QWERTY keyboard in 1873.`,
    `The world record for typing the English alphabet from A to Z is 1.36 seconds.`,
    `Every second, spacebars on keyboards around the world are hit about six million times.`,
    `The only country whose name can be typed on one row of a keyboard is Peru. The only US state is Alaska.`,
    `The fastest time to type a given 103 character text on a keyboard using the nose is 40.19 seconds.`,
    `On average, a trained typist’s left hand does 56 per cent of the typing.`,
    `“There’s nothing to writing. All you do is sit down at a typewriter and bleed.” (Ernest Hemingway).`,
    `In the First World War, the word "typewriter" was used as army slang for a machine gun.`,
    `On a normal keyboard, the longest word that can be made using the letters only on one row of the keyboard is word ‘Typewriter’, using the top row. Coincidence?`,
    `The qwerty layout was designed for manual typewriters initially by Christopher Sholes in 1872. That means that humanity has used virtually the same design for almost 150 years!`,
    `Keyboards were originally the only way to interact with a computer, since they were invented before the invention of the mouse.`,
    `The longest English word that you can type using only your left hand is "stewardesses".`,
    `The right name for the “#” symbol on your keyboard is “octothorpe”. Not as nice-sounding as “hashtag”.`
];

export const getRandomText = (): Array<string> => {
    let array = randomText;
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};
