import axios from "axios"

export const Like = (recipeId, loggedIn) => {
    axios({
        method: 'POST',
        url: `http://localhost:5000/api/users/${loggedIn.userId}/like`,
        headers: {
            Authorization: "Bearer " + loggedIn.access_token
        },
        data: {
            'recipeId': recipeId
        }
    })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.error(error.response)
        })
}

export const Unlike = (recipeId, loggedIn) => {
    axios({
        method: 'POST',
        url: `http://localhost:5000/api/users/${loggedIn.userId}/unlike`,
        headers: {
            Authorization: "Bearer " + loggedIn.access_token
        },
        data: {
            'recipeId': recipeId
        }
    })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.error(error.response)
        })
}

export default { Like, Unlike }