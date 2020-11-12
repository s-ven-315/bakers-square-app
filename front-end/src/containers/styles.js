import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors'


export const useStyles = makeStyles((theme) => ({
    //Profile
    root: {
        flexGrow: 1,
        backgroundColor: "#fff",
        border: theme.palette.secondary.main,
    },
    pTabs: {
        padding: '0px'
    },
    //Recipe

    recipeRoot: {
        flexGrow: 1,
    },
    recipeEdit: {
        marginLeft: 10,
        cursor: 'pointer',
    },
    rTabs: {
        justifyContent: 'left !important'
    },

    //RecipeDetails
    recipeDetailsRoot: {
        width: '76vw',
        margin: 'auto',
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 224,
        textAlign: 'left',
        "@media screen and (max-width: 767px)": {
            display: 'none'
        }
    },
    recipeDetailsTabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    recipeDetailsTabPanel: {
        width: '80%'
    },
    recipeDetailsMobile: {
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        "@media screen and (min-width: 768px)": {
            display: 'none'
        }
    },
    // RecipeIngredients & RecipeSteps
    rDefault: {
        marginTop: theme.spacing(2),
    },
    rDeleteBtn: {
        cursor: 'pointer',
        color: 'red',
        marginRight: 10,
        verticalAlign: 'middle'
    },
    rDialog: {
        width: '65%',
        maxWidth: 'auto'
    },
    rMargin: {
        margin: theme.spacing(1),
    },
    rButtonDiv: {
        display: "flex",
        justifyContent: "space-between"
    },
    rButton: {
        width: "100%",
    },
    rButtonClose: {
        width: "100%",
        backgroundColor: red[500],
        color: "white"
    },
    rForm: {
        width: '30rem'
    },
    rQty: {
        width: '3.5rem',
        marginLeft: '1rem !important',
        marginRight: '1rem !important'
    },
    rRemark: {
        width: '6rem',
        marginLeft: '1rem !important',
        marginRight: '1rem !important'
    },
    rShrink: {
        transform: 'translate(0, 1.1rem) scale(0.75)!important'
    },
    rAddBtn: {
        cursor: 'pointer',
        color: theme.palette.primary.main,
        fontSize: '2rem'
    },
    //Your Recipe
    yRSpan: {
        marginLeft: 5,
    },
    yRButton: {
        height: '36px',
        margin: 'auto 0',
    },
    //Comments
    cInput: {
        width: '70%',
        marginTop: '1rem',
        marginRight: '1rem !important'
    },
    cAvatar: {
        cursor: 'pointer'
    },
    //navbar
    nButton: {
        display: 'block',
        width: '100%'
    },
    //RecipeIngredients&RecipeStep Table
    rTable: {
        textAlign: 'left !important',
    },
    rTableHead: {
        fontWeight: 'bold !important',
    },
    rTableTd: {
        border: 'none !important',
        width: ' 10px'
    },
    rTableTh: {
        border: 'none !important',
        wordBreak: 'break-word',
        textAlign: 'left !important',
        textTransform: "initial"

    },
    rEditTable: {
        display: 'flex',
        alignItems: 'center'
    },
    // Accordion
    aDetails: {
        overflowY: 'auto'
    },

}));

export default { useStyles }