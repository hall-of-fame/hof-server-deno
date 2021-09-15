import { Context } from "https://deno.land/x/oak@v9.0.0/mod.ts";

function departments(ctx: Context) {
    console.log("departments")
}

function multiple(ctx: Context) {
    console.log("multiple")
}

function popular(ctx: Context) {
    console.log("popular")
}

export {
    departments,
    multiple,
    popular
}