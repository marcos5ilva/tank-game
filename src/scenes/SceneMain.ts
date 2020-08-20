import Phaser, { Scene, Game } from 'phaser';
import AlignGrid from '../classes/utils/AlignGrid';
import TiledBackground from '../classes/comps/TiledBackground';
import dirtImage from '../../public/images/main/dirt.png';
import tank1Image from '../../public/images/main/tank1.png';
import tank2Image from '../../public/images/main/tank2.png';
import smokeImage from '../../public/images/main/smoke.png';
import bulletImage1 from '../../public/images/main/bullet1.png';
import bulletImage2 from '../../public/images/main/bullet2.png';
import Align from '../classes/utils/Align';


export default class SceneMain extends Phaser.Scene{

    tank1:any;
    tank2:any;
    alignGrid: AlignGrid;

    constructor(){
        super('SceneMain');
    }

    preload(){
            this.load.image('dirt', dirtImage);
            this.load.image('tank1',tank1Image);
            this.load.image('tank2', tank2Image);
            this.load.image( 'smoke', smokeImage);
            this.load.image('bullet1', bulletImage1);
            this.load.image('bullet2', bulletImage2);
    }
    create(){
        console.log("Ready!")
        let background = new TiledBackground({
            scene: this,
            key: 'dirt'
        });

        this.makeRiver();
        this.placeTanks();

        this.alignGrid = new AlignGrid({rows: 5, cols: 5, scene: this, width: Number(this.game.config.width), height: Number(this.game.config.height));
        this.alignGrid.showNumbers();

       this. alignGrid.placeAtIndex(22, this.tank1);
        this.alignGrid.placeAtIndex(2,this.tank2);
        
        this.input.on('pointerdown',this.clicked, this);
        
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

    clicked(){
        console.log('clicked!');
       this.showBullet(this.tank1, this.tank2);
    }

    tankHit(tank: any){
        let targetY: string|number = 0;
        let rotationAngle = Math.floor(Math.random()*90) - 45;

        if(tank == this.tank1){
            targetY = this.game.config.height;
        }
        this.tweens.add({
            targets: tank,
            duration:300,
            y: targetY,
            angle: rotationAngle
        })
    }

    showSmoke(tank: any){
        let smoke = this.add.image(0,0,'smoke');
        Align.scaleToGameWidth(smoke, 0.2, this);
        let targetY: number| string = 0;

        if(tank.y == this.tank2){
            this.alignGrid.placeAtIndex(7,smoke);
            targetY = this.game.config.height;
        } else{
            this.alignGrid.placeAtIndex(17,smoke);
            this.tweens.add({
                targets: smoke, 
                duration:1500,
                y: targetY,
                scaleX:0,
                scaleY:0,
                alpha:0
            })
        }
    }

    showBullet(firedTank:any, hitTank: any){
        let positionY = hitTank.y;
        let bulletKey: string;
        let startY:any;
        let bullet: any;
        let angle:number|string;
        let scope: any;

        this.showSmoke(firedTank);
        let tankY = hitTank.y;

        if(firedTank == this.tank2){
            bulletKey="bullet2";
            startY = firedTank.y + firedTank.displayHeight/2;
            angle = 180;
        }else{
             bulletKey="bullet1";
             startY = firedTank.y - firedTank.displayHeight/2;
             angle = 0;
        }

        let bullet = this.add.image(firedTank.x, startY, bulletKey);
        bullet.angle = angle;
        Align.scaleToGameWidth(bullet, 0.06, this);

        this.tweens.add({
            targets: bullet,
            duration:400,
            y:tankY,
            onComplete: this.onBulleteComplete,
            onCompleteParams:[{hitTank, scope: this}]
        })
        
    }

    onBulleteComplete(tween: any, targets:any, custom: any){
      custom.scope.tankHit(custom.tank);
      targets[0].destroy();
    }

  

   


    update(){}
}