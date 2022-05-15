var menuContainer = document.getElementById("container");
var endContainer = document.getElementById("containerEnd");
var overlayBlur = document.getElementById("overlayBlur");
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var audEating = new Audio(
  "sounds/Eat - Munch 2 Sound Effect (download)-[AudioTrimmer.com].mp3"
);
var audLevelUp = new Audio("sounds/Super Mario Power Up Sound Effect.mp3");
var audBackground = new Audio("sounds/underwater-ambience-6201.mp3");
var audWrongEat = new Audio("sounds/WrongEat.wav");
var audGameOver = new Audio("sounds/GameOver.wav");

fishes = new Array();
gameOver = false;
level = 0;
lives = 3;
fishCount = 0;
mass = 500;
highScores = [];

function collision(first, second) {
  if (
    second.x * 2 > first.mass / 10 + first.x * 2 ||
    first.x * 2 > second.mass / 10 + second.x * 2 ||
    second.y / 2 > first.mass / 10 + first.y / 2 ||
    first.y / 2 > second.mass / 10 + second.y / 2
  ) {
    return false;
  }
  if (second.mass / 10 <= 120 || first.mass / 10 <= 120) {
    if (
      Math.sqrt(
        (first.x * 2 - second.x * 2) * (first.x * 2 - second.x * 2) +
          (first.y / 2 - second.y / 2) * (first.y / 2 - second.y / 2)
      ) < 25
    ) {
      return true;
    }
  } else {
    if (
      Math.sqrt(
        (first.x * 2 - second.x * 2) * (first.x * 2 - second.x * 2) +
          (first.y / 2 - second.y / 2) * (first.y / 2 - second.y / 2)
      ) < 55
    ) {
      return true;
    }
  }
}
images = [
  "images/Characters/TroutLookingLeftSide.png",
  "images/Characters/TroutLookingRightSide.png",
  "images/Characters/TurtleLookingLeftSide.png",
  "images/Characters/TurtleLookingRightSide.png",
  "images/Characters/SharkLookingLeftSide.png",
  "images/Characters/SharkLookingRightSide.png",
  "imagesCharacters/KillerWhaleLookingLeftSide.png",
  "images/Characters/KillerWhaleLookingRightSide.png",
];

