var game = new Phaser.Game(640,360,Phaser.AUTO);
var GameState={
    preload :function(){
        this.load.image('bg','assets/images/background.png');
        this.load.image('chicken','assets/images/chicken.png');
        this.load.image('horse','assets/images/horse.png');
        this.load.image('sheep','assets/images/sheep3.png');
        this.load.image('arrow','assets/images/arrow.png');
        this.load.image('pig','assets/images/pig.png');


        
    },  
    create:function(){
        this.background=this.game.add.sprite(0,0,'bg');
        
//        this.pig=this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'pig');
//        this.pig.anchor.setTo(0.5,0.5);
//        
//        //userInput for pig
//        this.pig.inputEnabled=true;
//        this.pig.input.pixelPerfectClick=true;
//        this.pig.events.onInputDown.add(this.animateAnimal,this);
        
        //right arrow
        this.rightArrow=this.game.add.sprite(580,this.game.world.centerY,'arrow');
        this.rightArrow.anchor.setTo(0.5);
        
        //custom param for direction assigned to rightArrow to move object from left to right
        
        this.rightArrow.customParams = {direction: 1};
        
        //user input for right arrow
        this.rightArrow.inputEnabled=true;
        this.rightArrow.input.pixelPerfectClick=true;
        this.rightArrow.events.onInputDown.add(this.switchAnimal,this);
        
        //left arrow
        this.leftArrow=this.game.add.sprite(60,this.game.world.centerY,'arrow');
        this.leftArrow.scale.setTo(-1,1);
        this.leftArrow.anchor.setTo(0.5);
        
        //user input for leftArrrow
        this.leftArrow.inputEnabled=true;
        this.leftArrow.input.pixelPerfectClick=true;
        this.leftArrow.events.onInputDown.add(this.switchAnimal,this);
        
        //custom param for direction assigned to leftArrow to move object from left to right

        this.leftArrow.customParams= {direction: -1};
        
        var animalData=[{key:'chicken',text:'CHICKEN'},{key:'pig',text:'PIG'},{key:'horse',text:'HORSE'},{key:'sheep',text:'SHEEP'}];
        
        //creating a group named animals
        this.animals=this.game.add.group();
        var self=this;
        
        var animal;
        //iterating over animal data to produce a set of sprites by using their kry value which represents the alias for the path they belong to
        animalData.forEach(function(element){
            animal=self.animals.create(-1000,self.game.world.centerY,element.key);
            animal.anchor.setTo(0.5);
            animal.customParams={text :  element.text};
            animal.inputEnabled=true;
            animal.input.pixelPerfectClick=true;
            animal.events.onInputDown.add(self.animateAnimal,self);
        
            
            
            
        });
        this.currentAnimal=this.animals.next();
        this.currentAnimal.position.set(game.world.centerX,game.world.centerY);
        
        
        
        
        
    },
    update:function()
    {
        
    },
    switchAnimal : function(sprite,event)
    {
        console.log('move animal');
    },
    
    animateAnimal :function(sprite,event)
    {
        console.log('animate animal');
    }
    
};

game.state.add('GameState',GameState);
game.state.start('GameState');