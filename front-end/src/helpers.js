import axios from "axios"



export const Like = (recipeId, loggedIn, like, setLike) => {
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
            setLike(true)
        })
        .catch(error => {
            console.error(error.response)
        })
}

export const Unlike = (recipeId, loggedIn, unlike, setUnlike) => {
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
            setUnlike(true)
        })
        .catch(error => {
            console.error(error.response)
        })
}

export const EditRecipeName = (loggedIn, recipeId, input, setRecipe, recipe, setEditOpen) => {
    axios({
        method: 'POST',
        url: `http://localhost:5000/api/recipes/${recipeId}/edit`,
        headers: {
            Authorization: "Bearer " + loggedIn.access_token
        },
        data: {
            'name': input
        }
    })
        .then(response => {
            console.log(response)
            recipe.name = input
            setRecipe(recipe)
            setEditOpen(false)
        })
        .catch(error => {
            console.error(error.response)
        })
}
export const Follow = (userId, loggedIn, followers, setFollowers) => {
    axios({
        method: 'POST',
        url: `http://localhost:5000/api/users/${loggedIn.userId}/subscribe`,
        headers: {
            Authorization: "Bearer " + loggedIn.access_token
        },
        data: {
            'userId': userId
        }
    })
        .then(response => {
            console.log(response)
            setFollowers(followers)
        })
        .catch(error => {
            console.error(error.response)
        })
}

export const Unfollow = (userId, loggedIn, followers, setFollowers) => {
    axios({
        method: 'POST',
        url: `http://localhost:5000/api/users/${loggedIn.userId}/unsubscribe`,
        headers: {
            Authorization: "Bearer " + loggedIn.access_token
        },
        data: {
            'userId': userId
        }
    })
        .then(response => {
            console.log(response)
            setFollowers(followers)
        })
        .catch(error => {
            console.error(error.response)
        })
}
export const EditProfileName = (loggedIn, userId, input) => {
    axios({
        method: 'POST',
        url: `http://localhost:5000/api/users/${userId}/edit`,
        headers: {
            Authorization: "Bearer " + loggedIn.access_token
        },
        data: {
            'name': input
        }
    })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.error(error.response)
        })
}
export const AddNewRecipe = (loggedIn, userId, input, setCreateOpen, history) => {
    const goToRecipePage = (recipeId) => {
        history.push(`/recipes/${recipeId}`)
    }

    const getLastRecipeId = () => {
        axios.get("http://localhost:5000/api/users/" + userId, {
            headers: {
                Authorization: "Bearer " + loggedIn.access_token
            }
        })
            .then((response) => {
                console.log(response)
                let recipeId = response.data.data.recipes[response.data.data.recipes.length - 1].id
                goToRecipePage(recipeId)
            })
    }

    axios({
        method: 'POST',
        url: 'http://localhost:5000/api/recipes/',
        headers: {
            Authorization: "Bearer " + loggedIn.access_token
        },
        data: {
            'userId': userId,
            'name': input
        }
    })
        .then(response => {
            console.log(response)
            setCreateOpen(false)
            getLastRecipeId()
        })
        .catch(error => {
            console.error(error.response)
        })
}
export default { Like, Unlike, EditRecipeName, Follow, Unfollow, EditProfileName, AddNewRecipe }