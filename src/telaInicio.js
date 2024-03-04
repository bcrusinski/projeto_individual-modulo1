class TelaInicio extends Phaser.Scene {
    constructor() {
        super({ key: 'TelaInicio' });
    }

    //carrega assets
    preload() {
        this.load.image("fundo", "assets/sala.jpg") // importa plano de fundo
    }
    //cria elementos
    create() {
        this.add.image(gameState.mediaWidth, gameState.mediaHeight, "fundo").setScale(0.26); // adiciona plano de fundo
        // adição do texto de boas vindas
        var mensagem = this.add.text(gameState.mediaWidth, gameState.mediaHeight, "Bem vindo ao Pega Novelos!\n aperte espaço para iniciar", { fontSize: '35px arial bold', fill: '#00000' })

        mensagem.setOrigin(0.5); // muda origem do texto para o centro
        this.teclado = this.input.keyboard.createCursorKeys();// rastreia teclado do usuário
    }

    update() {
        // troca a cena caso o usuário clique em "espaço"
        if (this.teclado.space.isDown) {
            this.scene.start('Cena1'); // inicia cena1
            this.scene.stop('TelaInicio');// termina telaInicio
        }
    }

}
