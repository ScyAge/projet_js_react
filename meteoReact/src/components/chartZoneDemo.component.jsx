import { useState } from "react"

import Chart   from 'chart.js/auto'
import { Bar } from "react-chartjs-2"


import '../assets/style/chartZone.style.css'

const LABELS = ['A','B','C','D','E','F','G']

const MIN_VALUE = -3;
const MAX_VALUE = 10;

// @return  entier aléatoire entre min et max
const randomInt = (min, max) => Math.floor( Math.random() * (max-min) + min )  
// @return une liste d'entiers aléatoires de même longueur que LABELS
const randomList = (min, max) => LABELS.map( label => randomInt(min, max))

const ChartZoneDemo = ( { meteoData , favoriteMeteoData } ) => {
    // @return le jeux de données (datasets) du graphique
    const buildData = ()  => {                                             
        return (
            {
                labels: LABELS,                                            // définit les étiquettes en abscisses
                datasets : [
                    {
                        label : 'LABEL DONNEES 1',                         // légende jeu de données 1 
                        data : randomList(MIN_VALUE,MAX_VALUE),            // valeurs jeu de données 1 (ici aléatoires)
                        backgroundColor: 'rgb(255,128,128)',               // couleur jeu de données 1 
                        borderColor: 'rgba(0, 0, 0, 0.5)',
                        borderWidth: 1
                    },
                    {
                        label : 'LABEL DONNEES 2',                         // légende jeu de données 2 
                        data : randomList(MIN_VALUE,MAX_VALUE),            // valeurs jeu de données 1 (ici aléatoires)
                        backgroundColor: 'gold',                           // couleur jeu de données 2
                        borderColor: 'rgba(0, 0, 0, 0.5)',
                        borderWidth: 1
                    },                                                     // etc. si besoin
                    {
                        label: 'test',
                        data: [10,10,10,10,10,10,10],
                        backgroundColor: 'blue',
                        borderColor: 'rgba(0, 0, 0, 0.5)',
                        borderWidth: 1
                    },
                ]  
            })
    }

    const [chartData, setChartData] = useState(buildData())               // gestion des jeux de données affichées dans une variable d'état


    const chart = <div className="chartZone">                             
                    <Bar                                                  // type de graphiques (ici des barres, d'autres types existent bien sûr)
                        data = { chartData }                              // les jeux de données gérés par la variable d'état
                        options =  { {
                                        scales: {
                                            y: {
                                                min : MIN_VALUE,          // valeur minimale axe des ordonnées
                                                max : MAX_VALUE,          // valeur maximale axe des ordonnées
                                            }                        
                                        },
                                        animation: {                      // paramètres effets d'animation lors des changements de valeur
                                            duration : 500,
                                            easing : 'easeIn'
                                        },
                                        plugins : {
                                            title: {
                                                display : true,
                                                text : 'TITRE DU GRAPHIQUE'  // titre du graphique
                                            }
                                        },
                                        legend: {
                                            labels: {
                                                fontSize: 14
                                            }
                                        }
                                    }
                        }
                    />
                  </div>

    const changeData = () => {
        setChartData(buildData())     // génère de nouvelles données aléatoires et met à jour la variable d'état
    }

    return (
        <div>          
            <button onClick = { () => changeData() }>CLIC pour générer nouvelles données aléatoires</button>   
            { chart }
        </div>
    )
}
export default ChartZoneDemo