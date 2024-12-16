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

const ShowTimeService = {
    getAllEvents,
    getEventById,
};
  
export default ShowTimeService;
  