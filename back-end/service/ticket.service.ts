import { Ticket } from "../model/Ticket";
import ticketDB from "../repository/ticket.db";
import { TicketInput } from "../types";

const getAllTickets = async (): Promise<Ticket[]> => ticketDB.getAllTickets();

const getTicketById = async (id: number): Promise<Ticket> => {
    const ticket = await ticketDB.getTicketById({ id });
    if(!ticket) throw new Error(`Ticket with id ${id} does not exist.`);
    return ticket;
}

const createTicket = async ({
    type,
    price,
    eventId
}: TicketInput): Promise<Ticket> => {

    const ticket = new Ticket({ type, status: 'Available', price, eventId });
    return await ticketDB.createTicket(ticket);
}

const deleteTicket = async (eventId: number): Promise<void> => {
    const tickets = await ticketDB.getTicketsByEventId({ eventId });
    if (!tickets) {
        throw new Error(`Ticket with id ${eventId} does not exist.`);
    }
    return await ticketDB.deleteTicketsByEventId({ eventId });
}
const updateTicket = async (id: number): Promise<Ticket> => {
    const ticket = await ticketDB.getTicketById({ id });
    if (!ticket) {
        throw new Error(`Ticket with id ${id} not found.`);
    }

    const updatedTicketData: Partial<TicketInput> = {
        type: ticket.getType(),
        status: "Sold",
        price: ticket.getPrice(),
        eventId: ticket.getEventId()
    };

    return await ticketDB.updateTicketById(id, updatedTicketData);
}

const getTicketsByEventId = async (eventId: number): Promise<Ticket[]> => {
    return await ticketDB.getTicketsByEventId({ eventId });
}

export default {
    getAllTickets,
    getTicketById,
    createTicket,
    deleteTicket,
    updateTicket,
    getTicketsByEventId,
};