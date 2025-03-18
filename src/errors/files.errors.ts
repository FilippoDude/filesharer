export class FilesError extends Error {
    constructor(message: any) {
        super(message);
        this.name = "FilesError";
    }
}