function DetectSpeed(isim, level, mass) {
  if (isim == "turtle") {
    if (level == 0) {
      return 6;
    }
    if (level == 1) {
      return 6.5;
    }
    if (level == 2) {
      return 7.5;
    }
  } else if (isim == "crab") {
    if (level == 0) {
      return 5.5;
    }
    if (level == 1) {
      return 6;
    }
    if (level == 2) {
      return 7;
    }
  } else if (isim == "jellyfish") {
    if (level == 0) {
      return 5;
    }
    if (level == 1) {
      return 5.5;
    }
    if (level == 2) {
      return 6;
    }
  } else if (isim == "killerwhale") {
    if (level == 0) {
      return 4.9;
    }
    if (level == 1) {
      return 5.3;
    }
    if (level == 2) {
      return 5.9;
    }
  } else if (isim == "shark") {
    if (level == 0) {
      return 5.2;
    }
    if (level == 1) {
      return 5.9;
    }
    if (level == 2) {
      return 6.4;
    }
  } else if (isim == "trout") {
    if (level == 0) {
      return 5.5;
    }
    if (level == 1) {
      return 6.5;
    }
    if (level == 2) {
      return 7.8;
    }
  }
}
class Fish {
  constructor() {
    this.angle = Math.random(1, 2 * Math.PI);
    this.probablityOfSide = Math.floor(Math.random() * (1 - 0 + 1) + 0);
    this.dx = Math.cos(this.angle);

    this.x = this.probablityOfSide == 1 ? -50 : 1550;
    this.y = Math.floor(Math.random() * (canvas.height - 200 - 1 + 1) + 1);
  }
  draw() {}
  move() {}
}
class Turtle extends Fish {
  constructor() {
    super();
    this.mass = 700;
    this.img = new Image();
    this.img.width = 20;
    this.img.height = 20;
    this.img.src =
      this.probablityOfSide == 1
        ? "images/Characters/TurtleLookingRightSide.png"
        : "images/Characters/TurtleLookingLeftSide.png";
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.mass / 10, this.mass / 10);
  }
  move() {
    var spd = DetectSpeed("turtle", 0);
    if (this.x >= -75 && this.x <= 1550) {
      if (this.probablityOfSide == 1) {
        var magnitude = Math.sqrt(1350 * 1350 + this.y * this.y);
        var unitX = 1350 / magnitude;
        this.x += unitX * spd;
        return true;
      } else {
        this.x -= this.dx * spd;
        return true;
      }
    } else {
      return false;
    }
  }
}
class Crab extends Fish {
  constructor() {
    super();
    this.mass = 750;
    this.img = new Image();
    this.img.width = 20;
    this.img.height = 20;
    this.img.src =
      this.probablityOfSide == 1
        ? "images/Characters/CrabLookingRightSide.png"
        : "images/Characters/CrabLookingLeftSide.png";
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.mass / 10, this.mass / 10);
  }
  move() {
    var spd = DetectSpeed("crab", 0);
    if (this.x >= -75 && this.x <= 1550) {
      if (this.probablityOfSide == 1) {
        var magnitude = Math.sqrt(1350 * 1350 + this.y * this.y);
        var unitX = 1350 / magnitude;
        this.x += unitX * spd * this.dx;
        return true;
      } else {
        this.x -= this.dx * spd;
        return true;
      }
    } else {
      return false;
    }
  }
}
class JellyFish extends Fish {
  constructor() {
    super();
    this.mass = 700;
    this.img = new Image();
    this.img.width = 20;
    this.img.height = 20;
    this.img.src =
      this.probablityOfSide == 1
        ? "images/Characters/JellyFishLookingRightSide.png"
        : "images/Characters/JellyFishLookingLeftSide.png";
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.mass / 10, this.mass / 10);
  }
  move() {
    var spd = DetectSpeed("jellyfish", 0);
    if (this.x >= -75 && this.x <= 1550) {
      if (this.probablityOfSide == 1) {
        var magnitude = Math.sqrt(1350 * 1350 + this.y * this.y);
        var unitX = 1350 / magnitude;
        this.x += unitX * spd * this.dx;
        return true;
      } else {
        this.x -= this.dx * spd;
        return true;
      }
    } else {
      return false;
    }
  }
}
class KillerWhale extends Fish {
  constructor() {
    super();
    this.mass = 10000;
    this.img = new Image();
    this.img.width = 20;
    this.img.height = 20;
    this.img.src =
      this.probablityOfSide == 1
        ? "images/Characters/KillerWhaleLookingRightSide.png"
        : "images/Characters/KillerWhaleLookingLeftSide.png";
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, 130, 130);
  }
  move() {
    var spd = DetectSpeed("killerwhale", 0);
    if (this.x >= -75 && this.x <= 1550) {
      if (this.probablityOfSide == 1) {
        var magnitude = Math.sqrt(1350 * 1350 + this.y * this.y);
        var unitX = 1350 / magnitude;
        this.x += unitX * spd * this.dx;
        return true;
      } else {
        this.x -= this.dx * spd;
        return true;
      }
    } else {
      return false;
    }
  }
}
class Shark extends Fish {
  constructor() {
    super();
    this.mass = 1200;
    this.img = new Image();
    this.img.width = 20;
    this.img.height = 20;
    this.img.src =
      this.probablityOfSide == 1
        ? "images/Characters/SharkLookingRightSide.png"
        : "images/Characters/SharkLookingLeftSide.png";
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.mass / 10, this.mass / 10);
  }
  move() {
    var spd = DetectSpeed("shark", 0);
    if (this.x >= -75 && this.x <= 1550) {
      if (this.probablityOfSide == 1) {
        var magnitude = Math.sqrt(1350 * 1350 + this.y * this.y);
        var unitX = 1350 / magnitude;
        this.x += unitX * spd * this.dx;
        return true;
      } else {
        this.x -= this.dx * spd;
        return true;
      }
    } else {
      return false;
    }
  }
}
class Trout extends Fish {
  constructor() {
    super();
    this.mass = 500;
    this.img = new Image();
    this.img.width = 20;
    this.img.height = 20;
    this.img.src =
      this.probablityOfSide == 1
        ? "images/Characters/TroutLookingRightSide.png"
        : "images/Characters/TroutLookingLeftSide.png";
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.mass / 10, this.mass / 10);
  }
  move() {
    var spd = DetectSpeed("trout", 0);
    if (this.x >= -75 && this.x <= 1550) {
      if (this.probablityOfSide == 1) {
        var magnitude = Math.sqrt(1350 * 1350 + this.y * this.y);
        var unitX = 1350 / magnitude;
        this.x += unitX * spd * this.dx;
        return true;
      } else {
        this.x -= this.dx * spd;
        return true;
      }
    } else {
      return false;
    }
  }
}
class Player {
  constructor() {
    this.x = canvas.width / 2 - 150;
    this.y = canvas.height - 100;
    this.spd = 40;
    this.i = 0;
    this.level = 0;

    this.img = new Image();
    this.img.src = images[this.i];
  }
  draw() {
    if (mass <= 1200) {
      ctx.drawImage(this.img, this.x, this.y, mass / 10, mass / 10);
    } else {
      ctx.drawImage(this.img, this.x, this.y, 120, 120);
    }
  }
  move() {
    document.onkeydown = checkKey;
    function checkKey(e) {
      e = e || window.event;
      //Sola Haraket
      if (e.keyCode == "37") {
        player.img.src = images[player.i];
        if (player.x >= 20 && player.x <= canvas.width) {
          player.x -= player.spd;
        }
        //Sağa Haraket
      }
      if (e.keyCode == "39") {
        player.img.src = images[player.i + 1];
        if (player.x >= -20 && player.x <= canvas.width - 120) {
          player.x += player.spd;
        }
      }
      if (e.keyCode == "40") {
        if (player.y >= -20 && player.y <= 625) {
          player.y += player.spd;
        }
      }
      if (e.keyCode == "38") {
        if (player.y >= 20 && player.y <= canvas.height) {
          player.y -= player.spd;
        }
      }
    }
  }
  updateFish() {
    if (mass >= 500 && mass < 700) {
      player.i = 0;
      player.spd = 40;
      if (this.level - level != 0) {
        audLevelUp.play();
        this.level += 1;
        if (lives < 3) {
          lives += 1;
        }
      }
    } else if (mass >= 700 && mass < 1200) {
      if (this.level - level != 0) {
        audLevelUp.play();
        this.level += 1;
        if (lives < 3) {
          lives += 1;
        }
      }
      player.i = 2;
      player.spd = 35;
    } else if (mass >= 1200 && mass < 10000) {
      if (this.level - level != 0) {
        audLevelUp.play();
        this.level += 1;
        if (lives < 3) {
          lives += 1;
        }
      }
      player.i = 4;
      player.spd = 30;
    } else if (mass >= 10000) {
      if (this.level - level != 0) {
        audLevelUp.play();
        this.level += 1;
        if (lives < 3) {
          lives += 1;
        }
      }
      player.i = 6;
      player.spd = 25;
    }
  }
  checkCollision() {
    for (var i = 0; i < fishes.length; i++) {
      if (collision(player, fishes[i])) {
        if (
          fishes[i].mass <= mass &&
          fishes[i].constructor.name != "JellyFish"
        ) {
          mass += 20;
          fishes.splice(i, 1);
          fishCount += 1;
          audEating.play();
        } else {
          audWrongEat.play();
          lives -= 1;
          fishes.splice(i, 1);
        }
      }
    }
  }
  updateLevel() {
    if (mass >= 500 && mass < 700) {
      level = 0;
    } else if (mass >= 700 && mass < 1200) {
      level = 1;
    } else if (mass >= 1200 && mass < 10000) {
      level = 2;
    }
  }
  checkGame() {
    if (lives === 0) {
      gameOver = true;
      EndSound();
    }
  }
}

