import Element from "./element";

export default class Element_mouvement extends Element {
    constructor(x,y,image,deltaX,deltaY) {
        super(x,y,image);
        this.deltaX = deltaX;
        this.deltaY = deltaY;
    }

    move(box) {
        this.x = Math.max(0, Math.min(box.width - this.width, this.x + this.deltaX));
        this.y = Math.max(0, Math.min(box.height - this.height, this.y + this.deltaY));
    }

}