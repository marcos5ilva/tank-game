export default class Align{

    static scaleToGameWidth(obj: any, percentage: number, scene: any){
        obj.displayWidth = scene.game.config.width * percentage;
        obj.scaleY = obj.scaleX;
    }

    static centerHorizontally(obj: any, scene: any){
        obj.x = scene.game.config.width / 2;
    }

    static centerVertically(obj: any, scene: any){
        obj.y = scene.game.config.height / 2;
    }

    static center(obj: any, scene: any){
        obj.x = scene.game.config.width / 2;
        obj.y = scene.game.config.height / 2;
    }
}