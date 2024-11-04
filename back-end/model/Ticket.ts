export class Ticket {
    private id?: number;
    private type: string;
    private status: string;
    private price: number;    
    private generalAdmission: boolean;
    private seat: string | null;

    constructor(ticket: { id?: number; type: string; status: string; price: number; generalAdmission: boolean; seat: string | null }) {
        this.id = ticket.id;
        this.type = this.validateType(ticket.type);
        this.status = this.validateStatus(ticket.status);
        this.price = this.validatePrice(ticket.price);        
        this.generalAdmission = this.validateAdmission(ticket.generalAdmission);
        this.seat = this.validateSeat(ticket.seat, ticket.generalAdmission);
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

    private validateSeat(seat: string | null, generalAdmission: boolean): string | null {
        if (generalAdmission) {
            if (seat !== null ) {
                throw new Error('There are no seats in a general admission.');
            }
        }
        if (!seat || seat.trim() === "") {
            throw new Error("Seat cannot be empty.");
        }
        return seat;
    }

    private validateAdmission(generalAdmission: boolean): boolean {
        if (typeof generalAdmission !== 'boolean') {
            throw new Error('General Admission must be a boolean.');
        }
        return generalAdmission;
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

    getSeat(): string | null{
        return this.seat;
    }

    getGeneralAdmission(): boolean {
        return this.generalAdmission;
    }

    setStatus(newStatus: string): void {
        this.status = this.validateStatus(newStatus);
    }

    setSeat(newSeat: string): void {
        this.seat = this.validateSeat(newSeat, this.generalAdmission);
    }
}