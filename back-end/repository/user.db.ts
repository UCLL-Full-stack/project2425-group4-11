import { User } from "../model/User";
import { UserInput } from "../types";
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

const createUser = async (user: User): Promise<User> => {
    try {
        const userPrisma = await database.user.create({
            data: {
                email: user.getEmail(),
                password: user.getPassword(),
                firstName: user.getFirstName(),
                lastName: user.getLastName(),
                username: user.getUsername(),
                phoneNumber: user.getPhoneNumber(),
                accountStatus: user.getAccountStatus(),
                role: user.getRole(),
            },
        });
        return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const updateUser = async (id: number, userData: Partial<UserInput>): Promise<User> => {
    try {
        const userPrisma = await database.user.update({
            where: { id },
            data: userData,
        });
        return User.from(userPrisma)
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    getUserByUsername,
    updateUser,
}