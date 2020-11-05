import React, { useState } from "react"
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import RecipeIngredients from './RecipeIngredients'
import RecipeTools from './RecipeTools'
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

const useStyles = makeStyles((theme) => ({
    root: {
        width: '76vw',
        margin: 'auto',
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 224,
        textAlign: 'left'
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));
export default function RecipeDetails() {
    const [ingrList, setIngrList] = useState(['flour', 'sugar', 'chocolate', 'strawberry', 'milk', 'butter', 'eggs'])
    const [toolList, setToolList] = useState(['Oven', 'Rolling Pin', '12-inch Baking Mold', 'Mixer', 'Blender'])
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    // like dialog
    const [likeOpen, setLikeOpen] = React.useState(false);

    const handleLikeOpen = () => {
        setLikeOpen(true);
    };

    const handleLikeClose = (value) => {
        setLikeOpen(false);
    };
    return (
        <>
            {/* <div className='component-container'>
                <div className='component-title'>Ingredients</div>
                <div classname='component-body'></div>
            </div> */}
            <div className={classes.root}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    <Tab label="Ingredients" {...a11yProps(0)} />
                    <Tab label="Tools & Equipments" {...a11yProps(1)} />
                    <Tab label="Recipe Steps" {...a11yProps(2)} />

                </Tabs>
                <TabPanel value={value} index={0}>
                    <RecipeIngredients ingrList={ingrList} setIngrList={setIngrList} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <RecipeTools toolList={toolList} setToolList={setToolList} />

                </TabPanel>
                <TabPanel value={value} index={2}>
                    <ol>
                        <li>Blend the chocolate</li>
                        <li>Cut strawberries</li>
                        <li>Break the eggs</li>
                        <li>Mix the mixture</li>
                        <li>Make Dough</li>
                        <li>Put in Oven</li>
                        <li>Wait!</li>
                    </ol>
                </TabPanel>

            </div>
        </>
    )
}