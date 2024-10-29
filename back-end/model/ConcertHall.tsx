export class ConcertHall {
    private id?: number;
    private location: string;
    private capacity: number;
    private name: string;
    private facilities: string[];
    private contactInfo: string[];

    constructor(concertHall: { id?: number; location: string; capacity: number; name: string; facilities: string[]; contactInfo: string[] }) {
        this.id = concertHall.id;
        this.location = concertHall.location;
        this.capacity = concertHall.capacity;
        this.name = concertHall.name;
        this.facilities = concertHall.facilities;
        this.contactInfo = concertHall.contactInfo;
    }
}