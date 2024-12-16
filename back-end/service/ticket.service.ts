import { Ticket } from "../model/Ticket";
import ticketDb from "../repository/ticket.db";
import { TicketInput } from "../types";

const getAllTickets = (): Ticket[] => ticketDb.getAllTickets();

const getTicketById = (id: number): Ticket => {
    const ticket = ticketDb.getTicketById({ id });
    if(!ticket) throw new Error(`Ticket with id ${id} does not exist.`);
    return ticket;
}

const createTicket = ({
    type,
    status,
    price,
    eventId
}: TicketInput): Ticket => {

    const ticket = new Ticket({ type, status, price, eventId });
    return ticket;
}

export default {
    getAllTickets,
    getTicketById,
    createTicket,
}