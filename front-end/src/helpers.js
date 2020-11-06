import React from "react"
import axios from "axios"
import { useHistory, Redirect } from "react-router-dom"
import { useState } from "react"



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

export const EditRecipeName = (loggedIn, recipeId, input) => {
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
        })
        .catch(error => {
            console.error(error.response)
        })
}
export const Follow = (userId, loggedIn) => {
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
        })
        .catch(error => {
            console.error(error.response)
        })
}

export const Unfollow = (userId, loggedIn) => {
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
export const AddNewRecipe = (loggedIn, userId, input, setCreateOpen) => {

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
        })
        .catch(error => {
            console.error(error.response)
        })
}
export default { Like, Unlike, EditRecipeName, Follow, Unfollow, EditProfileName, AddNewRecipe }