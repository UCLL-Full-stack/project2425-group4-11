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
 * /users:
 *   get:
 *     summary: Get a list of all tickets.
 *     responses:
 *       200:
 *         description: A list of tickets.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Ticket'
 */
artistRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await artistService.getAllArtists();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});