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
        textAlign: 'left'
    },
    recipeDetailsTabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    recipeDetailsTabPanel: {
        width: '75%'
    },

    // RecipeIngredients & RecipeSteps
    rAvatarSmall: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        backgroundColor: red[500],
        marginRight: 10,
        cursor: 'pointer'
    },
    rDefault: {
        marginTop: theme.spacing(2),
    },
    rDeleteBtn: {
        cursor: 'pointer',
        color: 'red',
        marginRight: 10,

    },
    rDialog: {
        width: '65%',
        maxWidth: 'auto'
    },
    rArrow: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        backgroundColor: theme.palette.secondary.main,
        marginRight: 10,
        cursor: 'pointer'
    },
    rAvatar: {
        backgroundColor: theme.palette.primary.main,
        cursor: 'pointer',
        marginRight: 10
    },
    rList: {
        textTransform: "capitalize"
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
        marginBottom: '1rem',
    },
    rTableHead: {
        fontWeight: 'bold !important',
    },
    rTableBorderNone: {
        border: 'none !important'
    },
    rEditTable: {
        display: 'flex',
        alignItems: 'center'
    },

}));

export default { useStyles }