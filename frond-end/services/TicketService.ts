const getAllTickets = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/tickets", {
        method: "GET",
        headers: {"content-type": "application/json"},
    });
};

const TicketService = {
    getAllTickets,
};

export default TicketService;