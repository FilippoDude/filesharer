interface CONFIG {
    apiURL: string,
    tags:{
        space: "PUBLIC" | "USER",
        layout: "STANDARD" | "BOXED",
    }
}

export var CONFIG: CONFIG = {
    apiURL: "http://localhost:3000",
    tags:{
        space: "USER",
        layout: "STANDARD",
    }
}