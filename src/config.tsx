interface CONFIG {
    apiURL: string,
    tags:{
        space: "PUBLIC" | "USER",
        layout: "STANDARD" | "BOXED",
    }
}

export var CONFIG: CONFIG = {
    apiURL: "",
    tags:{
        space: "USER",
        layout: "STANDARD",
    }
}