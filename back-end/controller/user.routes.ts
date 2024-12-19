/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      User:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            email:
 *              type: string
 *              description: User email.
 *            password:
 *              type: string
 *              description: User password.
 *            firstName:
 *              type: string
 *              description: User first name.
 *            lastName:
 *              type: string
 *              description: User last name.
 *            username:
 *              type: string
 *              description: User username.
 *            phoneNumber:
 *              type: string
 *              description: User phone number.
 *            accountStatus:
 *              type: boolean
 *              description: User account status.
 *      AuthenticationRequest:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *              description: User name.
 *            password:
 *              type: string
 *              description: User password.
 */
import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types';

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of all users.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/{id}:
 *  get:
 *      summary: Get a user by id.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The user id.
 *      responses:
 *          200:
 *              description: A user object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 */
userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.getUserById(Number(req.params.id));
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *      summary: Login using username/password. Returns an object with JWT token and user name when succesful.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AuthenticationRequest'
 *      responses:
 *         200:
 *            description: The created user object
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/AuthenticationResponse'
 */
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const user = await userService.authenticate(userInput);
        res.status(200).json({ message: 'Authentication succesful', ...user });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/signup:
 *  post:
 *      summary: Create a new user.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              description: The user's email.
 *                              example: "user@example.com"
 *                          password:
 *                              type: string
 *                              description: The user's password.
 *                              example: "password123"
 *                          firstName:
 *                              type: string
 *                              description: The user's first name.
 *                              example: "John"
 *                          lastName:
 *                              type: string
 *                              description: The user's last name.
 *                              example: "Doe"
 *                          username:
 *                              type: string
 *                              description: The user's username.
 *                          phoneNumber:
 *                              type: string
 *                              description: The user's phone number.
 *                              example: "+1234567890"
 *                          accountStatus:
 *                              type: boolean
 *                              description: The user's account status.
 *                              example: true
 *      responses:
 *          201:
 *              description: The created user object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          400:
 *              description: Invalid input.
 *          500:
 *              description: Internal server error.
 */

userRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = <UserInput>req.body;
        const result = await userService.createUser(user);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/username/{username}:
 *  get:
 *      summary: Get a user by username.
 *      parameters:
 *          - in: path
 *            name: username
 *            schema:
 *              type: string
 *              required: true
 *              description: The user username.
 *      responses:
 *          200:
 *              description: A user object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 */
userRouter.get('/username/:username', async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.params;
    try {
        const result = await userService.getUserByUsername({ username });
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
})

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update an existing user's profile by ID.
 *     description: Updates the profile information of a user based on their ID.
 *     operationId: updateUser
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user ID that needs to be updated.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user profile was successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input or missing required fields.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal Server Error.
 */
userRouter.put('/:username', async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.params;
    try {
        const result = await userService.editProfile(username, req.body);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

export { userRouter };