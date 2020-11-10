import axios from "axios"



export const Like = (recipeId, loggedIn, setLikeTo, likes, setLikes) => {
    const url = (setLikeTo)?
        `http://localhost:5000/api/users/${loggedIn.userId}/like` :
        `http://localhost:5000/api/users/${loggedIn.userId}/unlike`

    const oldLikes = [...likes]
    const newLikes = (setLikeTo) ? [{
        email: loggedIn.email,
        img_url: loggedIn.img_url,
        name: loggedIn.name,
        userId: loggedIn.userId,
        type: "User",
    }, ...likes] : likes.filter(l => l.userId !== loggedIn.userId)
    setLikes(newLikes)

    axios({
        method: 'POST',
        url: url,
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
            setLikes(oldLikes)
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
export const Follow = (userId, loggedIn, setFollowTo, user, setUser) => {
    const url = (setFollowTo) ?
        `http://localhost:5000/api/users/${loggedIn.userId}/subscribe` :
        `http://localhost:5000/api/users/${loggedIn.userId}/unsubscribe`

    axios({
        method: 'POST',
        url: url,
        headers: {
            Authorization: "Bearer " + loggedIn.access_token
        },
        data: {
            'userId': userId
        }
    })
        .then(response => {
            const data = response.data.data
            console.log(data.followers)
            user.followers = data.followers
            setUser({...user})
        })
        .catch(error => {
            console.error(error.response)
        })
}

export const EditProfileName = (loggedIn, name, setName, user, setUser, setOpen) => {
    console.log(name)
    axios({
        method: 'POST',
        url: `http://localhost:5000/api/users/${user.userId}/edit`,
        headers: {
            Authorization: "Bearer " + loggedIn.access_token
        },
        data: {
            'name': name,
        }
    })
        .then(response => {
            const msg = response.data.msg
            console.log("EditProfileName then()"+ msg)
            user.name = name
            setUser({...user})
            setOpen(false)
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

export const DeleteRecipe = (loggedIn, recipeId, setDeleted) => {
    axios({
        method: 'POST',
        url: `http://localhost:5000/api/recipes/${recipeId}/delete`,
        headers: {
            Authorization: "Bearer " + loggedIn.access_token
        },
        data: {
        }
    }).then(response => {
        console.log(response)
        setDeleted(true)
    })
    setDeleted(false)
}
export default { Like, EditRecipeName, Follow, EditProfileName, AddNewRecipe, DeleteRecipe }