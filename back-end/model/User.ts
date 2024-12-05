import { Role } from "../types";
import { User as UserPrisma } from '@prisma/client';

export class User {
    private id?: number;
    private email: string;
    private password: string;
    private firstName: string;
    private lastName: string;
    private username: string;
    private phoneNumber: string;
    private accountStatus: boolean;
    private role: Role;

    constructor(user: { id?: number; email: string; password: string; firstName: string; lastName: string; username: string; phoneNumber: string; accountStatus: boolean; role: Role }) {
        this.id = user.id;
        this.email = this.validateEmail(user.email);
        this.password = this.validatePassword(user.password);
        this.firstName = this.validateName(user.firstName, "First name");
        this.lastName = this.validateName(user.lastName, "Last name");
        this.username = this.validateName(user.username, "Username");
        this.phoneNumber = this.validatePhoneNumber(user.phoneNumber);
        this.accountStatus = this.validateAccountStatus(user.accountStatus);
        this.role = user.role;
    }

    private validatePassword(password: string): string {
        if (password.length < 8) {
            throw new Error("Password must be at least 8 characters long.");
        }
        return `hashed_${password}`;
    }

    private validateEmail(email: string): string {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format.');
        }
        return email;
    }

    private validateName(name: string, fieldName: string): string {
        if (!name.trim() || /[^a-zA-Z\s]/.test(name)) {
            throw new Error(`${fieldName} cannot be empty and must contain only alphabetic characters.`);
        }
        return name;
    }

    private validatePhoneNumber(phoneNumber: string): string {
        const phoneRegex = /^\+?[0-9]\d{1,14}$/;
        if (!phoneRegex.test(phoneNumber)) {
            throw new Error("Invalid phone number format.");
        }
        return phoneNumber;
    }

    private validateAccountStatus(status: boolean): boolean {
        if (typeof status !== "boolean") {
            throw new Error("Account status must be a boolean.");
        }
        return status;
    }

    getId(): number | undefined {
        return this.id;
    }

    getEmail(): string {
        return this.email;
    }    
    
    getPassword(): string {
        return this.password;
    }

    getFirstName(): string {
        return this.firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    getUsername(): string {
        return this.username;
    }

    getPhoneNumber(): string {
        return this.phoneNumber;
    }

    getAccountStatus(): boolean {
        return this.accountStatus;
    }

    getRole(): Role {
        return this.role;
    }

    setPhoneNumber(newPhoneNumber: string): void {
        this.phoneNumber = newPhoneNumber;
    }

    setAccountStatus(newAccountStatus: boolean): void {
        this.accountStatus = newAccountStatus;
    }

    static from({ id, email, password, firstName, lastName, username, phoneNumber, accountStatus, role}: UserPrisma) {
        return new User({
            id,
            email,
            password,
            firstName,
            lastName,
            username,
            phoneNumber,
            accountStatus,
            role: role as Role,
        });
    }
}