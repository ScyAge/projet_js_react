

export default class Element{
    constructor(x,y,image) {
        this.x = x;
        this.y = y;
        this.image = this.#createImage(image);
    }

    /* crée l'objet Image à utiliser pour dessiner notre élément */
    #createImage(imageSource) {
        const newImg = new Image();
        newImg.src = imageSource;
        return newImg;
    }
    placementAlea(width,height){
        this.x = Math.floor(Math.random() * (width-this.width));
        this.y = Math.floor(Math.random() * (height-this.height));
    }

    get xCoord(){
        return this.x;
    }
    get yCoord(){
        return this.y;
    }

    get width() {
        return this.image.width;
    }
    get height() {
        return this.image.height;
    }

    draw(context) {
        context.drawImage(this.image,this.x,this.y);
    }

    collisionWith(element){
        const A1 = [element.x,element.y];
        const A2 = [element.x+element.width,element.y+element.height];
        const P1 = [Math.max(A1[0],this.x),Math.max(A1[1],this.y)];
        const P2 = [Math.min(A2[0],this.x+this.width),Math.min(A2[1],this.y+this.height)];
        return (P1[0] < P2[0]) && (P1[1] < P2[1]);
    }
}