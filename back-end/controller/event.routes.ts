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
 *            genre:
 *              type: string
 *              description: Event/concert (music) genre.
 *            time:
 *              type: string
 *              format: date-time
 *              description: Event time.
 *            date:
 *              type: string
 *              format: date
 *              description: Event date.
 *            duration:
 *              type: number
 *              description: Event duration.
 *            description:
 *              type: string
 *              description: Event description.
 *            status:
 *              type: string
 *              enum: ["upcoming", "ongoing", "past"]
 *              description: Event status.
 */