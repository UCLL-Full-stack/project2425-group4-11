type Role = 'admin' | 'user' | 'artist' | "concertHall";

type UserInput ={
    id?: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    username: string;
    phoneNumber: string;
    accountStatus: boolean;
    role: Role;
}
type TicketInput= {
    id?: number;
    type: string;
    status: string;
    price: number;
    eventId: number;
    userId?: number; 
}
type EventInput = {
    id?: number;
    title: string;
    genre: string;
    time: string;
    date: Date;
    price: number;
    duration: number;
    description: string;
    status: string;
    artistId: number;
    concertHallId: number;
}

type ConcertHallInput = {
    id?: number;
    location: string;
    capacity: number;
    name: string;
    facilities: string[];
    contactInfo: string[];
    isVerified: string;
    username: string;
    password: string;
}

type ArtistInput = {
    id?: number;
    artistName: string;
    password: string;
    genres: string[];
    biography: string;
    bookingFee: number;
    socialMedia: string[];
    email: string;
    isVerified: string;
    role: Role;
}

type AuthenticationResponse = {
    token: string;
    username: string;
    fullname: string;
    role: string;
};

export {
    Role,
    UserInput,
    TicketInput,
    EventInput,
    ConcertHallInput,
    ArtistInput,
    AuthenticationResponse
}