function EndSound() {
  audBackground.pause();
}
function playVideo() {
  audBackground.muted = true;
}
class OtherImagesAndText {
  constructor() {
    this.level = 0;

    this.liveImg_1 = new Image();
    this.liveImg_1.src = "OtherImages/Live.png";

    this.liveImg_2 = new Image();
    this.liveImg_2.src = "OtherImages/Live.png";

    this.liveImg_3 = new Image();
    this.liveImg_3.src = "OtherImages/Live.png";

    this.hookImg = new Image();
    this.hookImg.src = "OtherImages/Hook.png";
  }
  drawLives() {
    ctx.font = "30px Arial";
    ctx.fillText("Lives:", 1300, 680);

    if (lives === 3) {
      ctx.drawImage(this.liveImg_1, 1450, 654, 30, 30);
      ctx.drawImage(this.liveImg_2, 1420, 654, 30, 30);
      ctx.drawImage(this.liveImg_3, 1390, 654, 30, 30);
    } else if (lives === 2) {
      ctx.drawImage(this.liveImg_2, 1420, 654, 30, 30);
      ctx.drawImage(this.liveImg_3, 1390, 654, 30, 30);
    } else if (lives === 1) {
      ctx.drawImage(this.liveImg_3, 1390, 654, 30, 30);
    }
  }
  drawHook() {
    ctx.font = "30px Arial";
    ctx.fillText("Fish Count: " + fishCount, 30, 695);
  }
  drawScore() {
    ctx.font = "30px Arial";
    ctx.fillText("Mass: " + mass, 1300, 715);
  }
  drawLevel() {
    ctx.font = "30px Arial";
    ctx.fillText("Level: " + level, 1370, 50);
  }
}
function createFishes() {
  for (let i = 0; i < 6; i++) {
    probablityOfFish = Math.floor(Math.random() * (6 - 1 + 1) + 1);
    console.log(probablityOfFish);
    if (probablityOfFish == 6) {
      fishes.push(new Turtle());
    } else if (probablityOfFish == 5) {
      fishes.push(new Crab());
    } else if (probablityOfFish == 4) {
      fishes.push(new JellyFish());
    } else if (probablityOfFish == 3) {
      fishes.push(new KillerWhale());
    } else if (probablityOfFish == 2) {
      fishes.push(new Shark());
    } else if (probablityOfFish == 1) {
      fishes.push(new Trout());
    }
  }
}
player = new Player();
others = new OtherImagesAndText();

