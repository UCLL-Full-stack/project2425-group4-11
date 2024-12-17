import { Ticket } from "../model/Ticket";
import database from "./database";
import ticketDB from '../repository/ticket.db';


const tickets = [
    new Ticket({
        id: 1,
        type: "Student",
        status: "Available",
        price: 65,
        eventId: 1
    }),
]

const getAllTickets = async (): Promise<Ticket[]> => {
    try {
        const ticketsPrisma = await database.ticket.findMany();
        return ticketsPrisma.map((ticketPrisma) => Ticket.from(ticketPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
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

const deleteTicket = async ({ id }: { id: number }): Promise<void> => {
    try {
        await database.ticket.delete({
            where: { id },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllTickets,
    getTicketById,
    createTicket,
    deleteTicket,
}