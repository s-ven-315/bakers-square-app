import React, {useContext} from "react"
import Button from '@material-ui/core/Button';
import {Redirect} from "react-router-dom";
import {DataContext} from "../contexts/Context";


const Homepage = () => {
    console.log("Homepage() is rendered.")
    const context = useContext(DataContext)
    const {authUser} = context

    if (authUser.access_token) {
        return <Redirect to={`/users/${authUser.userId}`} />
    }
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