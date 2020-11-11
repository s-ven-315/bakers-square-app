import React, {useContext, useState} from "react"
import PropTypes from 'prop-types';
import { useStyles } from '../containers/styles'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import RecipeIngredients from './RecipeIngredients'
import RecipeSteps from './RecipeSteps'
import {DataContext} from "../contexts/Context";


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
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

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function RecipeDetails() {
    console.log("RecipeDetails() is rendered.")

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <div className={classes.recipeDetailsRoot}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.recipeDetailsTabs}
                >
                    <Tab label="Ingredients" {...a11yProps(0)} />
                    <Tab label="Recipe Steps" {...a11yProps(1)} />

                </Tabs>
                <TabPanel value={value} index={0}>
                    <RecipeIngredients/>
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <RecipeSteps />
                </TabPanel>

            </div>
        </>
    )
}