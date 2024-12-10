export type Events = {
    id?: number;
    genre: string;
    time: Date;
    date: Date;
    price: number;
    duration: number;
    description: string;
    status: string;
}

export type User = {
    id?: number;
    email?: string;
    password: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    phoneNumber?: string;
    accountStatus?: boolean;
}

export type Ticket = {
    id?: number;
    type: string;
    status: string;
    price: number;
    seat: string;
    generalAdmission: boolean;
}

export type ConcertHall = {
    id?: number;
    location: string;
    capacity: number;
    name: string;
    facilities: string[];
    contactInfo: ContactInfo;
}

export type Artist = {
    id?: number;
    artistName: string;
    genres: string[];
    biography: string;
    bookingFee: number;
    socialMedia: string[];
}

export type Event = {
    id?: number;
    genre: string;
    time: Date;
    date: Date;
    price: number;
    duration: number;
    description: string;
    status: string;
}

export type ContactInfo = {
    email: string;
    countryCode: string;
    number: string;
    instagram: string;
}

export type SocialMedia = {
    instagram?: string;
    facebook?: string;
    discord?: string;
    spotify: string;
    youtube: string;
    twitter?: string;
}

export type StatusMessage = {
    message: string;
    type: "error" | "success";
};
