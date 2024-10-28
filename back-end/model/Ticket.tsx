export class Ticket {
    private id?: number;
    private type: string;
    private status: boolean;
    private price: number;
    private seat: string;
    private date: Date;

    constructor(ticket: { id?: number; type: string; status: boolean; price: number; seat: string; date: Date }) {
        this.id = ticket.id;
        this.type = this.validateType(ticket.type);
        this.status = ticket.status;
        this.price = this.validatePrice(ticket.price);
        this.seat = ticket.seat;
        this.date = this.validateDate(ticket.date);
    }

    private validateType(type: string): string {
        const allowedTypes = ["VIP", "Regular", "Student"];
        if (allowedTypes.indexOf(type) === -1) {
            throw new Error(`Invalid ticket type. Allowed types are: ${allowedTypes.join(", ")}`);
        }
        return type;
    }

    private validatePrice(price: number): number {
        if (price < 0) {
            throw new Error("Price must be a positive number.")
        }
        return price;
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

    getId(): number | undefined {
        return this.id;
    }

    getType(): string {
        return this.type;
    }

    getStatus(): boolean {
        return this.status;
    }

    getPrice(): number {
        return this.price;
    }

    getSeat(): string {
        return this.seat;
    }

    getDate(): Date {
        return this.date;
    }

    setStatus(newStatus: boolean): void {
        this.status = newStatus;
    }

    setSeat(newSeat: string): void {
        this.seat = newSeat;
    }
}