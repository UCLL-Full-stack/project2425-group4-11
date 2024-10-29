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
        this.contactInfo = this.validateContactInfo(concertHall.contactInfo);
    }

    private validateCapacity(capacity: number): number {
        if (capacity < 0) {
            throw new Error("Capacity must be a positive number.");
        }
        if (capacity > 100000) { 
            throw new Error("Capacity seems unrealistically large.");
        }
        return capacity;
    }

    private validateContactInfo(contactInfo: ContactInfo): ContactInfo {
        if (!this.validateEmail(contactInfo.email)) {
            throw new Error("Invalid email format.");
        }
        if (!this.validateCountryCode(contactInfo.countryCode)) {
            throw new Error("Invalid country code. It should start with '+' followed by 1 to 3 digits.");
        }
        if (!this.validatePhoneNumber(contactInfo.number)) {
            throw new Error("Invalid phone number. It should contain only numbers and be between 7 and 15 digits.");
        }
        if (!this.validateInstagram(contactInfo.instagram)) {
            throw new Error("Invalid Instagram handle. It should start with '@' and be between 2 and 30 characters long.");
        }
        return contactInfo;
    }

    private validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    private validatePhoneNumber(number: string): boolean {
        const phoneRegex = /^\d{7,15}$/;
        return phoneRegex.test(number);
    }

    private validateCountryCode(countryCode: string): boolean {
        const countryCodeRegex = /^\+\d{1,3}$/;
        return countryCodeRegex.test(countryCode);
    }

    private validateInstagram(instagram: string): boolean {
        const instagramRegex = /^@[A-Za-z0-9_.]{1,29}$/;
        return instagramRegex.test(instagram);
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
        const updatedContactInfo = { ...this.contactInfo, ...newContactInfo };
        this.contactInfo = this.validateContactInfo(updatedContactInfo);
    }
}