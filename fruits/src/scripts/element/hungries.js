import Element_mouvement from "./element_mouvement";
import HungriesImage from "../assets/images/hungry.png"
export default class Hungries extends Element_mouvement{
    #nb_fruit_eaten;
    constructor(x = 0,y = 0,deltaX,deltaY) {
        super(x,y,HungriesImage,deltaX = 2,deltaY = 2);
        this.#nb_fruit_eaten = 0
        this.target = null;
        this.prec_is_greedy = false;
    }

    calcul_target(target){
        this.target = target;
        const dist = Math.sqrt((this.x-target.x)**2+(this.y-target.y)**2);
        this.deltaX = (target.x - this.x)/dist;
        this.deltaY = (target.y - this.y)/dist;
    }
    get nb_fruit_eaten(){
        return this.#nb_fruit_eaten;
    }

    set nb_fruit_eaten_plus_x(x){
        this.#nb_fruit_eaten +=x;
    }
}