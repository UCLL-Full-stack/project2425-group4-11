import { Role } from "../types";
import { Artist as ArtistPrisma } from '@prisma/client';

export class Artist {
    private id?: number;
    private artistName: string;
    private password: string;
    private genres: string[];
    private biography: string;
    private bookingFee: number;
    private socialMedia: string[];
    private email: string;
    private role: Role;

    constructor(artist: { id?: number; artistName: string; password: string; genres: string[]; biography: string; bookingFee: number; socialMedia: string[]; email: string; role: Role }) {
        this.id = artist.id;
        this.artistName = this.validateArtistName(artist.artistName);
        this.password = this.validatePassword(artist.password);
        this.genres = this.validateGenres(artist.genres);
        this.biography = this.validateBiography(artist.biography);
        this.bookingFee = this.validateBookingFee(artist.bookingFee);
        this.socialMedia = this.validateSocialMedia(artist.socialMedia);
        this.email = this.validateEmail(artist.email);
        this.role = artist.role;
    }

    private validateArtistName(artistName: string): string {
        if (!artistName || artistName.trim() === '') {
            throw new Error("Artist name cannot be empty.");
        }
        return artistName;
    }

    private validatePassword(password: string): string {
        if (password.length < 8) {
            throw new Error("Password must be at least 8 characters long.");
        }
        return password;
    }

    private validateGenres(genres: string[]): string[] {
        if (!genres || genres.length === 0) {
            throw new Error("Artist must have at least one genre.");
        }
        genres.forEach((genre) => {
            if (!genre || genre.trim() === '') {
                throw new Error("Genre cannot be empty.");
            }
        });
        return genres;
    }

    private validateBiography(biography: string): string {
        if (!biography || biography.trim() === '') {
            throw new Error("Biography cannot be empty.");
        }
        return biography;
    }

    private validateBookingFee(bookingFee: number): number {
        if (isNaN(bookingFee) || bookingFee < 0) {
            throw new Error("Booking fee must be a positive number.");
        }
        return bookingFee;
    }

    private validateSocialMedia(socialMedia: string[]): string[] {
        if (!socialMedia || socialMedia.length === 0) {
            throw new Error("Artist must have at least one social media link.")
        }
        socialMedia.forEach((account) => {
            if (!account.startsWith("http")) {
                throw new Error("Social media links must be valid URLs (starting with 'http').");
            }
        });
        return socialMedia;
    }

    private validateEmail(email: string): string {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format.');
        }
        return email;
    }

    getId(): number | undefined {
        return this.id;
    }

    getArtistName(): string {
        return this.artistName;
    }

    getPassword(): string {
        return this.password;
    }

    getGenres(): string[] {
        return this.genres;
    }

    getBiography(): string {
        return this.biography;
    }

    getBookingFee(): number {
        return this.bookingFee;
    }

    getSocialMedia(): string[] {
        return this.socialMedia;
    }

    getEmail(): string {
        return this.email;
    }

    getRole(): Role {
        return this.role;
    }

    setGenre(newGenre: string): void {
        this.validateGenres([newGenre]);
        this.genres.push(newGenre);
    }

    setBiography(newBiography: string): void {
        this.validateBiography(newBiography);
        this.biography = newBiography;
    }

    setSocialMedia(newSocialMedia: string): void {
        this.validateSocialMedia([newSocialMedia]);
        this.socialMedia.push(newSocialMedia);
    }

    static from ({ id, artistName, password, genres, biography, bookingFee, socialMedia, email, role}: ArtistPrisma) {
        return new Artist({
            id,
            artistName,
            password,
            genres,
            biography,
            bookingFee,
            socialMedia,
            email,
            role: role as Role,
        });
    }
}