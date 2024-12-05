import userDB from '../repository/user.db';
import { User } from '../model/User';
import { AuthenticationResponse, UserInput } from '../types';
import userDb from '../repository/user.db';

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

    const isValidPassword = await bcrypt.compare(password, user.getPassword());

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

const createUser = ({
    email,
    password,
    firstName,
    lastName,
    username,
    phoneNumber,
    accountStatus,
    role,
}: UserInput): User => {
    const existingUser = userDb.getUserByEmail({ email });

    if (existingUser) {
        throw new Error("User with email address already exists.");
    }

    const user = new User({ email, password, firstName, lastName, username, phoneNumber, accountStatus, role });
    return userDb.createUser(user);
}

export default { getAllUsers, 
    getUserById,
    createUser,
};
