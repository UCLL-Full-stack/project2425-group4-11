// /**
//  * @swagger
//  *   components:
//  *    securitySchemes:
//  *     bearerAuth:
//  *      type: http
//  *      scheme: bearer
//  *      bearerFormat: JWT
//  *    schemas:
//  *      ConcertHall:
//  *          type: object
//  *          properties:
//  *            id:
//  *              type: number
//  *              format: int64
//  *            location:
//  *              type: string
//  *              description: Concert hall location.
//  *            capacity:
//  *              type: number
//  *              description: Concert hall capacity.
//  *            name:
//  *              type: string
//  *              description: Concert hall name.
//  *            facilities:
//  *              type: array
//  *              items:
//  *                type: string
//  *              description: Concert hall facilities.
//  *            contactInfo:
//  *              $ref: '#/components/schemas/ContactInfo'
//  *              description: Concert hall contact information.
//  * 
//  *      ContactInfo:
//  *          type: object
//  *          properties:
//  *            email:
//  *              type: string
//  *              description: Contact email.
//  *            countryCode:
//  *              type: string
//  *              description Contact country code.
//  *            number:
//  *              type: string
//  *              description: Contact phone number.
//  *            instagram:
//  *              type: string
//  *              description: Contact instagram account.
//  */
import express, { NextFunction, Request, Response } from 'express';
import concertHallService from '../service/concertHall.service';
import { ConcertHallInput } from '../types';

const concertHallRouter = express.Router();

/**
 * @swagger
 * /concertHalls:
 *   get:
 *     summary: Get a list of all concert halls.
 *     responses:
 *       200:
 *         description: A list of concert halls.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/ConcertHall'
 */
concertHallRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const concertHalls = await concertHallService.getAllConcertHalls();
        res.status(200).json(concertHalls);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /concertHalls/{id}:
 *  get:
 *      summary: Get a concert hall by id.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The concert hall id.
 *      responses:
 *          200:
 *              description: A concert hall object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ConcertHall'
 */
concertHallRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const concertHall = await concertHallService.getConcertHallById(Number(req.params.id));
        res.status(200).json(concertHall);
    } catch (error) {
        next(error);
    }
});

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
 *                              type: object
 *                              properties:
 *                                  email:
 *                                      type: string
 *                                      description: Contact email.
 *                                  countryCode:
 *                                      type: string
 *                                      description: Contact country code.
 *                                  number:
 *                                      type: string
 *                                      description: Contact phone number.
 *                                  instagram:
 *                                      type: string
 *                                      description: Contact instagram account.
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
        const concertHall = <ConcertHallInput>req.body;
        const result = await concertHallService.createConcertHall(concertHall);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

export { concertHallRouter };