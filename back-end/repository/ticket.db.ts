import { Ticket } from "../model/Ticket";

const tickets = [
    new Ticket({
        id: 1,
        type: "Student",
        status: "Available",
        price: 65,
        seat: "A21",
        generalAdmission: false,
    }),
]

const getAllTickets = (): Ticket[] => {
    return tickets;
}

const getTicketById = ({ id }: { id: number }): Ticket | null => {
    return tickets.find((ticket) => ticket.getId() === id) || null;
}

const createTicket = (ticket: Ticket): Ticket => {
    tickets.push(ticket);
    return ticket;
}

const getTicketByTypeAndStatusAndPriceAndSeat = ({ type }: { type: string }, { status }: { status: string }, { price }: { price: number }, { seat }: { seat: string }): Ticket | null => {
    return tickets.find((ticket) => ticket.getType() === type && ticket.getStatus() === status && ticket.getPrice() === price && ticket.getSeat() === seat) || null;
}

export default {
    getAllTickets,
    getTicketById,
    createTicket,
    getTicketByTypeAndStatusAndPriceAndSeat,
}