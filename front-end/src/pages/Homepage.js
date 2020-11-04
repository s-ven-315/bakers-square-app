import React from "react"
import Button from '@material-ui/core/Button';


const Homepage = () => {
    return (
        <>
            <div className="banner-container">
                <div className="banner">
                </div>
                <div className="banner-text-container">
                    <div>
                        <h1 className="banner-text">Get your chef hat on!</h1>
                        <Button href="/signup" variant="contained" color="primary">Get Started</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Homepage