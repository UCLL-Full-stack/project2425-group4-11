import userDB from '../repository/user.db';
import { User } from '../model/User';
import { UserInput } from '../types';
import userDb from '../repository/user.db';

const getAllUsers = (): User[] => userDB.getAllUsers();

const getUserById = (id: number): User => {
    const user = userDB.getUserById({ id });
    if(!user) throw new Error( `User with id ${id} does not exist.`);
    return user;
};

const createUser = ({
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    accountStatus,
}: UserInput): User => {
    const existingUser = userDb.getUserByEmail({ email });

    if (existingUser) {
        throw new Error("User with email address already exists.");
    }

    const user = new User({ email, password, firstName, lastName, phoneNumber, accountStatus });
    return userDb.createUser(user);
}

export default { getAllUsers, 
    getUserById,
    createUser,
};
