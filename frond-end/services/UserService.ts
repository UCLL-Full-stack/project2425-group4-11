import { User } from "@/types";

const loginUser = (user: User) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
};

const registerUser = (user: User) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
};

const editProfile = (username: string, user: User) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/users/${username}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
}

const getUserByUsername = (username: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/users/username/${username}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const UserService = {
    loginUser,
    registerUser,
    editProfile,
    getUserByUsername,
};

export default UserService;