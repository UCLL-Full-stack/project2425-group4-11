import { Ticket as TicketPrisma } from '@prisma/client';

export class Ticket {
    private id?: number;
    private type: string;
    private status: string;
    private price: number;
    private eventId: number; 
    private userId: number | null;

    constructor(ticket: { id?: number; type: string; status: string; price: number; eventId: number; userId: number | null }) {
        this.id = ticket.id;
        this.type = this.validateType(ticket.type);
        this.status = this.validateStatus(ticket.status);
        this.price = this.validatePrice(ticket.price);
        this.eventId = ticket.eventId;
        this.userId = ticket.userId;
    }

    private validateType(type: string): string {
        const allowedTypes = ["VIP", "Regular", "Student"];
        if (allowedTypes.indexOf(type) === -1) {
            throw new Error(`Invalid ticket type. Allowed types are: ${allowedTypes.join(", ")}`);
        }
        return type;
    }

    private validateStatus(status: string): string {
        const allowedStatuses = ["Available", "Sold"];
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

    getEventId(): number {
        return this.eventId;
    }

    getUserId(): number | null {
        return this.userId;
    }

    setStatus(newStatus: string): void {
        this.status = this.validateStatus(newStatus);
    }

    static from({ id, type, status, price, eventId, userId}: TicketPrisma) {
        return new Ticket({
            id,
            type,
            status,
            price,
            eventId,
            userId,
        });
    }
}