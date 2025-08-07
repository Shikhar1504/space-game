# Space Shooter Game

This is a simple, browser-based space shooter game where the player controls a spaceship, shoots at incoming asteroids, and tries to achieve a high score while managing health.

## Features

- **Player Control:** Move the spaceship horizontally using the mouse or touch.
- **Shooting:** Fire bullets by clicking the mouse or tapping the screen.
- **Enemies:** Asteroids (enemies) appear from the top and move downwards.
- **Collision Detection:** Bullets destroy enemies, and enemies reduce player health upon collision or when they pass the player.
- **Score System:** Earn points for destroying enemies.
- **Health Bar:** Visual representation of the player's health.
- **Game Over Screen:** Displays the final score and a restart option when health reaches zero or the player collides with an enemy.
- **Sound Effects:** Includes shooting and explosion sounds, and background music.
- **Responsive Design:** Adapts to different screen sizes.

## Technologies Used

- **HTML5:** For the game structure and elements.
- **CSS3:** For styling the game elements and layout.
- **JavaScript:** For game logic, interactions, and animations.

## How to Play

1.  **Open `index.html`** in your web browser.
2.  **Move your mouse (or finger on touch devices)** horizontally to control the spaceship.
3.  **Click the mouse (or tap the screen)** to fire bullets.
4.  Destroy as many asteroids as possible to increase your score.
5.  Avoid letting asteroids hit your spaceship or pass the bottom of the screen, as this will reduce your health.
6.  If your health reaches zero, the game is over. Click "Restart" to play again.

## File Structure

```
./
├── index.html          # Main HTML file for the game interface
├── styles.css          # CSS file for styling the game elements
├── script.js           # JavaScript file containing the game logic
└── README.md           # This README file
```

## Assets

- **Background Image:** [https://opengameart.org/sites/default/files/bg5.jpg.preview.jpg](https://opengameart.org/sites/default/files/bg5.jpg.preview.jpg)
- **Spaceship Image:** [https://opengameart.org/sites/default/files/ship_0.png](https://opengameart.org/sites/default/files/ship_0.png)
- **Asteroid Image:** [https://opengameart.org/sites/default/files/asteroid_1.png](https://opengameart.org/sites/default/files/asteroid_1.png)
- **Shoot Sound:** [https://opengameart.org/sites/default/files/laser5.wav](https://opengameart.org/sites/default/files/laser5.wav)
- **Explosion Sound:** [https://opengameart.org/sites/default/files/explosion_1.wav](https://opengameart.org/sites/default/files/explosion_1.wav)
- **Background Music:** [https://s3-us-west-2.amazonaws.com/s.cdpn.io/455279/sstar.mp3](https://s3-us-west-2.amazonaws.com/s.cdpn.io/455279/sstar.mp3)

## Author

Shikhar

## License

This project is open-source and available under the [ISC License](https://opensource.org/licenses/ISC).
