export class Artist {
    private id?: number;
    private artistName: string;
    private genre: string[];
    private biography: string;
    private bookingFee: number;
    private socialMedia: string[];

    constructor(artist: { id?: number; artistName: string; genre: string[]; biography: string; bookingFee: number; socialMedia: string[] }) {
        this.id = artist.id;
        this.artistName = artist.artistName;
        this.genre = artist.genre;
        this.biography = artist.biography;
        this.bookingFee = this.validateBookingFee(artist.bookingFee);
        this.socialMedia = artist.socialMedia;
    }

    private validateBookingFee(bookingFee: number): number {
        if (bookingFee < 0) {
            throw new Error("Booking fee must be a positive number.");
        }
        return bookingFee;
    } 

    getId(): number | undefined {
        return this.id;
    }

    getArtistName(): string {
        return this.artistName;
    }

    getGenre(): string[] {
        return this.genre;
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

    setGenre(newGenre: string): void {
        this.genre.push(newGenre);
    }

    setBiography(newBiography: string): void {
        this.biography = newBiography;
    }

    setSocialMedia(newSocialMedia: string): void {
        this.socialMedia.push(newSocialMedia);
    }
}