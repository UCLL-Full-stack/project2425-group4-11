export class Ticket {
    private id?: number;
    private type: string;
    private status: string;
    private price: number;
    private seat: string;

    constructor(ticket: { id?: number; type: string; status: string; price: number; seat: string }) {
        this.id = ticket.id;
        this.type = this.validateType(ticket.type);
        this.status = this.validateStatus(ticket.status);
        this.price = this.validatePrice(ticket.price);
        this.seat = this.validateSeat(ticket.seat);
    }

    private validateType(type: string): string {
        const allowedTypes = ["VIP", "Regular", "Student"];
        if (allowedTypes.indexOf(type) === -1) {
            throw new Error(`Invalid ticket type. Allowed types are: ${allowedTypes.join(", ")}`);
        }
        return type;
    }

    private validateStatus(status: string): string {
        const allowedStatuses = ["available", "sold"];
        if (!status || allowedStatuses.indexOf(status) === -1) {
            throw new Error(`Invalid ticket status. Allowed statuses are: ${allowedStatuses.join(", ")}`);
        }
        return status;
    }

    private validatePrice(price: number): number {
        if (price < 0) {
            throw new Error("Price must be a positive number.")
        }
        return price;
    }

    private validateSeat(seat: string): string {
        if (!seat || seat.trim() === "") {
            throw new Error("Seat cannot be empty.");
        }
        return seat;
    }

    getId(): number | undefined {
        return this.id;
    }

    getType(): string {
        return this.type;
    }

    getStatus(): string {
        return this.status;
    }

    getPrice(): number {
        return this.price;
    }

    getSeat(): string {
        return this.seat;
    }

    setStatus(newStatus: string): void {
        this.status = newStatus;
    }

    setSeat(newSeat: string): void {
        this.seat = newSeat;
    }
}