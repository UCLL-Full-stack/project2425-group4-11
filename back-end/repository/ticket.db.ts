import { Ticket } from "../model/Ticket";
import database from "./database";
import ticketDB from '../repository/ticket.db';
import { TicketInput } from "../types";


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

const getTicketById = async ({ id }: { id: number }): Promise<Ticket | null> => {
    try {
        const ticketPrisma = await database.ticket.findUnique({
            where: { id },
        });
        return ticketPrisma ? Ticket.from(ticketPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getTicketsByEventId = async ({ eventId }: { eventId: number }): Promise<Ticket[]> => {
    try {
        const ticketsPrisma = await database.ticket.findMany({
            where: { eventId },
        });
        return ticketsPrisma.map(ticketPrisma => Ticket.from(ticketPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

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

const deleteTicketsByEventId = async ({ eventId }: { eventId: number }): Promise<void> => {
    try {
        await database.ticket.deleteMany({
            where: { eventId },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const updateTicketById = async (id:number, ticketData: Partial<TicketInput>): Promise<Ticket> =>{
    try {
        const ticketPrisma = await database.ticket.update({
            where: { id },
            data: ticketData,
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
    deleteTicketsByEventId,
    getTicketsByEventId,
    updateTicketById,
};