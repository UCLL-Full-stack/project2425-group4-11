type Role = 'admin' | 'user' | 'artist';


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
}

type ConcertHallInput = {
    id?: number;
    location: string;
    capacity: number;
    name: string;
    facilities: string[];
    contactInfo: ContactInfo;
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
    role: Role;
}

type ContactInfo = {
    email: string;
    countryCode: string;
    number: string;
    instagram: string;
}

type SocialMedia = {
    instagram?: string;
    facebook?: string;
    discord?: string;
    spotify: string;
    youtube: string;
    twitter?: string;
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
    ContactInfo,
    SocialMedia,
    AuthenticationResponse
}