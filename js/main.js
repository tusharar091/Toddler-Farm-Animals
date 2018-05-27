var game = new Phaser.Game(640,360,Phaser.AUTO);
var newSelf=this;
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
        //animals.next() gives the next element in the group starting with second element which is next to the first element.
        this.currentAnimal=this.animals.next();
        
        this.currentAnimal.position.set(game.world.centerX,game.world.centerY);
        
        
        
        
        
    },
    update:function()
    {
        
    },
    switchAnimal : function(sprite,event)
    {
       //Boolean to check if current animal is moving or not and while it is in transition this fucntion will return false so as to block arrows while it is in transition.
        if(this.isMoving)
            return false;
        
        //initialise it to true while the animal is in transition
        this.isMoving=true;
        
        /* newVariable- variable to hold the newAnimal which is gonna come into the scene either from left or right
           endX- it is going to hold the future position of the current element i.e position out of the game window
           */
        var newAnimal, endX;
        //if right arrow is clicked
        if(sprite.customParams.direction>0)
            {
                newAnimal=this.animals.next();
                newAnimal.position.x=0-newAnimal.width/2;
                endX=640+this.currentAnimal.width*0.5;
                sprite.alpha=0;
                
                //disabling ledtArrow when in transition
                this.leftArrow.alpha=0;
            }
        //if left arrow is clicked
        else
            {
                newAnimal=this.animals.previous();
                newAnimal.position.x=640+newAnimal.width/2;
                endX=0-this.currentAnimal.width*0.5;
                sprite.alpha=0;
                
                //disabling right arrow when in transition
                this.rightArrow.alpha=0;
            }
        
        //add.tween adds a new animation to the newAnimal over a duration of 1s(1000 ms) in which it translates frame by frame to the final position
        var newAnimalMovement=game.add.tween(newAnimal);
        
        // when the transition is completed the boolean becomes false again and both arrows are enabled
        newAnimalMovement.onComplete.add(function()
        {
            this.isMoving=false;
            // re enabling the sprites again
            if(sprite.customParams.direction>0)
                {
                    sprite.alpha=1;
                    this.leftArrow.alpha=1;
                }
            else{
                sprite.alpha=1;
                this.rightArrow.alpha=1;
            }
        },this)
        
        
        //final position i.e center of the screen with duration 1000ms
        newAnimalMovement.to({x: game.world.centerX},1000);
        
        var currentAnimalMovement =game.add.tween(this.currentAnimal);
        currentAnimalMovement.to({x: endX});
        currentAnimalMovement.start();
        
        //starting the animation 
        newAnimalMovement.start();
        // making newAnimal as current
        this.currentAnimal=newAnimal;
    },
    
    animateAnimal :function(sprite,event)
    {
        console.log('animate animal');
    }
    
};

game.state.add('GameState',GameState);
game.state.start('GameState');