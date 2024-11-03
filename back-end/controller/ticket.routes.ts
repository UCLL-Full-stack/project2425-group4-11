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
 *            type:
 *              type: string
 *              description: Ticket type.
 *            status:
 *              type: string
 *              description: Ticket status.
 *            price:
 *              type: number
 *              description: Ticket price.
 *            seat:
 *              type: string
 *              description: Ticket seat.
 */

import express, { NextFunction, Request, Response } from "express";
import ticketService from "../service/ticket.service";

const ticketRouter = express.Router();

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
ticketRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await ticketService.getAllTickets();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/{id}:
 *  get:
 *      summary: Get a ticket by id.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The ticket id.
 *      responses:
 *          200:
 *              description: A ticket object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Ticket'
 */
ticketRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await ticketService.getTicketById(Number(req.params.id));
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

export { ticketRouter };