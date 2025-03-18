export class DatabaseError extends Error {
    constructor(message: any) {
        super(message);
        this.name = "DatabaseError";
    }
}
