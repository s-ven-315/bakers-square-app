import React, { useState, useEffect, useContext } from "react"
import { useParams, useHistory, Redirect } from "react-router-dom"
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import RecipeDetails from '../components/RecipeDetails'
import { GetRecipe } from '../helpers'
import Comments from "../components/Comments"
import Likes from "../components/Likes"
import { useStyles } from "../containers/styles"
import { DataContext, emptyRecipe, emptyUser } from "../contexts/Context";
import RecipeCard from "../containers/RecipeCard";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
            style={{maxWidth: 720, margin: '0 auto'}}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};


export default function Recipe() {
    console.log("Recipe() is rendered.")

    const { recipeId } = useParams()
    const context = useContext(DataContext)
    const { authUser, recipe, setUser, isLoading, setLoading } = context

    const classes = useStyles();

    // change tab
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(()=> setLoading(true), [])

    useEffect(() => {
        if (context.recipe.id !== recipeId) {
            GetRecipe(context, recipeId)
        }
        if (context.user.userId) {
            setUser(emptyUser)
        }
    }, [recipeId])
    if (!authUser.access_token) {
        return <Redirect to="/" />
    }

    return (
        <>
            {!recipe.id ?
                ((isLoading)? null : <h1>Recipe not found</h1>) :
                <div style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'center', maxWidth: '1080px', margin: '0 auto' }}>
                    <RecipeCard recipe={recipe}
                        key={recipe.id}
                        hideComments={true}
                        hideEdit={false}
                    />
                    <div className="recipe-page-container-outer">
                        <Tabs
                            value={value}
                            className={classes.rTabs}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab label="The Recipe" />
                            <Tab label={`Likes (${recipe.likes.length} )`} />
                            <Tab label={`Comments (${recipe.comments.length} )`} />
                        </Tabs>
                        <TabPanel value={value} index={0} className='recipe-page-tab-panel'>
                            <RecipeDetails />
                        </TabPanel>
                        <TabPanel value={value} index={1} className='recipe-page-tab-panel'>
                            <Likes />
                        </TabPanel>
                        <TabPanel value={value} index={2} className='recipe-page-tab-panel'>
                            <Comments />
                        </TabPanel>
                    </div>
                </div>
            }
        </>
    )
}