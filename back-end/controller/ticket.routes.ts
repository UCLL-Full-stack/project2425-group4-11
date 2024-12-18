/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Ticket:
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
import { TicketInput } from "../types";

const ticketRouter = express.Router();

/**
 * @swagger
 * /tickets:
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
 * /tickets/{id}:
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
        console.log("hallo")
        const user = await ticketService.getTicketById(Number(req.params.id));
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /tickets:
 *  post:
 *      summary: Create a new ticket.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          type:
 *                              type: string
 *                              description: The ticket type.
 *                              example: "VIP"
 *                          status:
 *                              type: string
 *                              description: The ticket status.
 *                              example: "Sold"
 *                          price:
 *                              type: number
 *                              description: The ticket price.
 *                              example: "65"
 *                          generalAdmission:
 *                              type: boolean
 *                              description: The place of the user in the hall (standing;true/seat;false).
 *                              example: "false"
 *                          seat:
 *                              type: string | null
 *                              description: The user's seat.
 *                              example: "S21"
 *      responses:
 *          201:
 *              description: The created ticket object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Ticket'
 *          400:
 *              description: Invalid input.
 *          500:
 *              description: Internal server error.
 */
ticketRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ticket = <TicketInput>req.body;
        const result = await ticketService.createTicket(ticket);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /tickets/{id}:
 *   delete:
 *     summary: Delete a ticket by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ticket ID
 *     responses:
 *       200:
 *         description: The ticket was successfully deleted.
 *       404:
 *         description: Ticket not found.
 */
ticketRouter.delete('/:eventId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const eventId = req.params.eventId;
        const ticket = await ticketService.deleteTicket(parseInt(eventId));
        res.status(200).json(ticket);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /tickets/{id}:
 *   put:
 *     summary: Update a ticket by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ticket ID
 *     responses:
 *       200:
 *         description: The ticket was successfully updated.
 *       404:
 *         description: Ticket not found.
 */
ticketRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) =>   {
    try {
        const ticketId = req.params.id;
        console.log("ticket ID: ",ticketId);
        const ticket = await ticketService.updateTicket(parseInt(ticketId));
        res.status(200).json(ticket);
    } catch (error) {
        next(error);
    }
})

/**
 * @swagger
 * /tickets/eventId/{eventId}:
 *   get:
 *     summary: Get a ticket by event ID.
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The event ID
 *     responses:
 *       200:
 *         description: The array of tickets was successfully retrieved.
 *       404:
 *         description: Tickets not found.
 */
ticketRouter.get('/eventId/:eventId', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const eventId = req.params.eventId;
        const tickets = await ticketService.getTicketsByEventId(parseInt(eventId));
        res.status(200).json(tickets);
    } catch (error) {
        next(error);
    }
})

export { ticketRouter };