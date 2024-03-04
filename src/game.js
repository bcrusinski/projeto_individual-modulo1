var gameState = {
  // configuração das medidas da tela
  gameWidth: window.innerWidth * Math.max(1, window.devicePixelRatio / 2),
  gameHeight: window.innerHeight * Math.max(1, window.devicePixelRatio / 2),
  mediaWidth: (window.innerWidth * Math.max(1, window.devicePixelRatio / 2)) / 2,
  mediaHeight: (window.innerHeight * Math.max(1, window.devicePixelRatio / 2)) / 2,
}

var config = {
  type: Phaser.AUTO,
  // aplica dimenções definidas
  width: gameState.gameWidth,
  height: gameState.gameHeight,

  // cenas à serem criadas
  scene: [TelaInicio, Cena1],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },// ativação da gravidade
    },
    debug: true,
  }
};

var game = new Phaser.Game(config); // aplicação das configurações