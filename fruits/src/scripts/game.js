import Greedy from "./element/greedy";
import KeyManager from "./keyManager";
import Fruits from "./element/fruits";
import ananasImg from "./assets/images/ananas.png"
import pommeImg from "./assets/images/pomme.png"
import citronImg from "./assets/images/citron.png"
import Hungries from "./element/hungries";

export default class Game {

    #canvas;
    #greedy;
    requette;

    constructor(canvas) {
        this.#canvas = canvas;
        this.#greedy = new Greedy(this.canvas.width / 2, this.canvas.height / 2);
        this.requette = null;
        this.keymanager = new KeyManager();
        this.fruits = [];
        this.timer = null;
        this.hungrys = []
        this.hungrys_fruit_eaten = 0;
    }

    /** donne accès au canvas correspondant à la zone de jeu */
    get canvas() {
        return this.#canvas;
    }

    get greedy() {
        return this.#greedy;
    }

    play() {
        //get context and clear context
        const context = this.canvas.getContext('2d');
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //ajout hungry and calcul target
        this.spawn_hungry();
        this.hungry_target();

        //move of all element
        this.greedy.handleMoveKeys(this.keymanager);
        this.greedy.move(this.canvas);
        this.hungrys.forEach(hungry => hungry.move(this.canvas))

        //collision
        this.fruits = this.fruits.filter(fruit => !this.greedy_collision_fruits(fruit));
        this.fruits = this.fruits.filter(fruit => !this.hungry_collision_fruits(fruit));
        this.hungrys = this.hungrys.filter(hungry => !this.greedy_collision_hungry(hungry));

        //check for each hungry if the fruit he target is always here and recall hungry_target for the fruit who don't have target anymore;
        this.hungrys.forEach(hungry => this.fruit_always_here(hungry));
        this.hungry_target();

        //draw of all element
        this.greedy.draw(context);
        this.fruits.forEach(fruit => fruit.draw(context));
        this.hungrys.forEach(hungry => hungry.draw(context));

        if(this.greedy.pv <= 0){
            this.endgame();
        }
        else {
            this.requette = window.requestAnimationFrame(() => this.play());
        }
    }

    playPause() {
        if (this.requette != null) {
            window.cancelAnimationFrame(this.requette);
            clearInterval(this.timer);
            this.timer = null;
            this.requette = null;

        } else {
            this.play();
            this.timer = setInterval(() => this.spawn_fruit(), 1000);
            this.spawn_hungry();
        }
    }

    keyDownActionHandler(event) {
        switch (event.key) {
            case "ArrowLeft":
            case "Left":
                this.keymanager.leftPressed();
                break;
            case "ArrowRight":
            case "Right":
                this.keymanager.rightPressed();
                break;
            case "ArrowUp":
            case "Up":
                this.keymanager.upPressed();
                break;
            case "ArrowDown":
            case "Down":
                this.keymanager.downPressed();
                break;
            default:
                return;
        }
        event.preventDefault();
    }

    keyUpActionHandler(event) {
        switch (event.key) {
            case "ArrowLeft":
            case "Left":
                this.keymanager.leftReleased();
                break;
            case "ArrowRight":
            case "Right":
                this.keymanager.rightReleased();
                break;
            case "ArrowUp":
            case "Up":
                this.keymanager.upReleased();
                break;
            case "ArrowDown":
            case "Down":
                this.keymanager.downReleased();
                break;
            default:
                return;
        }
        event.preventDefault();
    }

    spawn_fruit() {
        const AllFruits = [ananasImg, pommeImg, citronImg];
        const fruitIMG = AllFruits[Math.floor(Math.random() * AllFruits.length)];
        const fruit = new Fruits(fruitIMG);
        fruit.placementAlea(this.canvas.width,this.canvas.height);
        this.fruits.push(fruit);
        setTimeout(() => this.#despawn_fruit(fruit), 8000);
    }

    #despawn_fruit(fruit_a_sup) {
        this.fruits = this.fruits.filter(fruit => fruit !== fruit_a_sup);
    }

    greedy_collision_fruits(fruit) {
        if (fruit.collisionWith(this.greedy)) {
            const score = document.getElementById("score")
            score.innerText = (parseInt(score.innerText) + 100).toString();
            return true;
        }
        return false;
    }
    greedy_collision_hungry(hungry){
        if(hungry.collisionWith(this.greedy)){
            this.greedy.pv -=1;
            if(this.greedy.pv <= 0){
                alert("GAME OVER , press ok to start a new game");
            }
            else {
                const baliseIMG = document.querySelectorAll('img');
                baliseIMG[this.greedy.pv - 1].style.display = 'none';
            }
            return true
        }
        return false;
    }
    hungry_collision_fruits(fruit){
        if(this.hungrys.some(hungry => hungry.collisionWith(fruit))){
            this.hungrys_fruit_eaten +=1;
            return true;
        }
        return false;
    }

    spawn_hungry() {
        if (this.hungrys.length === 0) {
            const h = new Hungries();
            h.placementAlea(this.canvas.width,this.canvas.height);
            this.hungrys.push(h);
        } else {
            if (this.hungrys_fruit_eaten === 7) {
                this.hungrys_fruit_eaten = 0;
                const h = new Hungries()
                h.placementAlea(this.canvas.width,this.canvas.height);
                this.hungrys.push(h);
            }

        }
    }

    hungry_target() {
        this.hungrys.forEach(hungry => {
            if (this.fruits.length > 0) {
                if(hungry.prec_is_greedy){
                    hungry.target = null;
                    hungry.prec_is_greedy = false;
                }
                if (hungry.target === null) {
                    const alea = Math.floor(Math.random() * (this.fruits.length));
                    hungry.calcul_target(this.fruits[alea]);
                }
            } else {
                hungry.calcul_target(this.greedy);
                hungry.prec_is_greedy = true;
            }
        })
    }
    fruit_always_here(hungry){
        if(!this.fruits.includes(hungry.target)){
            hungry.target = null;
        }
    }

    endgame(){
        window.cancelAnimationFrame(this.requette);
        clearInterval(this.timer);
        this.timer = null;
        this.requette = null;
        document.querySelectorAll('img').forEach(img => img.style.display = 'initial');
        this.#greedy = new Greedy(this.canvas.width / 2, this.canvas.height / 2);
        this.fruits = [];
        this.hungrys = [];
        document.getElementById("score").innerText = "0";
        this.keymanager = new KeyManager();
        this.canvas.getContext("2d").clearRect(0,0,this.canvas.width,this.canvas.height);

    }


}



