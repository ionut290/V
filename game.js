const GAME_WIDTH = 960;
const GAME_HEIGHT = 540;
const WORLD_WIDTH = 2500;
const STORAGE_KEY = 'avola-coop-adventure-progress';

const COLLEAGUE_NAMES = [
  'Chiapelli Paolo', 'Pizzirani Matteo', 'Turuku Fatos', 'Russo Federico', 'Buja Daniel G.',
  'Roman Luya Rolando', 'Cojocaru Serafim', 'Pop Cristian-Adrian', 'Lazar Relu Lucian', 'Boldrin Amabile',
  'Maggiori Fabio', 'Masotti Massimo', 'Contreras Henrry', 'Perez Ponce Cesar Omar', 'Varga Ionel',
  'Oduro Ernest', 'Tean Alexandr', 'Khan Imran', 'Covaliov Igor', 'Zorjani Ibrahim', 'Scollo Mario',
  'Chiriac Dragos Nicolaie', 'Zambelli Michela', 'Dragulean Valentin', 'De Giorgio Giorgio Agostino',
  'Stegani Barbara', 'Pirritano Pietro', 'Lazar Alexandru', 'Suppini Andrea', 'Joita Ion',
  'Provenzano Antonino', 'Ghitiu Emilian Cristian', 'Marangon Silvano', 'Stoichina Gabi-Cornel',
  'Aaziz Aziz', 'Egbona Salome', 'Bejaoui Hafedh', 'Sunday Christabel', 'Venturi Grandi Angela',
  'Adames Ramirez Fabio', 'Ali Imurana', 'Ali Mahmoud Fathi Mohamed', 'Amoah Frimpong Albert',
  'Arginelli Federico', 'Artuso Giuseppe', 'Balboni Tiziana', 'Barone Antonio', 'Bottitta Lorenzo',
  'Bouhchich Rachid', 'Budaca Simona Paula', 'Cenerini Corrado', 'Chambi Arapa Luis Justo', 'Corona Lucio',
  'Damande Michel', 'Di Giovanni Brando', 'Ed Dahri Cherkaoui', 'Errachidi Abdelmoula', 'Fardoos Arslan',
  'Ferrari Massimo', 'Ferretti Matteo', 'Florea Ioan Ciprian', 'Franceschelli Alessandro', 'Gerdan Georgeta',
  'Gherardi Federico', 'Giorgio Flavio', 'Golinelli Fabio', 'Guernelli Manuel', 'Hoseini Seied Heidar',
  'Iacoviello Antonio', 'Iqbal Bilawal', 'Iqbal Muhammad Adnan', 'Jaurigue Joey Ritz', 'Javed Mubashar',
  'Kone Mamadou', 'Kryskiv Taras', 'Lamssaoui Abdelkerim', 'Lavezzi Ricky', 'Leguia Huayana Robert',
  'Levato Giuseppe', 'Martinengo Davide', 'Martino Luigi Antonio', 'Meliani Elmostafa', 'Meloni Luca',
  'Mendoza Matos Michael Roy', 'Menna Adriano', 'Minelli Marzia', 'Mohammad Asif', 'Monari Alessia',
  'Muhammad Akram', 'Muhammad Khan', 'Muhammad Bilal', 'Muran Massimo', 'Nanni Piero', 'Ndaw Modou',
  'Nuaobasi Emmanuel', 'Ojega Osato', 'Okosun Raphael', 'Omoru Faith', 'Osti Francesco', 'Ouchari Chaker',
  'Parzanese Manuel', 'Pirritano Salvatore', 'Pizzirani Lorenzo', 'Pozzi Giovanni', 'Russo Paolo',
  'Sacchi Lorenzo', 'Samb Mame Mor', 'Savorri Vasco', 'Shabbir Hassan', 'Sitzia Cristian', 'Sylla Moustapha',
  'Talignani Emanuele', 'Tartarini Federico', 'Ugolini Giulio', 'Velazquez Fernandez Dariel', 'Viesti Daniel',
  'Vitale Salvatore', 'Yeboah Johnson', 'Zarri Andrea', 'Zarubko Maksym', 'Zorjani Mevlan',
  'Caliciotti Lorenzo', 'Mereacre Vladimir', 'Starinieri Erika', 'Eyonulagba Bello Nouhadine', 'Galvagni Pietro',
  'Lima Vito', 'Ama Okorie Prince', 'Fini Teresa', 'Dal Brollo Milo', 'Salami Helen', 'Landi Elisa',
  'Ajmal Muhammad', 'Minelli Lorenza', 'Basciu Alessandro', 'Gerardi Valentina', 'Frighi Andrea',
];