function handleOthers() {
  audBackground.play();
  others.drawHook();
  others.drawLives();
  others.drawScore();
  others.drawLevel();
}
function handlePlayer() {
  player.checkGame();
  player.updateLevel();
  player.checkCollision();
  player.updateFish();
  player.draw();
  player.move();
}
function drawFishes() {
  if (fishes.length > 0) {
    for (let i = 0; i < fishes.length; i++) {
      fishes[i].draw();
      if (!fishes[i].move()) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fishes.splice(i, 1);
      }
    }
  } else {
    createFishes();
  }
}
function Animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFishes();
  handleOthers();
  handlePlayer();
  if (!gameOver) {
    requestAnimationFrame(Animate);
  } else {
    audGameOver.play();
    endGame();
  }
}

function startGame() {
  overlayBlur.style.display = "none";
  menuContainer.style.display = "none";
  Animate();
}

function endGame() {
  overlayBlur.style.display = "block";
  endContainer.style.display = "flex";
  highScores.push(mass);
  highScores.sort();
  highScores.reverse();

  for (i = 0; i < highScores.length; i++) {
    if (i < 3) {
      var id = "theBest" + (i + 1);
      if (highScores) var listItem = document.getElementById(id);

      listItem.innerText = highScores[i];
    }
  }
}

function restartGame() {
  overlayBlur.style.display = "none";
  endContainer.style.display = "none";
  player = new Player();
  fishes = [];
  gameOver = false;
  level = 0;
  lives = 3;
  fishCount = 0;
  mass = 500;
  Animate();
}

//Animate();
