import { Role } from "../types";
import { ConcertHall as ConcertHallPrisma } from '@prisma/client';

export class ConcertHall {
    private id?: number;
    private location: string;
    private capacity: number;
    private name: string;
    private facilities: string[];
    private contactInfo: string[];
    private isVerified: string;
    private username: string;
    private password: string;
    private role: Role;

    constructor(concertHall: { id?: number; location: string; capacity: number; name: string; facilities: string[]; contactInfo: string[]; isVerified: string, username: string; password: string; role: Role }) {
        this.id = concertHall.id;
        this.location = this.validateLocation(concertHall.location);
        this.capacity = this.validateCapacity(concertHall.capacity);
        this.name = this.validateName(concertHall.name);
        this.facilities = this.validateFacilities(concertHall.facilities);
        this.contactInfo = this.validateContactInfo(concertHall.contactInfo);
        this.isVerified = this.validateVerification(concertHall.isVerified);
        this.username = this.validateConcertHallUsername(concertHall.username);
        this.password = this.validatePassword(concertHall.password);
        this.role = concertHall.role;
    }

    private validateConcertHallUsername(username: string): string {
        if (!username || username.trim() === '') {
            throw new Error("Artist name cannot be empty.");
        }
        return username;
    }

    private validatePassword(password: string): string {
        if (password.length < 8) {
            throw new Error("Password must be at least 8 characters long.");
        }
        return password;
    }

    private validateVerification(isVerified: string): string {
        const allowedVerifications = ["Not verified", "Pending", "Verified"];
        if (allowedVerifications.indexOf(isVerified) === -1) {
            throw new Error(`Invalid verification. Allowed verifications are: ${allowedVerifications.join(", ")}`);
        }
        return isVerified;
    }

    private validateLocation(location: string): string {
        if (!location || location.trim() === '') {
            throw new Error("Location cannot be empty.");
        }
        return location;
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

    private validateName(name: string): string {
        if (!name || name.trim() === '') {
            throw new Error("Name cannot be empty.");
        }
        if (name.length > 100) {
            throw new Error("Name is too long. It should be under 100 characters.");
        }
        return name;
    }

    private validateFacilities(facilities: string[]): string[] {
        if (!Array.isArray(facilities)) {
            throw new Error("Facilities must be an array.");
        }
        facilities.forEach((facility, index) => {
            if (!facility || facility.trim() === '') {
                throw new Error(`Facility at index ${index} cannot be empty.`);
            }
        });
        return facilities;
    }

    private validateContactInfo(contactsInfo: string[]): string[] {
        if (!Array.isArray(contactsInfo)) {
            throw new Error("Facilities must be an array.");
        }
        contactsInfo.forEach((contactInfo, index) => {
            if (!contactInfo || contactInfo.trim() === '') {
                throw new Error(`Facility at index ${index} cannot be empty.`);
            }
        });
        return contactsInfo;
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

    getContactInfo(): string[] {
        return this.contactInfo;
    }
    getIsVerified(): string {
        return this.isVerified;
    }

    getUsername(): string {
        return this.username;
    }

    getPassword(): string {
        return this.password;
    }

    getRole(): Role {
        return this.role;
    }

    setFacilities(newFacility: string): void {
        this.facilities.push(newFacility);
    }
    
    setIsVerified(newVerified: string): void {
        this.isVerified = newVerified;
    }

    static from ({id, location, capacity, name, facilities, contactInfo, isVerified, username, password, role}: ConcertHallPrisma) {
        return new ConcertHall({
            id, 
            location, 
            capacity, 
            name, 
            facilities, 
            contactInfo,
            isVerified,
            username,
            password,
            role: role as Role
        });
    }
}