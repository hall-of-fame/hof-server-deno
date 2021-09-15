import { Context } from "https://deno.land/x/oak@v9.0.0/mod.ts";
import departmentsData from "./services/departments.ts";
import multipleData from "./services/multiple.ts";
import popularData from "./services/popular.ts"

function departments(ctx: Context) {
    ctx.response.body = departmentsData;
}

function multiple(ctx: Context) {
    ctx.response.body = multipleData;
}

function popular(ctx: Context) {
    ctx.response.body = popularData;
}

export {
    departments,
    multiple,
    popular
}