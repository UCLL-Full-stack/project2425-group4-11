type UserInput ={
    id?: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    accountStatus: boolean;
}
type TicketInput= {
    id?: number;
    type: string;
    status: boolean;
    price: number;
    seat: string;
    date: Date;
}
type EventInput = {
    id?: number;
    genre: string;
    time: Date;
    date: Date;
    price: number;
    duration: number;
    description: string;
    status: string;
}

type ConcertHallInput = {
    id?: number;
    location: string;
    capacity: number;
    name: string;
    facilities: string[];
    contactInfo: string[];
}

type ArtistInput = {
    id?: number;
    artistName: string;
    genre: string[];
    biography: string;
    bookingFee: number;
    socialMedia: string[];
}