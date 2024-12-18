import { ConcertHall } from "@/types";

const loginConcertHall = (concertHall: ConcertHall) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/concertHalls/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(concertHall),
    });
};

const registerConcertHall = (concertHall: ConcertHall) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/concertHalls/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(concertHall),
    })
}

const ConcertHallService = {
    loginConcertHall,
    registerConcertHall,
}

export default ConcertHallService