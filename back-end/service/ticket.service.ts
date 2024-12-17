import { Ticket } from "../model/Ticket";
import ticketDB from "../repository/ticket.db";
import { TicketInput } from "../types";

const getAllTickets = async (): Promise<Ticket[]> => ticketDB.getAllTickets();

const getTicketById = (id: number): Ticket => {
    const ticket = ticketDB.getTicketById({ id });
    if(!ticket) throw new Error(`Ticket with id ${id} does not exist.`);
    return ticket;
}

const createTicket = ({
    type,
    price,
    eventId
}: TicketInput): Ticket => {

    const ticket = new Ticket({ type, status: 'Available', price, eventId });
    return ticket;
}

const deleteTicket = async (id: number): Promise<void> => {
    const ticket = await ticketDB.getTicketById({ id });
    if (!ticket) {
        throw new Error(`Ticket with id ${id} does not exist.`);
    }
    await ticketDB.deleteTicket({ id });
}

export default {
    getAllTickets,
    getTicketById,
    createTicket,
    deleteTicket,
}