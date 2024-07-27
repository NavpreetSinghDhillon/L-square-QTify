import React, { useEffect, useState } from "react";
import { useSwiper } from "swiper/react";
import styles from './CarouselRightNavigation.module.css'
import { ReactComponent as RightArrow } from "../assets/RightArrow.svg"

export default function CarouselRightNavigation() {
    const swiper = useSwiper();
    const [isBeginning, setIsBeginning] = useState(swiper.isBeginning);

    useEffect(() => {
        swiper.on("slideChange", function(){
            setIsBeginning(swiper.isBeginning);
        });
    }, []);
    return(
        <div className={styles.rightNavigation}>
            {!isBeginning && <RightArrow onClick={() => swiper.slidePrev()} />}
        </div>
    )
}