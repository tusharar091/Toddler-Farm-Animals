var game = new Phaser.Game(640, 360, Phaser.AUTO);
var GameState = {
    preload: function () {

        //loading images
        this.load.image('bg', 'assets/images/background.png');
        this.load.image('arrow', 'assets/images/arrow.png');

        //loading spritesheets

        this.load.spritesheet('pig', 'assets/images/pig_spritesheet.png', 297, 200, 3);
        this.load.spritesheet('chicken', 'assets/images/chicken_spritesheet.png', 131, 200, 3);
        this.load.spritesheet('horse', 'assets/images/horse_spritesheet.png', 212, 200, 3);
        this.load.spritesheet('sheep', 'assets/images/sheep_spritesheet.png', 244, 200, 3);

        //loading audio files

        this.load.audio('pigAudio', ['assets/audio/pig.ogg', 'assets/audio/pig.mp3']);
        this.load.audio('chickenAudio', ['assets/audio/chicken.ogg', 'assets/audio/chicken.mp3']);
        this.load.audio('horseAudio', ['assets/audio/horse.ogg', 'assets/audio/horse.mp3']);
        this.load.audio('sheepAudio', ['assets/audio/sheep.ogg', 'assets/audio/sheep.mp3']);




    },
    create: function () {
        this.background = this.game.add.sprite(0, 0, 'bg');



        //right arrow
        this.rightArrow = this.game.add.sprite(580, this.game.world.centerY, 'arrow');
        this.rightArrow.anchor.setTo(0.5);

        //custom param for direction assigned to rightArrow to move object from left to right

        this.rightArrow.customParams = { direction: 1 };

        //user input for right arrow
        this.rightArrow.inputEnabled = true;
        this.rightArrow.input.pixelPerfectClick = true;
        this.rightArrow.events.onInputDown.add(this.switchAnimal, this);

        //left arrow
        this.leftArrow = this.game.add.sprite(60, this.game.world.centerY, 'arrow');
        this.leftArrow.scale.setTo(-1, 1);
        this.leftArrow.anchor.setTo(0.5);

        //user input for leftArrrow
        this.leftArrow.inputEnabled = true;
        this.leftArrow.input.pixelPerfectClick = true;
        this.leftArrow.events.onInputDown.add(this.switchAnimal, this);

        //custom param for direction assigned to leftArrow to move object from left to right

        this.leftArrow.customParams = { direction: -1 };

        //adding sprite and audio data in array of animals
        var animalData = [{ key: 'chicken', text: 'CHICKEN', audio: 'chickenAudio' }, { key: 'pig', text: 'PIG', audio: 'pigAudio' }, { key: 'horse', text: 'HORSE', audio: 'horseAudio' }, { key: 'sheep', text: 'SHEEP', audio: 'sheepAudio' }];

        //creating a group named animals
        this.animals = this.game.add.group();
        var self = this;

        var animal;
        //iterating over animal data to produce a set of sprites by using their kry value which represents the alias for the path they belong to
        animalData.forEach(function (element) {

            // 0 represents the first frame in spritesheet
            animal = self.animals.create(-1000, self.game.world.centerY, element.key, 0);
            animal.anchor.setTo(0.5);

            //adding audio to each of the animal as customParams audio key from animalData array
            animal.customParams = { text: element.text, sound: game.add.audio(element.audio) };

            //adding animation to the spritesheet, 3 represents number of sprites in spritesheets, false -  no repetition
            animal.animations.add('animation', [0, 1, 2, 0, 1, 2, 1, 0], 3, false);
            animal.inputEnabled = true;
            animal.input.pixelPerfectClick = true;
            animal.events.onInputDown.add(self.animateAnimal, self);
        });
        //animals.next() gives the next element in the group starting with second element which is next to the first element.
        this.currentAnimal = this.animals.next();

        this.currentAnimal.position.set(game.world.centerX, game.world.centerY);

        //Text for current animal
        this.showText(this.currentAnimal);



    },

    update: function () {

    },

    switchAnimal: function (sprite, event) {

        /* Boolean to check if current animal is moving or not and while it is in transition this 
         fucntion will return false so as to block arrows while it is in transition.
         */
        if (this.isMoving)
            return false;

        //initialise it to true while the animal is in transition
        this.isMoving = true;

        this.currentAnimal.input.enabled = false;



        this.animalText.visible = false;
        /* newVariable- variable to hold the newAnimal which is gonna come into the scene either from left or right
           endX- it is going to hold the future position of the current element i.e position out of the game window
           */
        var newAnimal, endX;
        //if right arrow is clicked
        if (sprite.customParams.direction > 0) {
            newAnimal = this.animals.next();
            newAnimal.position.x = 0 - newAnimal.width / 2;
            endX = 640 + this.currentAnimal.width * 0.5;

            //disabling input to animal while in transition
            newAnimal.input.enabled = false;
            sprite.alpha = 0;

            //disabling ledtArrow when in transition
            this.leftArrow.alpha = 0;
        }
        //if left arrow is clicked
        else {
            newAnimal = this.animals.previous();
            newAnimal.position.x = 640 + newAnimal.width / 2;
            endX = 0 - this.currentAnimal.width * 0.5;

            sprite.alpha = 0;

            //disabling right arrow when in transition
            this.rightArrow.alpha = 0;
        }

        //add.tween adds a new animation to the newAnimal over a duration of 1s(1000 ms) in which it translates frame by frame to the final position
        var newAnimalMovement = game.add.tween(newAnimal);

        // when the transition is completed the boolean becomes false again and both arrows are enabled
        newAnimalMovement.onComplete.add(function () {
            this.isMoving = false;
            // re enabling the sprites again
            this.rightArrow.alpha = 1;
            this.leftArrow.alpha = 1;

            this.showText(newAnimal);
            //enabling input to animal when transition ends
            this.currentAnimal.input.enabled = true;


        }, this)


        //final position i.e center of the screen with duration 1000ms
        newAnimalMovement.to({ x: game.world.centerX }, 1000);

        var currentAnimalMovement = game.add.tween(this.currentAnimal);
        currentAnimalMovement.to({ x: endX });
        currentAnimalMovement.start();

        //starting the animation 
        newAnimalMovement.start();
        // making newAnimal as current
        this.currentAnimal = newAnimal;
    },

    animateAnimal: function (sprite, event) {
        //playing sprite-sheet animation
        sprite.play('animation');

        //playing audio associated with each of the sprite 
        sprite.customParams.sound.play();
    },


    showText: function (animal) {
        var style = {
            font: 'bold 30pt Comic Sans MS',
            fill: '#006699',
            align: 'center',

        };
        if (!this.animalText) {
            this.animalText = this.game.add.text(this.game.world.centerX, this.game.height * 0.85, '', style);
            this.animalText.anchor.setTo(0.5);
        }

        this.animalText.setText(animal.customParams.text);
        this.animalText.visible = true;
    }

};

game.state.add('GameState', GameState);
game.state.start('GameState');