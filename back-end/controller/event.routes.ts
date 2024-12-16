/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Event:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Event name.
 *            expertise:
 *              type: string
 *              description: Event expertise.
 */
import express, { NextFunction, Request, Response } from 'express';
import eventService from "../service/event.service";


const eventRouter = express.Router();


/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get a list of all events.
 *     responses:
 *       200:
 *         description: A list of events.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Event'
 */
eventRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const events = await eventService.getAllEvents();
        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /events/{id}:
 *  get:
 *      summary: Get a event by id.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The event id.
 *      responses:
 *          200:
 *              description: An event object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Event'
 */
eventRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const event = await eventService.getEventById(Number(req.params.id));
        res.status(200).json(event);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /events:
 *   post:
 *      summary: Create a new event.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Event'
 *      responses:
 *         201:
 *            description: The created event object.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Event'
 */
eventRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const eventInput = req.body;
        const newEvent = await eventService.createEvent(eventInput);
        res.status(201).json(newEvent);
    } catch (error) {
        next(error);
    }
});

export { eventRouter };