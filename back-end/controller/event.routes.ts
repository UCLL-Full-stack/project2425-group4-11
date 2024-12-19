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
 *            title:
 *              type: string
 *              description: Event title.
 *            genre:
 *              type: string
 *              description: Event genre.
 *            time:
 *              type: string
 *              description: Event time.
 *            date:
 *              type: string
 *              fornat: date
 *              description: Event date.
 *            duration:
 *              type: number
 *              description: Event duration.
 *            description:
 *              type: string
 *              description: Event description.
 *            status:
 *              type: string
 *              description: Event status.
 *            artistId:
 *              type: number
 *              description: The artist ID associated with the event.
 *            concertHallId:
 *              type: number
 *              description: The concert hall ID where the event will take place.
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

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Delete an event by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The event ID
 *     responses:
 *       200:
 *         description: The event was successfully deleted.
 *       404:
 *         description: Event not found.
 */
eventRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const eventId = Number(req.params.id);
        await eventService.deleteEvent(eventId);
        res.status(200).json({ message: 'Event successfully deleted' });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /events/{eventId}:
 *   put:
 *     summary: Reschedule an event.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The event ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *               time:
 *                 type: string
 *     responses:
 *       200:
 *         description: Event successfully rescheduled.
 *       404:
 *         description: Event not found.
 */
eventRouter.put("/:eventId", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const eventId = Number(req.params.eventId);
      console.log(eventId)
      const { date, time } = req.body;
  
      await eventService.updateEventSchedule(eventId, { date, time });
  
      res.status(200).json({ message: "Event successfully rescheduled" });
    } catch (error) {
      next(error);
    }
  });

/**
 * @swagger
 * /events/artistId/{artistId}:
 *   get:
 *     summary: Get events by artist ID.
 *     parameters:
 *       - in: path
 *         name: artistId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The artist ID
 *     responses:
 *       200:
 *         description: The array of events was successfully retrieved.
 *       404:
 *         description: Events not found.
 */
eventRouter.get('/artistId/:artistId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artistId = req.params.artistId;
        const events = await eventService.getEventsByArtistId(parseInt(artistId));
        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /events/concertHallId/{concertHallId}:
 *   get:
 *     summary: Get events by concert hall ID.
 *     parameters:
 *       - in: path
 *         name: concertHallId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The concert hall ID
 *     responses:
 *       200:
 *         description: The array of events was successfully retrieved.
 *       404:
 *         description: Events not found.
 */
eventRouter.get('/concertHallId/:concertHallId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const concertHallId = req.params.concertHallId;
        const events = await eventService.getEventsByConcertHallId(parseInt(concertHallId));
        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
});
  

export { eventRouter };