const OBSTACLES = ['rovi giganti', 'fango', 'zanzare', 'caldo', 'pioggia', 'trattori impazziti'];
const COLLECTIBLES = ['guanti', 'caschi', 'decespugliatori', 'taniche', 'motoseghe'];
const MISSIONS = [
  'salvare il turno pausa prima che il caffè scappi col carrello',
  'recuperare i DPI dispersi nella giungla del magazzino',
  'convincere un trattore a fare yoga invece di derapare',
  'portare una tanica leggendaria senza svegliare le zanzare DJ',
  'tagliare i rovi con stile da sagra e atterraggio morbido',
  'riordinare il caos prima che Ionel lo dichiari opera d’arte',
];
const JOKES = [
  'Ionel dice: “Se il fango sorride, non fidarti: vuole gli stivali!”',
  'La zanzara capo ha prenotato il tavolo: purtroppo è il tuo casco.',
  'Il trattore impazzito frena solo davanti alla parola “pausa”.',
  'Piove così tanto che anche i rovi chiedono un ombrello sindacale.',
  'Il caldo è a livello forno: raccogli guanti o diventi una piadina.',
  'La motosega canta, ma solo canzoni fuori tempo.',
];
const RANDOM_GAGS = [
  'PATATRAC!',
  'ZANZARA MULTATA!',
  'IL FANGO HA VINTO UN ROUND!',
  'CARRELLO FUORI CONTROLLO!',
  'PRESA!',
  'BOOM COOP!',
];
const BOSS_NAMES = ['Capo Rovo', 'Fangozilla', 'Zanza Regina', 'Sole Cattivo', 'Nuvola Brontola', 'Trattoraptor'];

const levels = COLLEAGUE_NAMES.map((name, index) => ({
  id: index,
  name,
  mission: MISSIONS[index % MISSIONS.length],
  joke: JOKES[index % JOKES.length],
  victory: `${name} applaude: “Grande Ionel! Ora il livello profuma di cooperativa epica!”`,
  boss: BOSS_NAMES[index % BOSS_NAMES.length],
  obstacleOffset: index % OBSTACLES.length,
  collectibleOffset: index % COLLECTIBLES.length,
  tint: Phaser.Display.Color.HSVColorWheel()[index % 360].color,
}));

const save = {
  unlocked: 0,
  bestScores: {},
  load() {
    try { Object.assign(this, JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}); } catch (error) { this.unlocked = 0; this.bestScores = {}; }
  },
  persist() { localStorage.setItem(STORAGE_KEY, JSON.stringify({ unlocked: this.unlocked, bestScores: this.bestScores })); },
  complete(levelId, score) { this.unlocked = Math.max(this.unlocked, Math.min(levelId + 1, levels.length - 1)); this.bestScores[levelId] = Math.max(this.bestScores[levelId] || 0, score); this.persist(); },
};
save.load();

const run = { levelId: 0, score: 0, lives: 3 };

class BootScene extends Phaser.Scene {
  constructor() { super('BootScene'); }
  preload() { createTextures(this); }
  create() { this.scene.start('MenuScene'); }
}

