import userDB from '../repository/user.db';
import bcrypt from 'bcrypt';
import { User } from '../model/User';
import { AuthenticationResponse, UserInput } from '../types';
import userDb from '../repository/user.db';
import { generateJwtToken } from '../util/jwt';

const getAllUsers = (): User[] => userDB.getAllUsers();

const getUserById = (id: number): User => {
    const user = userDB.getUserById({ id });
    if(!user) throw new Error( `User with id ${id} does not exist.`);
    return user;
};

const getUserByUsername = async ({ username }: { username: string }): Promise<User> => {
    const user = await userDB.getUserByUsername({ username });
    if (!user) {
        throw new Error(`User with username: ${username} does not exist.`);
    }
    return user;
};

const authenticate = async ({ username, password }: UserInput): Promise<AuthenticationResponse> => {
    const user = await getUserByUsername({ username });

    const isValidPassword = await bcrypt.compareSync(password, user.getPassword());

    if (!isValidPassword) {
        throw new Error('Incorrect password.');
    }
    return {
        token: generateJwtToken({ username, role: user.getRole() }),
        username: username,
        fullname: `${user.getFirstName()} ${user.getLastName()}`,
        role: user.getRole(),
    };
};

const createUser = async ({
    email,
    password,
    firstName,
    lastName,
    username,
    phoneNumber,
    accountStatus,
}: UserInput): Promise<User> => {
    const existingUser = await userDb.getUserByUsername({ username });

    if (existingUser) {
        throw new Error(`User with username ${username} is already registered.`);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ email, password: hashedPassword, firstName, lastName, username, phoneNumber, accountStatus, role: 'user' });

    return await userDb.createUser(user);
}

const editProfile = async (username: string, userData: UserInput): Promise<User> => {
    const user = await userDB.getUserByUsername({ username });
    console.log(user)
    if (!user) {
        throw new Error(`User with username ${username} not found.`);
    }

    if (userData.password) {
        userData.password = await bcrypt.hash(userData.password, 12);
    }

    const userId = user.getId();
    if (!userId) {
        throw new Error("User ID is undefined.");
    }

    const updatedUser = await userDB.updateUser(userId, userData);
    return updatedUser;
}

export default { getAllUsers, 
    getUserById,
    createUser,
    authenticate,
    editProfile,
    getUserByUsername,
};
