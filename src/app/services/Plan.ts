export class Plan {
    private id: number;
    name: string;
    type: string;
    date: string;
    place: string;

    constructor(name: string, type: string, date: string, place: string) {
        this.id = -1;
        this.name = name;
        this.type = type;
        this.date = date;
        this.place = place;
    }

    setId(id: number) {
        this.id = id;
    }

    getId() {
        return this.id;
    }
}