class MenuScene extends Phaser.Scene {
  constructor() { super('MenuScene'); }
  create() {
    paintBackdrop(this, 0x153d31);
    this.add.text(480, 92, 'Avola Coop Adventure', titleStyle(54)).setOrigin(0.5);
    this.add.text(480, 160, 'Ionel Varga contro rovi giganti, fango, zanzare e trattori con poca pazienza.', textStyle(22, '#ffffff')).setOrigin(0.5);
    addButton(this, 480, 250, 380, '▶ Gioca / Selezione livelli', () => this.scene.start('LevelSelectScene'));
    addButton(this, 480, 326, 380, '↺ Azzera salvataggio', () => { localStorage.removeItem(STORAGE_KEY); save.unlocked = 0; save.bestScores = {}; this.scene.restart(); });
    this.add.text(480, 430, 'Comandi: ← → / A D per muoversi, ↑ / W / Spazio per saltare. Invio torna al menu nelle schermate finali.', textStyle(18, '#d8fff0')).setOrigin(0.5).setAlign('center').setWordWrapWidth(800);
  }
}

class LevelSelectScene extends Phaser.Scene {
  constructor() { super('LevelSelectScene'); }
  create() {
    paintBackdrop(this, 0x202f55);
    this.page = 0;
    this.perPage = 12;
    this.renderPage();
    this.input.keyboard.on('keydown-LEFT', () => { this.page = Math.max(0, this.page - 1); this.renderPage(); });
    this.input.keyboard.on('keydown-RIGHT', () => { this.page = Math.min(Math.ceil(levels.length / this.perPage) - 1, this.page + 1); this.renderPage(); });
    this.input.keyboard.on('keydown-ESC', () => this.scene.start('MenuScene'));
  }
  renderPage() {
    this.children.removeAll();
    paintBackdrop(this, 0x202f55);
    this.add.text(480, 34, 'Scegli il collega-livello', titleStyle(34)).setOrigin(0.5);
    const start = this.page * this.perPage;
    levels.slice(start, start + this.perPage).forEach((level, i) => {
      const x = 260 + (i % 2) * 440;
      const y = 96 + Math.floor(i / 2) * 62;
      const locked = level.id > save.unlocked;
      addButton(this, x, y, 390, `${locked ? '🔒' : '🧤'} ${level.id + 1}. ${level.name}`, () => {
        if (!locked) { run.levelId = level.id; this.scene.start('GameScene'); }
      }, locked);
    });
    this.add.text(480, 500, `Pagina ${this.page + 1}/${Math.ceil(levels.length / this.perPage)}  •  Frecce ← → per sfogliare  •  ESC menu`, textStyle(18, '#fff4a8')).setOrigin(0.5);
  }
}

