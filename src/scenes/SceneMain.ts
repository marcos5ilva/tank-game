import Phaser, { Scene, Game } from 'phaser';
import AlignGrid from '../classes/utils/AlignGrid';
import TiledBackground from '../classes/comps/TiledBackground';
import dirtImage from '../../public/images/main/dirt.png';
import tank1Image from '../../public/images/main/tank1.png';
import tank2Image from '../../public/images/main/tank2.png';

export default class SceneMain extends Phaser.Scene{

    tank1:any;
    tank2:any;
    constructor(){
        super('SceneMain');
    }

    preload(){
            this.load.image('dirt', dirtImage);
            this.load.image('tank1',tank1Image);
            this.load.image('tank2', tank2Image);
    }
    create(){
        console.log("Ready!")
        let background = new TiledBackground({
            scene: this,
            key: 'dirt'
        });

        this.makeRiver();
        this.placeTanks();

        let alignGrid = new AlignGrid({rows: 5, cols: 5, scene: this, width: Number(this.game.config.width), height: Number(this.game.config.height));
        alignGrid.showNumbers();

        alignGrid.placeAtIndex(2, this.tank1);
        alignGrid.placeAtIndex(22,this.tank2);
        
        
    }

    makeRiver(){
        let river = this.add.graphics();
        river.fillStyle(0x12E5E8, 1);

        const riverHeight = this.game.config.height * 0.2;
        river.fillRect(0,0, this.game.config.width, riverHeight);
        river.y = this.game.config.height / 2 - riverHeight/2;
    }

    placeTanks(){
        this.tank1 = this.add.image(0,0, "tank1");
        this.tank2 = this.add.image(0,0, "tank2");
    }

  

   


    update(){}
}