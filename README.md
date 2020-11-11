# Cosmic Tic Tac Toe

Cosmic Tic Tac Toe is a web app that lets you play tic tac toe in a chill, space themed environment. Gaze at a far off galaxy, place some moon and star emojis, think about your place in the vast universe, and absolutely stomp your 6-year-old nephew who hasn't figured out how to ensure a draw in every game yet.

This app isn't deployed anywhere (yet), but you can play CTTT in a browser just by loading the page. The interface is intuitive, you just need to know the rules for Tic Tac Toe.

## Technologies and Skills

Cosmic Tic Tac Toe is a simple application. It uses...
* HTML and CSS adhering to BEM naming conventions.
* JavaScript, or as I like to call it Old School Vanilla JavaScript (OSVJS).
* JSON to host data client-side in `localStorage`.

## Architecture
This app consists of three JS files- `main.js` runs the DOM manipulation and handles events, `game.js` governs the Game class that hosts all our data, and `player.js` governs the Player class that the Game class uses. 

It also has typical `index.html` and `styles.css` files, and an `assets` folder to store the background image and audio assets.

## Contributors

All of the code was written by myself, [Boone Epstein](https://github.com/deadbelly). I want to thank my mentor, Dave Pernitz, for helping me improve my code, and in particular for teaching me about the HTML dataset attribute. 

The music and sound effects were recorded by me and Dan Lee. Dan played the bass solo, and I played the rest of the instruments. Dan also mixed and mastered the audio, and wrote the guitar parts for the sound effects. 

The background image is taken from [NASA's Public Domain Image Gallery](https://www.nasa.gov/multimedia/imagegallery/index.html).

## Future Iterations

I don't have plans to keep working on this app. If I do there are a couple changes or additional features I might add: 

- Spending more time in the DAW editing our audio assets so that they require less code to run (this was a learning experience)
- Hiding the borders of on the background, which are an artifact from the animation. 
- Letting players select their own tokens.
- Adding a login system and persistant profiles for different players.

## Support

If you have questions about this app or encounter issues [send me an email](mailto:boonejamin@gmail.com).

## Features

### Playing the Game
When you boot up up the game you'll see a stars slowly drifting by, their colors changing between cool pastels. 
![a blank tic tac toe board](https://github.com/deadbelly/CosmicTicTacToe/blob/add-readme-images/assets/readme-images/blankBoard.png)
The display at the top of the screen will tell you who's turn it is, Moon's or Star's. That player can then click any of the nine squares to place their token. 
![placing a token](https://github.com/deadbelly/CosmicTicTacToe/blob/add-readme-images/assets/readme-images/placeToken.png)
After a player places a token the turn display will update to indicate is the next players turn, and now they can click a square to make their move. If either player get's three in a row the game will declare them a winner.
![matching three in a row to win](https://github.com/deadbelly/CosmicTicTacToe/blob/add-readme-images/assets/readme-images/win.png)
Wins are recorded under each player's respective emoji where it says "score." This score, and the active board state, are saved to local storage and persist between page reloads. 
![a draw](https://github.com/deadbelly/CosmicTicTacToe/blob/add-readme-images/assets/readme-images/draw.png)
If neither player manages to get three in a row before the board fills up the game is considered a draw and resets. Whenever a new game begins the player who went second in the last game now goes first.

### Sound
There is a musical score featuring guitar, drums, and bass, and several sound effects (technically also guitar) that can be unmuted by clicking the button in the bottom right corner. The score loops every two minutes or so, and the sound highlight when you place a token, or win the game. 

### Reseting the Game
Want to reset the game? Wipe the slate clean from the time your aunt kicked your butt into a new solar system? Click the button in the bottom left corner to remove any stored data and start a new game. The first player of this new game is selected at random, the same way it is when you first load the game. 
