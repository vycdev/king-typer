# How to use the app.

You can use the hosted version of the app [here](https://king-typer.herokuapp.com/) or you can install the app and run it using [this tutorial](https://github.com/Vyctor661/king-typer/blob/docs/docs/tutorials/instalation.md)

## When you open the app you will be welcomed by this screen which is the `home page`: 


![files](https://github.com/Vyctor661/king-typer/blob/docs/docs/assets/homePagePreview.png)

At the top you can see you have 3 buttons as well as one button under the title of the page.
I will explain a little bit later about every other page in the app.

The first thing that you will see will be the logo of the website, the title the buttons and the rotating text with the cool typing animation. 

Scrolling further down you will see that there is a chart with an explanation about what touch typing is.
And further down you will find a very useful guide to how to use touch typing that includes the basics and some more advanced tips that you will use everytime you will do touch typing.
At the very bottom you will find a footer with a button which redirects the user to this repo.

### Basically this is the whole home page (from a phone perspective):


![files](https://github.com/Vyctor661/king-typer/blob/docs/docs/assets/responsiveness.png)

## The `Start Typing` buttons will both bring you to the same page where you can take a typing test:


![files](https://github.com/Vyctor661/king-typer/blob/docs/docs/assets/typingBox.png)

It's very simple to start the typing test, you just start typing in the input box, after you type the first word the timer will begin and you have 60 seconds to type as many words as you can with the best accuracy you can have, and at the end of the test you will see how well you've done:


![files](https://github.com/Vyctor661/king-typer/blob/docs/docs/assets/typingBoxAfterTest.png)

At the very top you will see some simple info about your test:
- `Your best`: which means the best score you've ever had in WPM (words per minute)
- `WPM`: which is the corrected wpm, that means words per minute that you wrote correctly
- `CPM`: which is the corrected cpm, that means characters per minute that wrote correctly 
- `Time`: which displays the time left, in this case it's 0 becase the test has ended
- `A "Try again" button`: that when pressed it will refresh the page to start a fresh new test

Under this info you will see a chart that displays the `Accuracy`, `Corrected WPM`, `Uncorrected WPM` for ever second of the test. You can hover over it to see the info in a better way for each second. This way you can see changes in your accuracy, wpm, uncorrected wpm, that took place in the test. Immidiately under the chart you will see the legend for the chart.

Under all of that you will see either of:
- A congratulations message tellign you that you typed all words correctly and telling you what was your wpm score.
- A message telling you what was your uncorrected WPM and corrected WPM along with your Accuracy for that test and the words that you typed wrong and how you typed them.


## The `Statistics` button in the navbar will take you to the statistics page: 

If you haven't taken any typing tests yet you will see a message telling you that you can only see statistics if you have taken at least one typing test before.
If you have taken at least one typing test before you will be welcomed by this page:

![files](https://github.com/Vyctor661/king-typer/blob/docs/docs/assets/statisticsPage.png)


Explaining everything from top to bottom:
- `Best Score`: is your best score in WPM (corrected wpm), you can see this score on the typing page as well.
- `Average WPM`: which is your average wpm for the last 10 tests. (corrected wpm)
- `Average Accuracy`: which is your average accuracy for your last 10 tests.
- `Previous scores`: a chart that will show you the previous scores that you had. This chart includes your WPM (corrected wpm) and your Accuracy for each typing test that you have taken in the past. This way you can see how much you have improved.
- `A list of the previous scores`: a list with the previous scores that is sorted from the most recent to the oldest test score. This list will contain Corrected WPM, Corrected CPM, WPM, CPM, Accuracy and the date of the test.

## King Typer is intended to be used with a real keyboard, (not with a virtual keyboard for example on the phone or tablet) because it encourages touch typing and not fast typing on the phone or tablet. The webiste is usable on the phone and tablet and it is responsive but it is not intended for that use.