class GameScene extends Phaser.Scene {
  constructor() { super('GameScene'); }
  create() {
    this.level = levels[run.levelId];
    run.score = 0; run.lives = 3; this.itemsLeft = 0; this.bossHits = 0; this.ended = false;
    this.cameras.main.setBackgroundColor('#77b7df');
    this.physics.world.setBounds(0, 0, WORLD_WIDTH, GAME_HEIGHT);
    this.addWorld(); this.createPlatforms(); this.createPlayer(); this.createItems(); this.createHazards(); this.createBoss(); this.createHud(); this.createControls(); this.createCollisions();
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08); this.cameras.main.setBounds(0, 0, WORLD_WIDTH, GAME_HEIGHT);
  }
  update() {
    if (this.ended) { if (Phaser.Input.Keyboard.JustDown(this.enterKey)) this.scene.start('LevelSelectScene'); return; }
    const left = this.cursors.left.isDown || this.wasd.A.isDown; const right = this.cursors.right.isDown || this.wasd.D.isDown;
    this.player.setVelocityX(left ? -230 : right ? 230 : 0); if (left || right) this.player.setFlipX(left);
    if ((Phaser.Input.Keyboard.JustDown(this.cursors.up) || Phaser.Input.Keyboard.JustDown(this.cursors.space) || Phaser.Input.Keyboard.JustDown(this.wasd.W)) && this.player.body.blocked.down) this.player.setVelocityY(-470);
    this.hazards.children.iterate((h) => { if (!h) return; if (h.body.blocked.left) h.setVelocityX(90); if (h.body.blocked.right) h.setVelocityX(-90); });
    if (this.player.y > GAME_HEIGHT + 80) this.loseLife();
  }
  addWorld() {
    for (let x = 0; x < WORLD_WIDTH; x += 120) this.add.rectangle(x, 510, 100, 70, 0x4d7d35).setOrigin(0, 0);
    for (let x = 140; x < WORLD_WIDTH; x += 360) this.add.text(x, 455, OBSTACLES[(this.level.obstacleOffset + x) % OBSTACLES.length], textStyle(14, '#2d1f12')).setAngle(-8);
  }
  createPlatforms() {
    this.platforms = this.physics.add.staticGroup();
    [[130,500,1.5],[420,420,.9],[700,345,.82],[990,430,.92],[1270,350,.82],[1540,275,.78],[1790,405,.9],[2080,330,.82],[2350,470,1.1]].forEach(([x,y,s]) => this.platforms.create(x,y,'platform').setScale(s,1).refreshBody());
  }
  createPlayer() { this.player = this.physics.add.sprite(85, 420, 'ionel').setCollideWorldBounds(true).setBounce(.08); this.player.body.setSize(28, 42).setOffset(10, 6); }
  createItems() {
    this.items = this.physics.add.group({ allowGravity: false });
    const xs = [260,420,700,990,1270,1540,1790,2080,2310]; const ys = [365,325,250,335,255,180,310,235,385];
    xs.forEach((x, i) => { const item = this.items.create(x, ys[i], `item${(this.level.collectibleOffset + i) % COLLECTIBLES.length}`); item.setData('label', COLLECTIBLES[(this.level.collectibleOffset + i) % COLLECTIBLES.length]); this.itemsLeft += 1; this.tweens.add({ targets: item, y: ys[i] - 12, yoyo: true, repeat: -1, duration: 850 }); });
  }
  createHazards() {
    this.hazards = this.physics.add.group();
    [520,1080,1660,2160].forEach((x, i) => { const h = this.hazards.create(x, 100, `hazard${(this.level.obstacleOffset + i) % OBSTACLES.length}`); h.setVelocityX(i % 2 ? -90 : 90).setBounce(1, 0).setData('name', OBSTACLES[(this.level.obstacleOffset + i) % OBSTACLES.length]); h.body.setSize(34, 30).setOffset(3, 8); });
  }
  createBoss() { this.boss = this.physics.add.sprite(2380, 380, 'boss').setTint(this.level.tint).setBounce(1, 0).setVelocityX(-70); this.boss.body.setSize(54, 54).setOffset(5, 8); }
  createHud() {
    this.scoreText = this.add.text(16, 12, 'Punti: 0', textStyle(22, '#fff4a8')).setScrollFactor(0);
    this.livesText = this.add.text(16, 42, 'Vite: 3', textStyle(22, '#7de6ff')).setScrollFactor(0);
    this.levelText = this.add.text(480, 12, `${this.level.id + 1}/${levels.length} ${this.level.name}`, textStyle(18, '#ffffff')).setOrigin(.5,0).setScrollFactor(0);
    this.infoText = this.add.text(480, 40, `Missione: ${this.level.mission}`, textStyle(15, '#e7ffe4')).setOrigin(.5,0).setScrollFactor(0).setWordWrapWidth(700).setAlign('center');
    this.add.text(480, 72, this.level.joke, textStyle(14, '#fff4a8')).setOrigin(.5,0).setScrollFactor(0).setWordWrapWidth(760).setAlign('center');
  }
  createControls() { this.cursors = this.input.keyboard.createCursorKeys(); this.wasd = this.input.keyboard.addKeys('W,A,S,D'); this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER); }
  createCollisions() {
    this.physics.add.collider(this.player, this.platforms); this.physics.add.collider(this.hazards, this.platforms); this.physics.add.collider(this.boss, this.platforms);
    this.physics.add.overlap(this.player, this.items, this.collectItem, null, this); this.physics.add.overlap(this.player, this.hazards, this.hitHazard, null, this); this.physics.add.overlap(this.player, this.boss, this.hitBoss, null, this);
  }
  showFloatingJoke(text, x, y) {
    const jokeText = this.add.text(x, y, text, { ...textStyle(18, '#fff4a8'), fontStyle: 'bold', stroke: '#18301f', strokeThickness: 4 }).setOrigin(0.5).setDepth(50);
    this.tweens.add({
      targets: jokeText,
      y: y - 48,
      alpha: 0,
      duration: 900,
      ease: 'Cubic.easeOut',
      onComplete: () => jokeText.destroy(),
    });
  }
  randomGag() { return Phaser.Utils.Array.GetRandom(RANDOM_GAGS); }
  collectItem(player, item) { item.disableBody(true, true); this.itemsLeft -= 1; run.score += 10; this.scoreText.setText(`Punti: ${run.score}`); this.infoText.setText(`Raccolto: ${item.getData('label')}! Mancano ${this.itemsLeft} oggetti prima del mini boss.`); this.showFloatingJoke(this.randomGag(), item.x, item.y - 28); }
  hitHazard(player, hazard) { if (player.body.velocity.y > 80 && player.y < hazard.y - 8) { hazard.disableBody(true, true); player.setVelocityY(-260); run.score += 25; this.scoreText.setText(`Punti: ${run.score}`); this.showFloatingJoke('ZANZARA MULTATA!', hazard.x, hazard.y - 28); return; } if (!this.invulnerable && !this.ended) this.showFloatingJoke('IL FANGO HA VINTO UN ROUND!', player.x, player.y - 36); this.loseLife(`${hazard.getData('name')} ti ha fatto fare una pausa non autorizzata!`); }
  hitBoss(player, boss) {
    if (this.itemsLeft > 0) { this.infoText.setText(`Prima raccogli tutti gli oggetti: il mini boss ${this.level.boss} è allergico all’organizzazione.`); return; }
    if (player.body.velocity.y > 80 && player.y < boss.y - 12) { this.bossHits += 1; player.setVelocityY(-310); run.score += 50; this.scoreText.setText(`Punti: ${run.score}`); this.infoText.setText(`${this.level.boss} colpito ${this.bossHits}/3: protesta in dialetto dei rovi!`); this.showFloatingJoke('PATATRAC!', boss.x, boss.y - 36); if (this.bossHits >= 3) this.win(); } else this.loseLife(`${this.level.boss} ti ha timbrato il cartellino al contrario!`);
  }
  loseLife(message = 'Ionel inciampa ma salva la dignità con un salto comico.') { if (this.invulnerable || this.ended) return; run.lives -= 1; this.livesText.setText(`Vite: ${run.lives}`); if (run.lives <= 0) { this.finish('Game Over', message, false); return; } this.invulnerable = true; this.infoText.setText(message); this.player.setPosition(Math.max(85, this.player.x - 180), 250); this.player.setVelocity(0,0); this.tweens.add({ targets: this.player, alpha: .35, yoyo: true, repeat: 7, duration: 110, onComplete: () => { this.player.setAlpha(1); this.invulnerable = false; } }); }
  win() { save.complete(this.level.id, run.score); this.finish('Vittoria!', this.level.victory, true); }
  finish(title, message, won) { this.ended = true; this.physics.pause(); this.add.rectangle(GAME_WIDTH/2, GAME_HEIGHT/2, 650, 250, 0x08111f, .92).setScrollFactor(0).setStrokeStyle(4, won ? 0xfff4a8 : 0xff6b6b); this.add.text(480, 210, title, titleStyle(44)).setOrigin(.5).setScrollFactor(0); this.add.text(480, 268, message, textStyle(20, '#ffffff')).setOrigin(.5).setScrollFactor(0).setWordWrapWidth(570).setAlign('center'); this.add.text(480, 334, `Punteggio: ${run.score} • Premi Invio per la selezione livelli`, textStyle(18, '#7de6ff')).setOrigin(.5).setScrollFactor(0); }
}

