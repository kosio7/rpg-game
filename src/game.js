let stage;
let hero, monster, monstersCaught;
let heroBitmap, monsterBitmap;
let scoreTxt;

const stageInit = () => {
  stage = new createjs.Stage("canvas");
  createjs.Touch.enable(stage);
  createjs.Ticker.setFPS(40);
  createjs.Ticker.addEventListener("tick", () => {
    stage.update();
  });
  resize();
};

const drawBackground = () => {
  let bckgrnd = new Image();
  bckgrnd.src = 'img/background.png';
  let bitmap1 = new createjs.Bitmap(bckgrnd);
  bitmap1.x = 0;
  bitmap1.y = 0;
  stage.addChild(bitmap1);

  
};

const objects = () => {
  hero = {
    speed: 15,
    x: 0,
    y: 0
  };
  monster = {
    x: 0,
    y: 0
  };
  monstersCaught = 0;

  let heroImg = new Image();
  heroImg.src = 'img/hero.png';
  heroBitmap = new createjs.Bitmap(heroImg);
  heroBitmap.x = hero.x;
  heroBitmap.y = hero.y;
  stage.addChild(heroBitmap);

  let monsterImg = new Image();
  monsterImg.src = 'img/monster.png';
  monsterBitmap = new createjs.Bitmap(monsterImg);
  monsterBitmap.x = monster.x;
  monsterBitmap.y = monster.y;
  stage.addChild(monsterBitmap);
};

const objectsUpdate = (e) => {
  if (e.keyCode == "38") { // Player holding up
    heroBitmap.y -= hero.speed;
  }
  if (e.keyCode == "40") { // Player holding down
    heroBitmap.y += hero.speed;
  }
  if (e.keyCode == "37") { // Player holding left
    heroBitmap.x -= hero.speed;
  }
  if (e.keyCode == "39") { // Player holding right
    heroBitmap.x += hero.speed;
  }

  // Are they touching?
  if (
    heroBitmap.x <= (monsterBitmap.x + 32)
    && monsterBitmap.x <= (heroBitmap.x + 32)
    && heroBitmap.y <= (monsterBitmap.y + 32)
    && monsterBitmap.y <= (heroBitmap.y + 32)
  ) {
    ++monstersCaught;
    newGame();
  }
  console.info('Function objectsUpdate fires!')
};

const newGame = () => {
  stage.removeChild(scoreTxt);
  heroBitmap.x = 512 / 2;
  heroBitmap.y = 480 / 2;

  monsterBitmap.x = 32 + (Math.random() * (512 - 64));
  monsterBitmap.y = 32 + (Math.random() * (480 - 64));
  console.info('Function newGame fires!');

  scoreTxt = new createjs.Text("Monsters caught: " + monstersCaught, "24px Helvetica", "#000000");
  scoreTxt.x = 30;
  scoreTxt.y = 25;
  stage.addChild(scoreTxt);

};

const resize = () => {
  stage.canvas.width = window.innerWidth;
  stage.canvas.height = window.innerHeight;
};

const init = () => {
  stageInit();
  drawBackground();
  objects();
  document.addEventListener('keydown', objectsUpdate);
  newGame();
};