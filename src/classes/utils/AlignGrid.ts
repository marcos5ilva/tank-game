interface Iconfig  {
    scene: any;
    rows: number;
    cols: number;
    width:number;
    height: number;
}

export default class AlignGrid{
    config: Iconfig;
    scene: any;
    cellWidth:number;
    cellHeight:number;
    graphics:(any);

    constructor(config:Iconfig){
        this.config = config;
        this.scene = config.scene;
        this.cellWidth = config.width / config.cols;
        this.cellHeight = config.height/config.rows;

    }

    show():void {
        this.graphics = this.scene.add.graphics();
        this.graphics.lineStyle(2, 0xff0000);

        //vertical lines
        for(let i=0; i<this.config.width; i+=this.cellWidth){
            this.graphics.moveTo(i,0);
            this.graphics.lineTo(i, this.config.height);
        }

        //horizontal lines
        for(let i=0; i<this.config.height; i+=this.cellHeight){
            this.graphics.moveTo(0,i);
            this.graphics.lineTo(this.config.width, i);
        }

        this.graphics.strokePath();
    }

    placeAt(x:number, y:number, obj: any){
        let xPosition = this.cellWidth * x + this.cellWidth / 2;
        let yPosition = this.cellHeight * y + this.cellHeight / 2;
        
        obj.x = xPosition;
        obj.y = yPosition;
    }

    placeAtIndex(index: number, obj: any){
        let yPosition = Math.floor(index/this.config.cols);
        let xPosition = index - (yPosition * this.config.cols);

        this.placeAt(xPosition, yPosition,obj);
    }

    showNumbers(){
        this.show();
        let count = 0;
        for (let i= 0 ; i<this.config.rows; i++){
            for( let j=0; j<this.config.cols; j++){
                let numText = this.scene.add.text(0,0, count, {color: '#ff0000'});
                numText.setOrigin(0.5, 0.5);
                this.placeAtIndex(count, numText);
                count ++;
            }
        }
    }
}