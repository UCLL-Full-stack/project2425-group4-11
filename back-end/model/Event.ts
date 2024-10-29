export class Event {
    private id?: number;
    private genre: string;
    private time: Date;
    private date: Date;
    private price: number;
    private duration: number;
    private description: string;
    private status: string;

    constructor(event: { id?: number; genre: string; time: string; date: Date; price: number; duration: number; description: string; status: string}) {
        this.id = event.id;
        this.genre = event.genre;
        this.time = this.parseTime(event.time);
        this.date = this.validateDate(event.date);
        this.price = this.validatePrice(event.price);
        this.duration = this.validateDuration(event.duration);
        this.description = event.description;
        this.status = this.validateStatus(event.status);
    }

    private parseTime(timeString: string): Date {
        const [hours, minutes] = timeString.split(":").map(Number);
        const time = new Date();
        time.setHours(hours, minutes, 0, 0);
        return time;
    }

    private validateDate(date: Date): Date {
        const now = new Date();
        const minDate = new Date();
        minDate.setMonth(now.getMonth() + 1);

        if (date < minDate) {
            throw new Error("Ticket date must be at least one month in the future.");
        }
        return date;
    }

    private validatePrice(price: number): number {
        if (price < 0) {
            throw new Error("Price must be a positive number.")
        }
        return price;
    }

    private validateDuration(duration: number): number {
        if (duration <= 0) {
            throw new Error("Duration must be a positive number.");
        }
        return duration;
    }

    private validateStatus(status: string): string {
        const allowedStatuses = ["Upcoming", "Ongoing", "Past"];
        if (allowedStatuses.indexOf(status) === -1) {
            throw new Error(`Invalid event status. Allowed statuses are: ${allowedStatuses.join(", ")}`);
        }
        return status;
    }

    getId(): number | undefined {
        return this.id;
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

    getPrice(): number {
        return this.price;
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

    setDescription(newDescription: string): void {
        this.description = newDescription;
    }

    setStatus(newStatus: string): void {
        this.status = this.validateStatus(newStatus);
    }
}