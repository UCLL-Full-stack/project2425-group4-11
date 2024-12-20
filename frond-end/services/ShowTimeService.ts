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

const purchasedTicket = async (id: string, userId: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/tickets/${id}/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });
};

const getTicketsByEventId = async (eventId: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/tickets/eventId/${eventId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
};

const getTicketsByUserId = async (userId: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/tickets/userId/${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
};

const rescheduleEvent = async ({ eventId, date, time }: { eventId: string; date: string; time: string }) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/events/${eventId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date, time }),
  });
};

const getArtistByArtistName = async (artistName: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/artists/artistName/${artistName}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });
};

const getEventsByArtistId = async (artistId: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/events/artistId/${artistId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });
};

const getConcertHallByUsername = async (username: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/concertHalls/username/${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });
};

const getEventsByConcertHallId = async (concertHallId: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/events/concertHallId/${concertHallId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });
};

const getConcertHallById = async (id: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/concertHalls/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
};

const getAllArtists = async (role: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/artists/${role}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
};

const getAllConcertHalls = async (role: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/concertHalls/role/${role}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
};

const ShowTimeService = {
    getAllEvents,
    getEventById,
    createEvent,
    createTicket,
    deleteEvent,
    deleteTicket,
    purchasedTicket,
    getTicketsByEventId,
    rescheduleEvent,
    getTicketsByUserId,
    getArtistByArtistName,
    getEventsByArtistId,
    getEventsByConcertHallId,
    getConcertHallByUsername,
    getConcertHallById,
    getAllArtists,
    getAllConcertHalls
};
  
export default ShowTimeService;
  