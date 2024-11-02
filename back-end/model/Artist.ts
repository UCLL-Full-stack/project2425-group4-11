export class Artist {
    private id?: number;
    private artistName: string;
    private genres: string[];
    private biography: string;
    private bookingFee: number;
    private socialMedia: string[];

    constructor(artist: { id?: number; artistName: string; genres: string[]; biography: string; bookingFee: number; socialMedia: string[] }) {
        this.id = artist.id;
        this.artistName = this.validateArtistName(artist.artistName);
        this.genres = this.validateGenres(artist.genres);
        this.biography = this.validateBiography(artist.biography);
        this.bookingFee = this.validateBookingFee(artist.bookingFee);
        this.socialMedia = this.validateSocialMedia(artist.socialMedia);
    }

    private validateArtistName(artistName: string): string {
        if (!artistName || artistName.trim() === '') {
            throw new Error("Artist name cannot be empty.");
        }
        return artistName;
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

    getId(): number | undefined {
        return this.id;
    }

    getArtistName(): string {
        return this.artistName;
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
}