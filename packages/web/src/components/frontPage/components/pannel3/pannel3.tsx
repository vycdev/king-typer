import * as React from "react";

import { StyledPannel3, Text, TextStyling, FixImage, FixText } from "./style";

import { VerticallyCenteredDiv } from "./style";

export const Pannel3 = () => {
    return (
        <StyledPannel3>
            <FixText>
                <Text>
                    <TextStyling>
                        <h1>A simple guide for beginners.</h1>
                        <p>
                            {" "}
                            At the very foundation of every great typist is
                            their ability to hold steady, proper hand placement.
                            You should always use all of your fingers (never
                            just your pointer or middle fingers), and approach
                            the keys with the same general starting point shown
                            in the image. This is the most important thing you
                            need to know, typing with the right fingers will
                            increase your speed a lot as well as following some
                            simple rules that maybe not everyone follows exactly
                            because even the most advanced typists have their
                            own unique style of typing, but it’s good to keep
                            them in mind:
                        </p>

                        <ul>
                            <li>
                                Hitting the keys with the rigth fingers, as
                                shown in the image, is the most important thing
                                to a typist.
                            </li>
                            <li>
                                Always return to the starting position of the
                                fingers: “ASDF – JKL;”
                            </li>
                            <li>Never look at the keyboard while typing</li>
                            <li>
                                Try to maintain your rhythm as well as learn
                                when to slow down. It's better to hit the right
                                keys a little bit slower than hitting the wrong
                                ones and wasting time deleting your mistakes.
                            </li>
                            <li>
                                The SHIFT key is always pressed by the pinky
                                finger opposite to the one hitting the other
                                key.
                            </li>
                            <li>
                                Use the thumb of whichever hand is more
                                convenient for you to press the Spacebar.
                            </li>
                            <li>
                                Adopt a relaxed stance. Your hands and arms are
                                important to place in respect to your keyboard,
                                but the rest of your body is just as important.
                                You should keep your back straight and your eyes
                                at the same level with the top of your monitor.
                            </li>
                        </ul>
                        <p>
                            Now that you know all these rules you can start
                            practicing, and don't forget, perfect practice makes
                            perfect.
                        </p>
                    </TextStyling>
                </Text>
            </FixText>
            <FixImage>
                <VerticallyCenteredDiv>
                    <img
                        src="http://transcribeme.com/wp-content/uploads/2018/02/edu_keyboard@2x-1-1024x411.png"
                        alt="OOOPS Looks like the image failed to load."
                    />
                </VerticallyCenteredDiv>
            </FixImage>
        </StyledPannel3>
    );
};
