import { Event as EventPrisma } from '@prisma/client';

export class Event {
    private id?: number;
    private title: string;
    private genre: string;
    private time: Date;
    private date: Date;
    private duration: number;
    private description: string;
    private status: string;

    constructor(event: { id?: number; title: string; genre: string; time: string; date: Date; duration: number; description: string; status: string}) {
        this.id = event.id;
        this.title = this.validateTitle(event.title);
        this.genre = this.validateGenre(event.genre);
        this.time = this.parseAndValidateTime(event.time);
        this.date = this.validateDate(event.date);
        this.duration = this.validateDuration(event.duration);
        this.description = this.validateDescription(event.description);
        this.status = this.validateStatus(event.status);
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

    private parseAndValidateTime(timeString: string): Date {
        if (!timeString.match(/^\d{2}:\d{2}$/)) {
            throw new Error("Time must be in the format 'HH:MM'.");
        }        
        
        if (parseInt(timeString.slice(0, 2)) >= 24) {
            throw new Error("Invalid time provided.");
        }

        if (parseInt(timeString.slice(3)) >= 60) {
            throw new Error("Invalid time provided.");
        }

        const [hours, minutes] = timeString.split(":").map(Number);
        const time = new Date();
        time.setHours(hours, minutes, 0, 0);

        if (isNaN(time.getTime())) {
            throw new Error("Invalid time provided.");
        }

        return time;
    }

    private validateDate(date: Date): Date {
        const now = new Date();
        const minDate = new Date();
        minDate.setMonth(now.getMonth() + 1);
        minDate.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);

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
        const hours = ("0" + this.time.getHours()).slice(-2);
        const minutes = ("0" + this.time.getMinutes()).slice(-2);
        return `${hours}:${minutes}`;
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

    setTitle(newTitle: string): void {
        this.title = this.validateTitle(newTitle);
    }

    setDescription(newDescription: string): void {
        this.description = this.validateDescription(newDescription);
    }

    setStatus(newStatus: string): void {
        this.status = this.validateStatus(newStatus);
    }

    static from({ id, title, genre,  time, date, duration, description, status}: EventPrisma) {
        return new Event({
            id,
            title,
            genre,
            time,
            date,
            duration,
            description,
            status,
        });
    }
}