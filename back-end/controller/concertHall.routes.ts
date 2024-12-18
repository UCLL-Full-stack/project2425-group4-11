/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      ConcertHall:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            location:
 *              type: string
 *              description: Concert hall location.
 *            capacity:
 *              type: number
 *              description: Concert hall capacity.
 *            name:
 *              type: string
 *              description: Concert hall name.
 *            facilities:
 *              type: array
 *              items:
 *                type: string
 *              description: Concert hall facilities.
 *            contactInfo:
 *              type: array
 *              items:
 *                type: string
 *              description: Concert hall contact information.
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
import concertHallService from '../service/concertHall.service';
import { ConcertHallInput, Role } from '../types';

const concertHallRouter = express.Router();

// /**
//  * @swagger
//  * /concertHalls:
//  *   get:
//  *     summary: Get a list of all concert halls.
//  *     responses:
//  *       200:
//  *         description: A list of concert halls.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                  $ref: '#/components/schemas/ConcertHall'
//  */
// concertHallRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const concertHalls = await concertHallService.getAllConcertHalls();
//         res.status(200).json(concertHalls);
//     } catch (error) {
//         next(error);
//     }
// });

// /**
//  * @swagger
//  * /concertHalls/{id}:
//  *  get:
//  *      summary: Get a concert hall by id.
//  *      parameters:
//  *          - in: path
//  *            name: id
//  *            schema:
//  *              type: integer
//  *              required: true
//  *              description: The concert hall id.
//  *      responses:
//  *          200:
//  *              description: A concert hall object.
//  *              content:
//  *                  application/json:
//  *                      schema:
//  *                          $ref: '#/components/schemas/ConcertHall'
//  */
// concertHallRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const concertHall = await concertHallService.getConcertHallById(Number(req.params.id));
//         res.status(200).json(concertHall);
//     } catch (error) {
//         next(error);
//     }
// });

/**
 * @swagger
 * /concertHalls/signup:
 *  post:
 *      summary: Create a new concert hall.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: The concert hall name.
 *                              example: "Royal Albert Hall"
 *                          location:
 *                              type: string
 *                              description: The concert hall location.
 *                              example: "London"
 *                          capacity:
 *                              type: number
 *                              description: The concert hall capacity.
 *                              example: 5000
 *                          contactInfo:
 *                              type: array
 *                              description: The concert hall contact information
 *                          username: 
 *                              type: string
 *                              description: The concert hall username
 *                          password:
 *                              type: string
 *                              description: The concert hall password
 *      responses:
 *          201:
 *              description: The created concert hall object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ConcertHall'
 *          400:
 *              description: Invalid input.
 *          500:
 *              description: Internal server error.
 */
concertHallRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("hallo");
        const concertHall = <ConcertHallInput>req.body;
        console.log(concertHall);
        const result = await concertHallService.createConcertHall(concertHall);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

// /**
//  * @swagger
//  * /concertHalls/role:
//  *   get:
//  *     security:
//  *       - bearerAuth: []
//  *     summary: Get a list of all artists if the user is an admin.
//  *     responses:
//  *       200:
//  *         description: A list of artists.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                  $ref: '#/components/schemas/Artist'
//  */
// concertHallRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const request = req as Request & { auth: { role: Role } };
//         const { role } = request.auth;
//         const users = await concertHallService.getConcertHalls({ role });
//         res.status(200).json(users);
//     } catch (error) {
//         next(error);
//     }
// });

/**
 * @swagger
 * /concertHalls/login:
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
 *            description: The created artist object
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/AuthenticationResponse'
 */
concertHallRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("hallo");
        const concertHallInput = <ConcertHallInput>req.body;
        const concertHall = await concertHallService.authenticate(concertHallInput);
        res.status(200).json({ message: 'Authentication succesful', ...concertHall});
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /concertHalls/username/{username}:
 *  get:
 *      summary: Get a concertHall by username.
 *      parameters:
 *          - in: path
 *            name: username
 *            schema:
 *              type: string
 *              required: true
 *              description: The concert hall username.
 *      responses:
 *          200:
 *              description: An ConcertHall object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ConcertHall'
 */
concertHallRouter.get('/username/:username', async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.params;
    console.log("hallo");
    console.log(username);
    try {
        const result = await concertHallService.getConcertHallByUsername({ username });
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

export { concertHallRouter };