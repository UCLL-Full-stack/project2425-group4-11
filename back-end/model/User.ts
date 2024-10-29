export class User {
    private id?: number;
    private email: string;
    private password: string;
    private firstName: string;
    private lastName: string;
    private phoneNumber: string;
    // details: wat was dit ook alweer?
    private accountStatus: boolean;

    constructor(user: { id?: number; email: string; password: string; firstName: string; lastName: string; phoneNumber: string; accountStatus: boolean }) {
        this.id = user.id;
        this.email = this.validateEmail(user.email);
        this.password = user.password;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.phoneNumber = user.phoneNumber;
        this.accountStatus = user.accountStatus;
    }

    // private validatePassword(password: string): string {
    //     return `hashed_${password}`;
    // }

    private validateEmail(email: string): string {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }
        return email;
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

    getPhoneNumber(): string {
        return this.phoneNumber;
    }

    getAccountStatus(): boolean {
        return this.accountStatus;
    }

    setPhoneNumber(newPhoneNumber: string): void {
        this.phoneNumber = newPhoneNumber;
    }

    setAccountStatus(newAccountStatus: boolean): void {
        this.accountStatus = newAccountStatus;
    }
}