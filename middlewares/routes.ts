import { Context, Router } from "https://deno.land/x/oak@v9.0.0/mod.ts";
import departmentsData from "../services/departments.ts";
import multipleData from "../services/multiple.ts";
import popularData from "../services/popular.ts";

function departments(ctx: Context) {
    ctx.response.body = departmentsData;
}

function multiple(ctx: Context) {
    ctx.response.body = multipleData;
}

function popular(ctx: Context) {
    ctx.response.body = popularData;
}

const router = new Router()
    .get("/departments", departments)
    .get("/multiple", multiple)
    .get("/popular", popular);

const routes = router.routes();

export default routes;
