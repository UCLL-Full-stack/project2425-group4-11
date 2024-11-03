import { Ticket } from "../model/Ticket";

const tickets = [
    new Ticket({
        id: 1,
        type: "Student",
        status: "Available",
        price: 65,
        seat: "A21"
    }),
]

const getAllTickets = (): Ticket[] => {
    return tickets;
}

const getTicketById = ({ id }: { id: number}): Ticket | null => {
    return tickets.find((ticket) => ticket.getId() === id) || null;
}

const createTicket = (ticket: Ticket): Ticket => {
    tickets.push(ticket);
    return ticket;
}

export default {
    getAllTickets,
    getTicketById,
    createTicket,
}