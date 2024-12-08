import { User } from "../model/User";
import database from "./database";

const users = [
    new User({
        id: 1,
        email: "emma.liefsoens@gmail.com",
        password: "emmaliefs123",
        firstName: "Emma",
        lastName: "Liefsoens",
        username: "emmaliefs",
        phoneNumber: "0489007570",
        accountStatus: false,
        role: "user"
    }),
]

const getAllUsers = (): User[] => {
    return users;
}

const getUserById = ({ id }: { id: number }): User | null => {
    return users.find((user) => user.getId() === id) || null;
}

const getUserByEmail = ({ email }: { email: string }): User | null => {
    return users.find((user) => user.getEmail() === email) || null;
}

const getUserByUsername = async ({ username }: { username: string }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findFirst({
            where: { username },
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createUser = (user: User): User => {
    users.push(user);
    return user;
}

export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    getUserByUsername
}