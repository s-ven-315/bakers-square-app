import axios from "axios"
import {useContext, useEffect} from "react";
import {DataContext} from "./contexts/Context";
import {useHistory} from "react-router-dom";


const config = (authUser) => ({headers: {Authorization: "Bearer " + authUser.access_token}})
export const axiosGet = (url, authUser) => axios.get(url, config(authUser))
export const axiosPost = (url, authUser, data) => axios.post(url, data, config(authUser))


export const GetRecipe = (context, recipeId) => {
    const {authUser, setRecipe} = context

    const url = "http://localhost:5000/api/recipes/" + recipeId
    axiosGet(url, authUser)
        .then((response) => {
            const data = response.data.data
            setRecipe(data)
        })
        .catch((error) => {
            console.log(error)
        })
}

export const GetUser = (context, userId) => {
    const {authUser, setAuthUser, setUser} = context

    const url = "http://localhost:5000/api/users/" + userId
    axiosGet(url, authUser)
            .then((response) => {
                console.log(response)
                setUser(response.data.data)
                if (userId === authUser.userId){
                    setAuthUser({...response.data.data, 'access_token': authUser.access_token})
                }
            })
            .catch((error) => {
                console.log(error)
            })
}



export const Like = (context, setLikeTo, recipe, setLikes) => {
    const {authUser} = context
    const url = (setLikeTo)?
        `http://localhost:5000/api/users/${authUser.userId}/like` :
        `http://localhost:5000/api/users/${authUser.userId}/unlike`

    const oldLikes = {...recipe.likes}
    const newLikes = (setLikeTo) ? [{
        email: authUser.email,
        img_url: authUser.img_url,
        name: authUser.name,
        userId: authUser.userId,
        type: "User",
    }, ...recipe.likes] : recipe.likes.filter(l => l.userId !== authUser.userId)

    setLikes(newLikes)

    axiosPost(url, authUser, {'recipeId': recipe.id})
        .then(response => {
            console.log(response)
            if (context.user.userId) {
                GetUser(context, context.user.userId)
            }
        })
        .catch(error => {
            console.error(error.response)
            setLikes(oldLikes)
        })
}


export const EditRecipeName = (context, name, setOpen) => {
    const {authUser, recipe, setRecipe} = context

    const url = `http://localhost:5000/api/recipes/${recipe.id}/edit`
    axiosPost(url, authUser, {name})
        .then(response => {
            console.log(response)
            recipe.name = name
            setRecipe(recipe)
            setOpen(false)
        })
        .catch(error => {
            console.error(error.response)
        })
}
export const Follow = (context, setFollowTo) => {
    const {authUser, setAuthUser, user, setUser} = context

    const url = (setFollowTo) ?
        `http://localhost:5000/api/users/${authUser.userId}/subscribe` :
        `http://localhost:5000/api/users/${authUser.userId}/unsubscribe`

    axiosPost(url, authUser, {'userId': user.userId})
        .then(response => {
            const data = response.data.data
            authUser.followers = data.from_user.followers
            setAuthUser({...authUser})

            user.followers = data.to_user.followers
            setUser({...user})
        })
        .catch(error => {
            console.error(error.response)
        })
}

export const EditProfileName = (context, name, setOpen) => {
    const {authUser, setAuthUser} = context

    const url = `http://localhost:5000/api/users/${authUser.userId}/edit`
    axiosPost(url, authUser, {name})
        .then(response => {
            const msg = response.data.msg
            console.log("EditProfileName then()"+ msg)
            authUser.name = name
            setAuthUser({...authUser})
            setOpen(false)
        })
        .catch(error => {
            console.error(error.response)
        })
}
export const AddNewRecipe = (context, name, setOpen, history) => {
    const {authUser} = context

    const goToRecipePage = (recipeId) => {
        history.push(`/recipes/${recipeId}`)
    }

    const getLastRecipeId = () => {
        const url = "http://localhost:5000/api/users/" + authUser.userId
        axiosGet(url, authUser)
            .then((response) => {
                console.log(response)
                let recipeId = response.data.data.recipes[response.data.data.recipes.length - 1].id
                goToRecipePage(recipeId)
            })
    }

    const url = 'http://localhost:5000/api/recipes/'
    axiosPost(url, authUser, {'userId': authUser.userId, 'name': name})
        .then(response => {
            console.log(response)
            setOpen(false)
            getLastRecipeId()
            GetUser(context, context.authUser.userId)
        })
        .catch(error => {
            console.error(error.response)
        })
}

export const DeleteRecipe = (context, recipe, history, isRedirect) => {
    const {authUser} = context
    const url = `http://localhost:5000/api/recipes/${recipe.id}/delete`
    axiosPost(url, authUser, {})
        .then(response => {
            console.log(response)
            if (isRedirect) {
                history.push(`/users/${context.authUser.userId}`)
            } else {
                GetUser(context, context.user.userId)
            }
        })
}


export const SaveRecipeSteps = (context, tempList) => {
    const {authUser, recipe} = context
    const url = `http://localhost:5000/api/recipes/${recipe.id}/steps`
    axiosPost(url, authUser, {steps: tempList})
        .then(response => {
            console.log(response)
            GetRecipe(context, recipe.id)
        })
        .catch(error => {
            console.error(error.response)
            })
}