export class ConcertHall {
    private id?: number;
    private location: string;
    private capacity: number;
    private name: string;
    private facilities: string[];
    private contactInfo: ContactInfo;

    constructor(concertHall: { id?: number; location: string; capacity: number; name: string; facilities: string[]; contactInfo: ContactInfo }) {
        this.id = concertHall.id;
        this.location = concertHall.location;
        this.capacity = this.validateCapacity(concertHall.capacity);
        this.name = concertHall.name;
        this.facilities = concertHall.facilities;
        this.contactInfo = concertHall.contactInfo;
    }

    private validateCapacity(capacity: number): number {
        if (capacity < 0) {
            throw new Error("Capacity must be a positive number.");
        }
        if (capacity > 100000) { // Arbitrary upper limit for realism
            throw new Error("Capacity seems unrealistically large.");
        }
        return capacity;
    }

    getId(): number | undefined {
        return this.id;
    }

    getLocation(): string {
        return this.location;
    }

    getCapacity(): number {
        return this.capacity;
    }

    getName(): string {
        return this.name;
    }

    getFacilities(): string[] {
        return this.facilities;
    }

    getContactInfo(): ContactInfo {
        return this.contactInfo;
    }

    setFacilities(newFacility: string): void {
        this.facilities.push(newFacility);
    }

    setContactInfo(newContactInfo: Partial<ContactInfo>): void {
        this.contactInfo = { ...this.contactInfo, ...newContactInfo };
    }
}