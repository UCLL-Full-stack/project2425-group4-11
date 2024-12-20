type Role = 'admin' | 'user' | 'artist' | "concertHall";

export type Events = {
    id?: number;
    genre: string;
    title: string;
    time: string;
    date: Date;
    price: number;
    duration: number;
    description: string;
    status: string;
}

export type User = {
    id?: number;
    email?: string;
    password?: string;
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
    eventId: number;
}

export type ConcertHall = {
    id?: number;
    location?: string;
    capacity?: number;
    name?: string;
    facilities?: string[];
    contactInfo?: string[];
    role?: Role;
    username?: string;
    password?: string;
    isVerified?: string;
}

export type Artist = {
    id?: number;
    artistName?: string;
    password?: string;
    genres?: string[];
    biography?: string;
    bookingFee?: number;
    socialMedia?: string[];
    email?: string;
    role?: Role;
    isVerified?: string;
}

export type Event = {
    concertHallName: string;
    id?: string;
    title: string;
    genre: string;
    time: string;
    date: Date;
    price: number;
    duration: number;
    description: string;
    status: string;
    artistId?: string;
    artistName: string;
    concertHallId: string;
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
