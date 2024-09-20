import Element_mouvement from "./element_mouvement";
import GreedyImg from "../assets/images/greedy.png"
export default class Greedy extends Element_mouvement{
    constructor(x,y) {
        super(x,y,GreedyImg,5,5);
        this.pv = 3;
    }

    moveLeft() {
        this.deltaX = this.deltaX - 10;   // le déplacement se fera vers la gauche, par pas de 10px
    }
    moveRight() {
        this.deltaX = this.deltaX + 10;   // le déplacement se fera vers la droite, par pas de 10px
    }
    moveUp(){
        this.deltaY = this.deltaY - 10;
    }
    moveDown(){
        this.deltaY = this.deltaY + 10;
    }

    stopMoving() {
        this.deltaX = 0;
        this.deltaY = 0;
    }

    handleMoveKeys(keyManager) {
        this.stopMoving();    // on réinitialise les déplacements
        if (keyManager.left)  // touche flèche gauche pressée ?
            this.moveLeft();
        if (keyManager.right) // touche flèche droite pressée ?
            this.moveRight();
        if(keyManager.up)
            this.moveUp();
        if(keyManager.down)
            this.moveDown();

    }

}