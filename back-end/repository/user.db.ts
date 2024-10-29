import { User } from "../model/User";

const users = [
    new User({
        id: 1,
        email: "emma.liefsoens@gmail.com",
        password: "emmaliefs123",
        firstName: "Emma",
        lastName: "Liefsoens",
        phoneNumber: "0489007570",
        accountStatus: false,
    }),
]

const getAllUsers = (): User[] => {
    return users;
}

const getUserById = ({ id }: { id: number }): User | null => {
    return users.find((user) => user.getId() === id) || null;
}

export default {
    getAllUsers,
    getUserById,
}