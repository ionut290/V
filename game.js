const GAME_WIDTH = 960;
const GAME_HEIGHT = 540;

const gameState = {
  score: 0,
  lives: 3,
  over: false,
};

class GlimmerGroveScene extends Phaser.Scene {
  constructor() {
    super('GlimmerGroveScene');
  }

  preload() {
    this.createTextures();
  }

  create() {
    gameState.score = 0;
    gameState.lives = 3;
    gameState.over = false;

    this.cameras.main.setBackgroundColor('#14284a');
    this.physics.world.setBounds(0, 0, 2400, GAME_HEIGHT);

    this.addBackground();
    this.createLevel();
    this.createPlayer();
    this.createCoins();
    this.createEnemies();
    this.createHud();
    this.createControls();
    this.createCollisions();

    this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
    this.cameras.main.setBounds(0, 0, 2400, GAME_HEIGHT);
  }

  update() {
    if (gameState.over) {
      if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
        this.scene.restart();
      }
      return;
    }

    this.handlePlayerMovement();
    this.wrapEnemiesOnPlatforms();

    if (this.player.y > GAME_HEIGHT + 80) {
      this.loseLife();
    }
  }

  createTextures() {
    const graphics = this.make.graphics({ x: 0, y: 0, add: false });

    graphics.fillStyle(0x7de6ff, 1);
    graphics.fillCircle(18, 19, 14);
    graphics.fillStyle(0xfff4a8, 1);
    graphics.fillCircle(25, 12, 6);
    graphics.fillStyle(0x1d365f, 1);
    graphics.fillCircle(15, 16, 3);
    graphics.fillCircle(23, 16, 3);
    graphics.fillStyle(0xf6a84f, 1);
    graphics.fillTriangle(18, 21, 24, 21, 21, 25);
    graphics.generateTexture('nilo', 40, 42);
    graphics.clear();

    graphics.fillStyle(0x54b36d, 1);
    graphics.fillRoundedRect(0, 0, 220, 32, 12);
    graphics.fillStyle(0x2c6f4f, 1);
    graphics.fillRect(0, 22, 220, 10);
    graphics.fillStyle(0xa5e887, 1);
    for (let x = 12; x < 220; x += 34) graphics.fillCircle(x, 7, 4);
    graphics.generateTexture('platform', 220, 32);
    graphics.clear();

    graphics.fillStyle(0xffdf5d, 1);
    graphics.fillCircle(14, 14, 12);
    graphics.lineStyle(3, 0xffffff, 0.9);
    graphics.strokeCircle(14, 14, 8);
    graphics.generateTexture('coin', 28, 28);
    graphics.clear();

    graphics.fillStyle(0xbd3f5c, 1);
    graphics.fillCircle(18, 20, 14);
    graphics.fillStyle(0x6b2038, 1);
    graphics.fillTriangle(5, 14, 18, 0, 31, 14);
    graphics.fillStyle(0xffffff, 1);
    graphics.fillCircle(13, 18, 3);
    graphics.fillCircle(23, 18, 3);
    graphics.generateTexture('bramble', 36, 36);
    graphics.clear();

    graphics.fillStyle(0x75d4ff, 0.24);
    graphics.fillCircle(24, 24, 24);
    graphics.fillStyle(0xfff4a8, 0.82);
    graphics.fillCircle(24, 24, 9);
    graphics.generateTexture('goal', 48, 48);
  }

  addBackground() {
    for (let i = 0; i < 90; i += 1) {
      const star = this.add.circle(
        Phaser.Math.Between(0, 2400),
        Phaser.Math.Between(20, 250),
        Phaser.Math.FloatBetween(1, 3),
        0xffffff,
        Phaser.Math.FloatBetween(0.2, 0.75),
      );
      star.setScrollFactor(0.35);
    }

    for (let x = 0; x < 2400; x += 180) {
      this.add.rectangle(x, 462, 130, Phaser.Math.Between(110, 190), 0x0b1f38, 0.7)
        .setOrigin(0.5, 1)
        .setScrollFactor(0.55);
    }
  }

  createLevel() {
    this.platforms = this.physics.add.staticGroup();
    const platformData = [
      [120, 508, 1.45], [390, 430, 0.82], [650, 355, 0.72], [920, 445, 0.9],
      [1210, 360, 0.78], [1490, 285, 0.72], [1740, 420, 0.9], [2050, 340, 0.78],
      [2290, 500, 1.1],
    ];

    platformData.forEach(([x, y, scale]) => {
      this.platforms.create(x, y, 'platform').setScale(scale, 1).refreshBody();
    });
  }

  createPlayer() {
    this.player = this.physics.add.sprite(90, 420, 'nilo');
    this.player.setCollideWorldBounds(true);
    this.player.setBounce(0.08);
    this.player.body.setSize(28, 34).setOffset(6, 8);
  }

  createCoins() {
    this.coins = this.physics.add.group({ allowGravity: false });
    [260, 390, 650, 920, 1210, 1490, 1740, 2050, 2260].forEach((x, index) => {
      const y = [370, 315, 245, 340, 255, 175, 315, 235, 395][index];
      const coin = this.coins.create(x, y, 'coin');
      coin.setData('baseY', y);
      this.tweens.add({ targets: coin, y: y - 12, duration: 900, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    });
  }

  createEnemies() {
    this.enemies = this.physics.add.group();
    [520, 1080, 1660, 2160].forEach((x, index) => {
      const enemy = this.enemies.create(x, 100, 'bramble');
      enemy.setBounce(1, 0);
      enemy.setVelocityX(index % 2 === 0 ? 70 : -70);
      enemy.setCollideWorldBounds(false);
      enemy.body.setSize(28, 26).setOffset(4, 10);
    });
  }

  createHud() {
    this.scoreText = this.add.text(18, 16, 'Punti: 0', { fontFamily: 'monospace', fontSize: '24px', color: '#fff4a8' }).setScrollFactor(0);
    this.livesText = this.add.text(18, 48, 'Vite: 3', { fontFamily: 'monospace', fontSize: '24px', color: '#7de6ff' }).setScrollFactor(0);
    this.hintText = this.add.text(790, 18, 'Raccogli 9 luci', { fontFamily: 'monospace', fontSize: '18px', color: '#ffffff' }).setScrollFactor(0).setOrigin(0.5, 0);
    this.goal = this.physics.add.staticSprite(2290, 430, 'goal');
  }

  createControls() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys('W,A,S,D');
    this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
  }

  createCollisions() {
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.enemies, this.platforms);
    this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);
    this.physics.add.overlap(this.player, this.enemies, this.hitEnemy, null, this);
    this.physics.add.overlap(this.player, this.goal, this.reachGoal, null, this);
  }

  handlePlayerMovement() {
    const movingLeft = this.cursors.left.isDown || this.wasd.A.isDown;
    const movingRight = this.cursors.right.isDown || this.wasd.D.isDown;
    const jumping = Phaser.Input.Keyboard.JustDown(this.cursors.up) || Phaser.Input.Keyboard.JustDown(this.cursors.space) || Phaser.Input.Keyboard.JustDown(this.wasd.W);

    if (movingLeft) {
      this.player.setVelocityX(-220);
      this.player.setFlipX(true);
    } else if (movingRight) {
      this.player.setVelocityX(220);
      this.player.setFlipX(false);
    } else {
      this.player.setVelocityX(0);
    }

    if (jumping && this.player.body.blocked.down) {
      this.player.setVelocityY(-455);
    }
  }

  wrapEnemiesOnPlatforms() {
    this.enemies.children.iterate((enemy) => {
      if (!enemy) return;
      if (enemy.body.blocked.left) enemy.setVelocityX(80);
      if (enemy.body.blocked.right) enemy.setVelocityX(-80);
      if (enemy.x < 0 || enemy.x > 2380) enemy.setVelocityX(enemy.x < 0 ? 80 : -80);
    });
  }

  collectCoin(player, coin) {
    coin.disableBody(true, true);
    gameState.score += 10;
    this.scoreText.setText(`Punti: ${gameState.score}`);
  }

  hitEnemy(player, enemy) {
    if (player.body.velocity.y > 80 && player.y < enemy.y - 6) {
      enemy.disableBody(true, true);
      player.setVelocityY(-260);
      gameState.score += 25;
      this.scoreText.setText(`Punti: ${gameState.score}`);
      return;
    }

    this.loseLife();
  }

  loseLife() {
    if (this.invulnerable) return;
    gameState.lives -= 1;
    this.livesText.setText(`Vite: ${gameState.lives}`);

    if (gameState.lives <= 0) {
      this.showGameOver('GAME OVER');
      return;
    }

    this.invulnerable = true;
    this.player.setPosition(Math.max(90, this.player.x - 150), 250);
    this.player.setVelocity(0, 0);
    this.tweens.add({ targets: this.player, alpha: 0.35, duration: 120, yoyo: true, repeat: 7, onComplete: () => {
      this.player.setAlpha(1);
      this.invulnerable = false;
    } });
  }

  reachGoal() {
    if (this.coins.countActive(true) === 0) {
      this.showGameOver('HAI VINTO!');
    } else {
      this.hintText.setText(`Mancano ${this.coins.countActive(true)} luci`);
    }
  }

  showGameOver(title) {
    gameState.over = true;
    this.physics.pause();
    this.player.setTint(0xffdf5d);

    const panel = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, 520, 210, 0x07111d, 0.88)
      .setScrollFactor(0)
      .setStrokeStyle(3, 0xfff4a8);
    const titleText = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 52, title, {
      fontFamily: 'monospace', fontSize: '48px', color: '#fff4a8', fontStyle: 'bold',
    }).setOrigin(0.5).setScrollFactor(0);
    const scoreText = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 8, `Punteggio finale: ${gameState.score}`, {
      fontFamily: 'monospace', fontSize: '24px', color: '#ffffff',
    }).setOrigin(0.5).setScrollFactor(0);
    const restartText = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 62, 'Premi Invio per ricominciare', {
      fontFamily: 'monospace', fontSize: '20px', color: '#7de6ff',
    }).setOrigin(0.5).setScrollFactor(0);

    this.endPanel = [panel, titleText, scoreText, restartText];
  }
}

const config = {
  type: Phaser.AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  parent: 'game-container',
  pixelArt: false,
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 900 }, debug: false },
  },
  scene: GlimmerGroveScene,
};

new Phaser.Game(config);
