class Cena1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Cena1' });

    }

    // função de inicialização
    preload() {
        // carrega imagens do obstáculo(mesa) e plano de fundo
        this.load.image("fundo", "assets/sala.jpg")
        this.load.image("mesa", "assets/mesa.png")

        // carrega spritesheet do gato e diz o tamanho
        this.load.spritesheet({
            key: 'gato', // nome do spritesheet
            url: 'assets/gato.png', // localização do arquivo 
            frameConfig: { // configuração das medidas do sprite
                frameWidth: 400,
                frameHeight: 200
            }
        });
        // carrega imagem do novelo
        this.load.image("novelo", "assets/lã.png")
    }

    create() {
        // inicialização do jogo

        var pontuacao = 0; // variável para pontuação
        var spawn = this.geraSpawns() // usa o método geraSpawns para criar os pontos de surgimento de novelos

        this.add.image(gameState.mediaWidth, gameState.mediaHeight, "fundo").setScale(0.26); // adiciona plano de fundo

        // adiciona e configura o placar
        var placar = this.add.text(gameState.mediaWidth / 2, 90, pontuacao + " novelos", { fontSize: '30px', fill: '#00000' });

        // adiciona e configura a mesa
        this.mesa = this.physics.add.sprite(1200, gameState.mediaHeight * 1.85, "mesa");
        this.mesa.setScale(0.08);
        this.mesa.setCollideWorldBounds(true);

        // adição do gato a cena
        this.gato = this.physics.add.sprite(gameState.mediaWidth / 2, gameState.mediaHeight / 2, 'gato').setScale(0.5);

        // configura animação de movimento do gato
        this.anims.create({
            key: "walk",
            frames: this.anims.generateFrameNumbers('gato', { start: 0, end: 11 }),
            frameRate: 12,
            repeat: -1
        });
        this.gato.setCollideWorldBounds(true); // colisão do gato com as bordas

        // adiciona e configura o novelo
        var novelo = this.physics.add.sprite(gameState.mediaWidth / 2, 0, "novelo");
        novelo.setScale(0.02);
        novelo.setCollideWorldBounds(true); // liga colisão com as bordas
        novelo.setBounce(0.6);// definição de quique

        // cria colisão com a mesa
        this.physics.add.collider(this.gato, this.mesa);
        this.physics.add.collider(this.mesa, novelo);

        // configura a mecÂnica ao colidirem o gato e o novelo
        this.physics.add.collider(novelo, this.gato, function () {
            novelo.setVisible(false);
            novelo.setPosition(spawn[Phaser.Math.RND.between(0, 9)], 0); // muda a posição do novelo
            novelo.setVisible(true);
            pontuacao += 1 // aumenta a pontuação
            placar.setText(pontuacao + " novelos"); // atualiza o placar
        });
        this.teclado = this.input.keyboard.createCursorKeys(); // leitura das teclas clicadas
    }


    update() {
        // corrige a posição da mesa se necessário
        if (this.mesa.x != 1200) {
            this.corrigeMesa()
        }

        // movimento para a esquerda do gato
        if (this.teclado.left.isDown) {
            this.gato.setVelocityX(-200);// velocidade
            this.gato.setFlip(false, false);// posição do sprite
            this.gato.anims.play('walk', true);// liga animação
        }
        //moviemento para a direita do gato
        else if (this.teclado.right.isDown) {
            this.gato.setVelocityX(200); // velocidade
            this.gato.setFlip(true, false);// posição do sprite
            this.gato.anims.play('walk', true);// liga animação
        }
        // fim do movimento horizontal
        else {
            this.gato.setVelocityX(0);
            this.gato.anims.play('walk', false);// desliga animação

        }
        // pulo do gato (precisa de melhorias)
        if (this.teclado.up.isDown) {
            this.gato.setVelocityY(-200);// velocidade vertical
        }
    }

    corrigeMesa() {
        // método para corrigir a posição da mesa
        this.mesa.x = 1200;
    }

    geraSpawns() {
        // cria pontos de spawn do novelo
        var pontosSpawn = []
        let i = 0;
        for (i = 0; i < 10; i++) {
            pontosSpawn.push(Phaser.Math.RND.between(10, 2000)) // sorteio de 10 pontos e adição a uma lista
        }
        return pontosSpawn;// retorno da lista com os pontos sorteados
    }
}