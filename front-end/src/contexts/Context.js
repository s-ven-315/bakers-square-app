import React, {createContext, useEffect, useState} from "react"


export const emptyUser = {
    userId: '',
    name: '',
    email: '',
    access_token: '',
    comments: [],
    followers: [],
    following: [],
    img_url: '',
    liked_recipes: [],
    recipes: [],
    type: "User",
}

export const emptyRecipe = {
    id: 0,
    comments: [],
    equipment: [],
    img_url: '',
    ingredients: [],
    likes: [],
    name: '',
    steps: [],
    tags: [],
    type: "Recipe",
    user: {
        userId: '',
        name: ''
    },
    serving: 0,
    preparation_time: 0,
    baking_time: 0,
}


export const DataContext = createContext({
    authUser: emptyUser,
    setAuthUser: () => {},
    user: emptyUser,
    setUser: () => {},
    recipe: emptyRecipe,
    setRecipe: () => {},
    isLoading: false,
    setLoading: () => {}
});

const { Provider } = DataContext;

const DataProvider = ({ children }) => {
    const userJsonString = localStorage.getItem('user')
    const initialAuthUser = (userJsonString) ? JSON.parse(userJsonString) : emptyUser

    const [authUser, setAuthUser] = useState(initialAuthUser);
    const [user, setUser] = useState(emptyUser);
    const [recipe, setRecipe] = useState(emptyRecipe);
    const [isLoading, setLoading] = useState(false);

    useEffect(()=> {
        if (authUser.access_token) {
            localStorage.setItem("user", JSON.stringify(authUser))
        } else {
            localStorage.clear("user")
        }
    }, [authUser])

    return <Provider value={{authUser, setAuthUser, user, setUser, recipe, setRecipe, isLoading, setLoading}}>{children}</Provider>
};

DataProvider.context = DataContext;

export default DataProvider;

