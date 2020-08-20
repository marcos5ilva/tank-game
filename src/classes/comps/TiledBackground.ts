import Phaser, { Game } from 'phaser';


export default class TiledBackground extends Phaser.GameObjects.Group{
    
scene: any;
key: string;
positionX: number;
positionY: number;

    constructor(config: any){
        super(config.scene);
        this.scene = config.scene;
        this.key = config.key;
        this.positionY = 0;
        this.positionX = 0;
        this.addTile();
    }

    addTile(){
        const tile = this.scene.add.image(this.positionX, this.positionY, this.key)
    this.add(tile);
    this.positionX+=tile.displayWidth;
    if(this.positionX> this.scene.game.config.width + tile.displayWidth){
        this.positionY += tile.displayHeight;
        this.positionX = 0;
    }
    if(this.positionY<this.scene.game.config.height + tile.displayHeight){
        this.addTile();
    }
    }

}