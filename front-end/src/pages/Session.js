import React, {useState, useEffect, useContext} from "react"
import axios from "axios"
import {Redirect, useParams, useHistory} from "react-router-dom"
// import Swiper core and required components
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import {DataContext, emptyUser} from "../contexts/Context";
import {GetRecipe} from "../helpers";

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default function Session() {
    console.log("Session() is rendered.")

    const context = useContext(DataContext)
    const {authUser, setUser, recipe} = context

    const history = useHistory()
    const { recipeId } = useParams()
    const steps = recipe.steps

    useEffect(() => {
        if (context.recipe.id !== recipeId){
            GetRecipe(context, recipeId)
        }
        if (context.user.userId){
            setUser(emptyUser)
        }
    }, [recipeId])

    if (!authUser.access_token) {
        return <Redirect to="/" />
    }

    return (
        (steps.length === 0)? null :
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{
                    renderBullet: function(index, className) {return '<span class="' + className + '">' + (index + 1) + '</span>'},
                    clickable: true
                }}
            >
                {steps.map((step, idx) => (
                    <SwiperSlide>
                        <div className="step-recipe-name" onClick={()=> history.push(`/recipes/${recipeId}`)}>{recipe.name}</div>
                        <div className="step-no">Step {idx + 1} of {steps.length}</div>
                        <div className="step-text">{step.text}</div>
                        <div/>
                    </SwiperSlide>
                ))}
            </Swiper>
    );
};