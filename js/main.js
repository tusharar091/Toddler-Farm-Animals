/*
Creates a game window of specified size and
returns a variable associated with it so that
game window's properties can be manipulated
*/

var game = new Phaser.Game(640,360,Phaser.AUTO); 
// A game can be in any one of the three states(preload,create,upload) at a time which are defined by a variable GameState
var GameState={
    //used to load the assets to the local memeory from disk before the start of the game to make access faster
    preload :function(){
        //this.load.image() loads the image using the current instance referred by 'this' 'bg' is a 'key' or an 'alias' which can be used later 
        this.load.image('bg','assets/images/background.png');
        this.load.image('chicken','assets/images/chicken.png');
        this.load.image('horse','assets/images/horse.png');
        this.load.image('sheep','assets/images/sheep3.png');
        this.load.image('pig','assets/images/pig.png');


        
    },
    //called after the execution of preload function and is used to create GameObjects from the loaded assets
    create:function(){
        /*game.add.sprite() adds a sprite to the game scene and returns a var(e.g -background) 
        which can be used to manipulate properties associated with it
        */
        this.background=this.game.add.sprite(0,0,'bg');
        this.chicken=this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'chicken');
        //used to change the anchor point of the image from top left to center(0.5)
        this.chicken.anchor.setTo(0.5);
        //used to scale the image w.r.t anchor point (2 in x and 1 in y)
        this.chicken.scale.setTo(2,1);
        this.horse=this.game.add.sprite(120,10,'horse');
        this.horse.scale.setTo(0.5);
    },
    //called every frame and is used to make the gameObjects in action
    update:function()
    {
        
    }
    
};

game.state.add('GameState',GameState);
game.state.start('GameState');