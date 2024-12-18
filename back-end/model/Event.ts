import { Event as EventPrisma } from '@prisma/client';

export class Event {
    private id?: number;
    private title: string;
    private genre: string;
    private time: string;
    private date: Date;
    private duration: number;
    private description: string;
    private status: string;
    private artistId: number;
    private concertHallId: number;

    constructor(event: { id?: number; title: string; genre: string; time: string; date: Date; duration: number; description: string; status: string; artistId: number; concertHallId: number}) {
        this.id = event.id;
        this.title = this.validateTitle(event.title);
        this.genre = this.validateGenre(event.genre);
        this.time = this.parseAndValidateTime(event.time);
        this.date = this.validateDate(event.date);
        this.duration = this.validateDuration(event.duration);
        this.description = this.validateDescription(event.description);
        this.status = this.validateStatus(event.status);
        this.artistId = event.artistId;
        this.concertHallId = event.concertHallId;
    }

    private validateTitle(title: string): string {
        if (!title || title.trim() === "") {
            throw new Error("title cannot be empty.");
        }
        return title;
    }

    private validateGenre(genre: string): string {
        if (!genre || genre.trim() === "") {
            throw new Error("Genre cannot be empty.");
        }
        return genre;
    }

    private parseAndValidateTime(timeString: string): string {
        // Validate format: 'HH:MM'
        if (!timeString.match(/^\d{2}:\d{2}$/)) {
            throw new Error("Time must be in the format 'HH:MM'.");
        }
    
        // Extract and validate hours and minutes
        const [hours, minutes] = timeString.split(":").map(Number);
    
        if (hours < 0 || hours >= 24) {
            throw new Error("Hours must be between 00 and 23.");
        }
    
        if (minutes < 0 || minutes >= 60) {
            throw new Error("Minutes must be between 00 and 59.");
        }
    
        // Create a valid time string (ensure it returns 'HH:MM')
        const validatedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
        return validatedTime;
    }
    

    private validateDate(date: Date | string): Date {
        if (typeof date === "string") {
            date = new Date(date); // Parse string to Date
        }
    
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            throw new Error("Invalid date format.");
        }
    
        const now = new Date();
        const minDate = new Date();
        minDate.setMonth(now.getMonth() + 1);
        minDate.setHours(0, 0, 0, 0);
    
        date.setHours(0, 0, 0, 0); // Safe now that we confirmed it's a valid Date
    
        if (date < minDate) {
            throw new Error("Event date must be at least one month in the future.");
        }
        return date;
    }
    

    private validateDuration(duration: number): number {
        if (duration <= 0) {
            throw new Error("Duration must be a positive number.");
        }
        return duration;
    }

    private validateDescription(description: string): string {
        if (!description || description.trim() === "") {
            throw new Error("Description cannot be empty.")
        }
        return description
    }

    private validateStatus(status: string): string {
        const allowedStatuses = ["Upcoming", "Ongoing", "Past"];
        if (allowedStatuses.indexOf(status) === -1) {
            throw new Error(`Invalid event status. Allowed statuses are: ${allowedStatuses.join(", ")}.`);
        }
        return status;
    }
    getId(): number | undefined {
        return this.id;
    }

    getTitle(): string {
        return this.title;
    }

    getGenre(): string {
        return this.genre;
    }

    getTime(): string {
        if (!this.time.match(/^\d{2}:\d{2}$/)) {
            throw new Error("Time must be in the format 'HH:MM'.");
        }
    
        const [hours, minutes] = this.time.split(":");
    
        // Ensure hours and minutes are valid
        const formattedHours = hours.padStart(2, "0");
        const formattedMinutes = minutes.padStart(2, "0");
    
        return `${formattedHours}:${formattedMinutes}`;
    }

    getDate(): Date {
        return this.date;
    }

    getDuration(): number {
        return this.duration;
    }

    getDescription(): string {
        return this.description;
    }

    getStatus(): string {
        return this.status;
    }

    getArtistId(): number {
        return this.artistId;
    }

    getConcertHallId(): number {
        return this.concertHallId;
    }

    setTitle(newTitle: string): void {
        this.title = this.validateTitle(newTitle);
    }

    setDescription(newDescription: string): void {
        this.description = this.validateDescription(newDescription);
    }

    setStatus(newStatus: string): void {
        this.status = this.validateStatus(newStatus);
    }

    static from({ id, title, genre, time, date, duration, description, status, artistId, concertHallId }: EventPrisma) {
        return new Event({
            id,
            title,
            genre,
            time,
            date: new Date(date), // Convert string to Date
            duration,
            description,
            status,
            artistId,
            concertHallId
        });
    }
    
}