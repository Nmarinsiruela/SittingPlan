export class Table {
    private id: number;
    private planId: number;
    name: string;
    type: string;
    seats: number;

    constructor(name: string, type: string, seats: number) {
        this.id = -1;
        this.planId = -1;
        this.name = name;
        this.type = type;
        this.seats = seats;
    }

    setId(id: number) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    setPlanId(id: number) {
        this.planId = id;
    }

    getPlanId() {
        return this.planId;
    }
}
