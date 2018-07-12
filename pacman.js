// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4;
var edible;
var dotLeft = 240;
// Define your ghosts here
var inky = {
  'menu_option': '1',
  'name': 'Inky',
  'colour': 'Red',
  'character': 'Shadow',
  'edible': false
};
var blinky = {
  'menu_option': '2',
  'name': 'blinky',
  'colour': 'Cyan',
  'character': 'Speedy',
  'edible': false
};
var pinky = {
  'menu_option': '3',
  'name': 'pinky',
  'colour': 'Pink',
  'character': 'Bashful',
  'edible': false
};
var clyde = {
  'menu_option': '4',
  'name': 'Clyde',
  'colour': 'Orange',
  'character': 'Pokey',
  'edible': false
};


var ghosts = [inky, blinky, pinky, clyde]

// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives +'     Power Pellet: ' + powerPellets+'     Dot Left: ' + dotLeft);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line

  for(var i = 0 ; i < ghosts.length; i++){
      console.log('('+ (i+1) +')' + ghosts[i]['name'] + " " + '('+ edible(ghosts[i]) +')');
  };
  if(powerPellets > 0){
    console.log('(p) Eat Power-Pellet');

  }else{
    console.log('No Power-Pellets left!');
  };
  console.log('(d) Eat Dot');
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}
function edible(ghost) {
    if(ghost['edible'] === false){
    return 'inedible';
  }else{
    return 'edible';
  };


};

// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
  dotLeft -= 1;
  if(dotLeft > 100){
    console.log('eat 100 dots');

  }else if(dotLeft > 10) {
    console.log('eat 10 dots');
  };

};
function eatPowerPellet(){
  if(powerPellets > 0){;
  powerPellets -= 1;
  score += 50;
    ghosts.forEach(function(ghost){
      ghost['edible'] = true;
    });
  }else{
    console.log("No Power-Pellets left!");
  };
};
function eatGhost(ghost) {
  if(ghost['edible'] === true){
    console.log('\nPac-Man killed '+ ghost['colour'] +" "+ ghost['name']);
    score +=200;

    ghost['edible'] = false;
  }else
    lives -= 1;
    gameOver(lives)
};
function gameOver(lives) {
  if(lives === 0 ){
    console.log('\n\nGame Over!\n');
    process.exit();
  };
}

// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
    case 'd':
      eatDot();
    break;
    case 'p':
      eatPowerPellet();
    break;
    case '1':
      eatGhost(inky);
    break;
    case '2':
      eatGhost(blinky);
    break;
    case '3':
      eatGhost(pinky);
    break;
    case '4':
    eatGhost(clyde);
    break;
    case 'e':
     eatFruit();
    break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
