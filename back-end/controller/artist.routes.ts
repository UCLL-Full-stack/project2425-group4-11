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