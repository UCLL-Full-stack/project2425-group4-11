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
 *              type: stringArray
 *              description: Artist genres.
 *            biography:
 *              type: string
 *              description: Artist biography.
 *            bookingFee:
 *              type: number
 *              description: Artist booking fee.
 *            socialMedia:
 *              type: stringArray
 *              description: Artist social media.
 */

import express, { NextFunction, Request, Response } from "express";
import artistService from "../service/artist.service";
import { ArtistInput } from "../types";

const artistRouter = express.Router();

/**
 * @swagger
 * /artists:
 *   get:
 *     summary: Get a list of all artists.
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
artistRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await artistService.getAllArtists();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /artists/{id}:
 *  get:
 *      summary: Get an artist by id.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The artist id.
 *      responses:
 *          200:
 *              description: An artist object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Artist'
 */
artistRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await artistService.getArtistById(Number(req.params.id));
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /artists:
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

artistRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artist = <ArtistInput>req.body;
        const result = await artistService.createArtist(artist);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

export { artistRouter }