import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors'


export const useStyles = makeStyles((theme) => ({
    //Profile
    root: {
        flexGrow: 1,
        backgroundColor: "#fff",
        border: theme.palette.secondary.main,
    },
    //Recipe

    recipeRoot: {
        flexGrow: 1,
    },
    recipeEdit: {
        marginLeft: 10,
        cursor: 'pointer',
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

    // RecipeIngredients & RecipeSteps
    rAvatarSmall: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        backgroundColor: red[500],
        marginRight: 10,
        cursor: 'pointer'
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
    //Your Recipe
    yRSpan: {
        marginLeft: 5,
    },
    yRSutton: {
        marginTop: '1rem',
    }
}));

export default { useStyles }