function createTextures(scene) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  g.fillStyle(0x4b7bec).fillRoundedRect(6, 10, 34, 38, 10).fillStyle(0xffd29d).fillCircle(23, 11, 11).fillStyle(0x1f2937).fillRect(13, 0, 20, 7).fillStyle(0xffffff).fillCircle(19, 10, 2).fillCircle(27, 10, 2).generateTexture('ionel', 48, 54); g.clear();
  g.fillStyle(0x6ebf58).fillRoundedRect(0,0,220,32,10).fillStyle(0x3d7835).fillRect(0,22,220,10).generateTexture('platform',220,32); g.clear();
  const colors = [0x2ecc71,0xffd166,0x7bdff2,0xd99a6c,0xb5651d]; for (let i=0;i<5;i+=1){ g.fillStyle(colors[i]).fillRoundedRect(3,3,34,24,8).fillStyle(0xffffff,.5).fillCircle(28,10,5).generateTexture(`item${i}`,40,32); g.clear(); }
  const hColors = [0x7b2d26,0x6b4f2a,0x8e44ad,0xff9f1c,0x3498db,0xe74c3c]; for (let i=0;i<6;i+=1){ g.fillStyle(hColors[i]).fillCircle(20,20,16).fillStyle(0xffffff).fillCircle(14,16,3).fillCircle(25,16,3).fillStyle(0x111111).fillTriangle(12,27,28,27,20,34).generateTexture(`hazard${i}`,40,40); g.clear(); }
  g.fillStyle(0xf06292).fillRoundedRect(0,8,64,56,16).fillStyle(0xffffff).fillCircle(20,26,5).fillCircle(44,26,5).fillStyle(0x111111).fillRect(18,43,28,5).generateTexture('boss',64,72);
}
function paintBackdrop(scene, color) { scene.add.rectangle(480,270,960,540,color); for (let i=0;i<55;i+=1) scene.add.circle(Phaser.Math.Between(0,960), Phaser.Math.Between(0,540), Phaser.Math.Between(1,4), 0xffffff, .18); }
function textStyle(size, color) { return { fontFamily: 'monospace', fontSize: `${size}px`, color }; }
function titleStyle(size) { return { fontFamily: 'monospace', fontSize: `${size}px`, color: '#fff4a8', fontStyle: 'bold', stroke: '#18301f', strokeThickness: 6 }; }
function addButton(scene, x, y, width, label, onClick, disabled = false) { const rect = scene.add.rectangle(x, y, width, 44, disabled ? 0x3b4252 : 0x147d64, .94).setStrokeStyle(2, disabled ? 0x6b7280 : 0xfff4a8).setInteractive({ useHandCursor: !disabled }); const text = scene.add.text(x, y, label, textStyle(16, disabled ? '#a8b0bd' : '#ffffff')).setOrigin(.5).setWordWrapWidth(width - 20); if (!disabled) rect.on('pointerdown', onClick); return { rect, text }; }

new Phaser.Game({ type: Phaser.AUTO, width: GAME_WIDTH, height: GAME_HEIGHT, parent: 'game-container', pixelArt: false, physics: { default: 'arcade', arcade: { gravity: { y: 900 }, debug: false } }, scene: [BootScene, MenuScene, LevelSelectScene, GameScene] });
