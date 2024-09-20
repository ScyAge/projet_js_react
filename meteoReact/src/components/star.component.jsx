import {useEffect, useState} from "react";
import StarOn from "../assets/images/star_on.png";
import StarOff from "../assets/images/star_off.png";

const StarComponent = ({actualCity, handleChangeStarCp, stateStared}) => {
    const [on, setOn] = useState(false);

    useEffect(() => setOn(stateStared.find(city => actualCity.city === city.city_name).stared), [actualCity]);

    const handleChangeStar = event => {
        setOn(prevState => !prevState);
        handleChangeStarCp(actualCity);
    };

    return (
        <img src={on ? StarOn : StarOff} onClick={handleChangeStar} alt={on ? StarOn : StarOff}/>
    );
}
export default StarComponent;