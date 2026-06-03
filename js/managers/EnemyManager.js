import { Enemy } from "../entities/Enemy.js";
import { enemyData } from "../data/enemyData.js";

export class EnemyManager{
    constructor(){
        this.enemy = new Enemy(enemyData.drifter);
    }

    spawn(x, y){
        this.enemy.spawn(x, y)
    }

    getActiveEnemies(){
        return [this.enemy];
    }
}