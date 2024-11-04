type Role = 'admin' | 'user' | 'artist';


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
    status: string;
    price: number;
    seat: string;
    generalAdmission: boolean;
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
    contactInfo: ContactInfo;
}

type ArtistInput = {
    id?: number;
    artistName: string;
    genres: string[];
    biography: string;
    bookingFee: number;
    socialMedia: string[];
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

export {
    Role,
    UserInput,
    TicketInput,
    EventInput,
    ConcertHallInput,
    ArtistInput,
    ContactInfo,
    SocialMedia
}