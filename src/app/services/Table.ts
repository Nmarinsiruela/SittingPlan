export class Table {
    id: number;
    planId: number;
    name: string;
    type: string;
    seats: number;
    people: string[];

    constructor(name: string = '', type: string = '', seats: number = -1) {
        this.id = -1;
        this.planId = -1;
        this.name = name;
        this.type = type;
        this.seats = seats;
        this.people = [];
    }

    setId(id: number) {
        this.id = id;
    }

    setPlanId(id: number) {
        this.planId = id;
    }

    setPeople(people: string[] = []) {
        this.people = people;
    }
}
