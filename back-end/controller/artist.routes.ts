/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Artist:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            artistName:
 *              type: string
 *              description: Artist name.
 *            genres:
 *              type: array
 *              items:
 *                type: string
 *              description: Artist genres.
 *            biography:
 *              type: string
 *              description: Artist biography.
 *            bookingFee:
 *              type: number
 *              description: Artist booking fee.
 *            socialMedia:
 *              type: array
 *              items:
 *                type: string
 *              description: Artist social media.
 *            email:
 *              type: string
 *              description: Artist email address.
 *            isVerified:
 *              type: string
 *              description: Artist verification status.
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

import express, { NextFunction, Request, Response } from "express";
import artistService from "../service/artist.service";
import { ArtistInput, Role } from "../types";

const artistRouter = express.Router();

/**
 * @swagger
 * /artists:
 *  get:
 *   tags:
 *    - artist
 *   security:
 *    - bearerAuth: []
 *   summary: Get a list of all artists.
 *   responses:
 *    200:
 *     description: A list of all artists.
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Artist'
 */
artistRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("hi");
        const request = req as Request & { auth: { role: Role } };
        console.log(request);
        const artists = await artistService.getAllArtists({ role: request.auth.role });
        res.status(200).json(artists);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /artists/login:
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
artistRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artistInput = <ArtistInput>req.body;
        const artist = await artistService.authenticate(artistInput);
        res.status(200).json({ message: 'Authentication succesful', ...artist });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /artists/signup:
 *  post:
 *      summary: Create a new artist.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          artistName:
 *                              type: string
 *                              description: The artist name.
 *                              example: "sqmmi3"
 *                          genres:
 *                              type: stringArray
 *                              description: The artists genres.
 *                              example: "['pop', 'rock']"
 *                          biography:
 *                              type: string
 *                              description: The artists biography.
 *                              example: "sqmmi3 is a upcoming artist who makes music influenced by brakence, Jeremy Zucker, EDEN, Chelsea Cutler and bhertuy"
 *                          bookingFee:
 *                              type: number
 *                              description: The artists booking fee.
 *                              example: "100"
 *                          socialMedia:
 *                              type: stringArray
 *                              description: The artists social media links.
 *                              example: "http://www.instagram.com/sqmmi3"
 *                          email:
 *                              type: string
 *                              description: The artists email address.
 *                          isVerified:
 *                              type: string
 *                              description: The artists verification status.
 *      responses:
 *          201:
 *              description: The created artist object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Artist'
 *          400:
 *              description: Invalid input.
 *          500:
 *              description: Internal server error.
 */

artistRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artist = <ArtistInput>req.body;
        const result = await artistService.createArtist(artist);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});



/**
 * @swagger
 * /artists/{role}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all artists if the user is an admin.
 *     responses:
 *       200:
 *         description: A list of artists.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Artist'
 */
artistRouter.get('/:role', async (req: Request, res: Response, next: NextFunction) => {
    const role = req.params.role as Role;
    try {
        const users = await artistService.getArtists({ role });
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /artists/artistName/{artistName}:
 *  get:
 *      summary: Get a artist by artistName.
 *      parameters:
 *          - in: path
 *            name: artistName
 *            schema:
 *              type: string
 *              required: true
 *              description: The artist name.
 *      responses:
 *          200:
 *              description: An artist object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Artist'
 */
artistRouter.get('/artistName/:artistName', async (req: Request, res: Response, next: NextFunction) => {
    const { artistName } = req.params;
    try {
        const result = await artistService.getArtistByArtistName({ artistName });
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

artistRouter.put('/:id/isVerified', async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    console.log(id);
    const { isVerified } = req.body;
    console.log(isVerified);
    try {
        const result = await artistService.updateArtist(id, isVerified);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

export { artistRouter }