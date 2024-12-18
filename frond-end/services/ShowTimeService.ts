const getAllEvents = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/events", {
        method: "GET",
        headers: {"content-type": "application/json"},
    });
};

const getEventById = (eventId: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/events/${eventId}`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
};



const deleteEvent = async (eventId: number) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/events/${eventId}`, {
      method: "DELETE",
    });
};
 
const deleteTicket = async (eventId: number) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/tickets/${eventId}`, {
      method: "DELETE",
    });
}


const createEvent = async (eventData: any) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    });
};

const createTicket = async (ticketData: any) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/tickets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ticketData),
  });
};

const purchasedTicket = async (id: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/tickets/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });
};

const getTicketsByEventId = async (eventId: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/tickets/eventId/${eventId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
}

const ShowTimeService = {
    getAllEvents,
    getEventById,
    createEvent,
    createTicket,
    deleteEvent,
    deleteTicket,
    purchasedTicket,
    getTicketsByEventId,
};
  
export default ShowTimeService;
  