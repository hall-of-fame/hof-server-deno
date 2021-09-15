import { Context } from "https://deno.land/x/oak@v9.0.0/mod.ts";
import departmentsData from "./services/departments.ts";

function departments(ctx: Context) {
    ctx.response.body = departmentsData;
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