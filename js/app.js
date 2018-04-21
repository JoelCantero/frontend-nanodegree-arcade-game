
// CONST VARIABLES
const MAXSPEED = 5;
const MINSPEED = 3;

// Enemies our player must avoid
class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        this.x += this.speed*dt;

        if (this.x > 5) {
            this.x = -1;
            this.speed = randomSpeed();
        }

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    }

    render() {
        // Draw the enemy on the screen, required method for game
        ctx.drawImage(Resources.get(this.sprite), this.x*101, this.y*83);  
    }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {

    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = 2;
        this.y = 5;
    }

    update() {
        if (this.y == 0) {
            win();
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x*101, this.y*83);
    }

    handleInput(keyCode) {
        switch (keyCode) {

            case 'left':
                if (this.x > 0) {
                    --this.x;
                }
                break;

            case 'up':
                if (this.y > 0) {
                    --this.y;
                }
                break;

            case 'right':
                if (this.x < 4) {
                    ++this.x;
                }
                break;
            
            case 'down':
                if (this.y < 5) {
                    ++this.y;
                }
                break;

            default: break;
        
    }
}
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player();
let allEnemies = [];
let winCounter = 0;

generateEnemies();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function generateEnemies() {
    allEnemies.push(new Enemy(-3, 1, randomSpeed()));
    allEnemies.push(new Enemy(-5, 2, randomSpeed()));
    allEnemies.push(new Enemy(-2, 3, randomSpeed()));
    }
    

function randomSpeed(dt) {
    return (Math.random()*(MAXSPEED - MINSPEED) + MINSPEED);
}

function win() {
    ++winCounter;
    updateCounter(winCounter);
    player.x = 2;
    player.y = 5;
}

function checkCollisions() {
    allEnemies.forEach(function(enemy) {
        if (enemy.x == player.x && enemy.y == player.y) {
            console.log('Collision!');
        }
    });
}
