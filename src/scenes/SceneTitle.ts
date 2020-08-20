import Phaser from 'phaser';
import AlignGrid from '../classes/utils/AlignGrid';
import Align from '../classes/utils/Align';
import  gameLogoImg from '../../public/images/main/title.png';
import  startButtonImg  from '../../public/images/ui/buttonStart.png';

export default class SceneTitle extends Phaser.Scene{
constructor(){
    super('SceneTitle');
}

preload(){
this.load.image('buttonStartImg', startButtonImg);
this.load.image('gameLogoImg',gameLogoImg);
}
create(){
    console.log('Scene Title')
    let alignGrid = new AlignGrid({rows: 11, cols: 11, scene: this, width: Number(this.game.config.width), height: Number(this.game.config.height)});
    alignGrid.showNumbers();

    const gameTitle = this.add.image(240, 100, 'gameLogoImg');
    const buttonStart = this.add.image(240,320, 'buttonStartImg');
    
    Align.scaleToGameWidth(gameTitle, .8, this);
    Align.scaleToGameWidth(buttonStart, .4, this);

    alignGrid.placeAtIndex(38,gameTitle);
    alignGrid.placeAtIndex(71, buttonStart);


    buttonStart.setInteractive();
    buttonStart.on("pointerdown", this.startGame, this);
   
}
update(){}

startGame(){
    this.scene.start('SceneMain');
}


}