import React, { useEffect, useState } from "react";
import styles from './Section.module.css';
import { CircularProgress } from "@mui/material";
import  Card  from '../Card/Card';
import Carousel from "../Carousel/Carousel";
import Filters from "../Filters/Filters";

export default function Section ({title, data, filterSource, type}){
    const [carouselToggle, setCarouselToggle] = useState(true);
    const [filters, setFilters] = useState([{key: "all", label:"All"}]);
    const [selectedFilterIndex, setselectedFilterIndex] = useState(0);
    const handleToggle = () => {
        setCarouselToggle((prevState) => !prevState);
    }
    useEffect(() => {
        if (filterSource) {
            filterSource().then((response) => {
                const { data } = response;
                setFilters([...filters, ...data]);
            })
        }
    }, []);
    const showFilters = filters.length > 1;
    const cardsToRender = data.filter((card) => showFilters && selectedFilterIndex !== 0 ? card.genre.key === filters[selectedFilterIndex].key : card);
    return (
        <div>
            <div className={styles.header}>
                <h3>{title}</h3>
                <h4 className={styles.toggleText} onClick={handleToggle}>{!carouselToggle}</h4>
            </div>
            {
                showFilters && (
                    <div className={styles.filterWrapper}>
                        <Filters 
                            filters={filters}
                            selectedFilterIndex={selectedFilterIndex}
                            setselectedFilterIndex={setselectedFilterIndex}
                        />
                    </div>
                )
            }
            {data.length ===0 ? (<CircularProgress/>): (
                <div className={styles.cardWrapper}>
                    {!carouselToggle ? (
                        <div className={styles.wrapper}>
                            {data.map((ele) => (
                                <Card data={ele} type={type} />
                            ))}
                 
                        </div>
                    ): <Carousel data={cardsToRender}
                    renderComponent={(data) => <Card data={data} type={type} />} />}

                </div>
            )}
        </div>
    )
}