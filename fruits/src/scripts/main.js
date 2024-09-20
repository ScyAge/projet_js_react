
// importation de la classe Game.js
import Game from './game.js';


// mise en place de l'action des clics sur les boutons + les gestionnaires du clavier pour contrôler Greedy
const init = () => {
   const canvas = document.getElementById("playfield");
   const game = new Game(canvas);
   window.addEventListener('keydown', game.keyDownActionHandler.bind(game));
   window.addEventListener('keyup', game.keyUpActionHandler.bind(game));
   document.getElementById("stopAndStartGame").addEventListener("click",()=> game.playPause());
   document.getElementById("endgame").addEventListener("click",()=> game.endgame());
}

window.addEventListener("load", init);

//
console.log('le bundle a été généré');
