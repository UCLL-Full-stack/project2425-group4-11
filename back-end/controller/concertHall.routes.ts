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