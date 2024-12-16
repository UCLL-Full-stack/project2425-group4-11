import { Ticket } from "../model/Ticket";
import database from "./database";

const tickets = [
    new Ticket({
        id: 1,
        type: "Student",
        status: "Available",
        price: 65,
        eventId: 1
    }),
]

const getAllTickets = (): Ticket[] => {
    return tickets;
}

const getTicketById = ({ id }: { id: number }): Ticket | null => {
    return tickets.find((ticket) => ticket.getId() === id) || null;
}

const createTicket = async (ticket: Ticket): Promise<Ticket> => {
    try {
        const ticketPrisma = await database.ticket.create({
            data: {
                type: ticket.getType(),
                status: ticket.getStatus(),
                price: ticket.getPrice(),
                eventId: ticket.getEventId(),
            },
        });
        return Ticket.from(ticketPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    getAllTickets,
    getTicketById,
    createTicket,
}