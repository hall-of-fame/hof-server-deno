import { Context, Router } from 'oak';

import oldDepartmentsData from '../services/old/departments.ts';
import oldMultipleData from '../services/old/multiple.ts';
import oldPopularData from '../services/old/popular.ts';

import departmentsData from '../services/departments.ts';
import avatarsData from '../services/avatars.ts';

function oldDepartments(ctx: Context) {
  ctx.response.body = oldDepartmentsData;
}

function oldMultiple(ctx: Context) {
  ctx.response.body = oldMultipleData;
}

function oldPopular(ctx: Context) {
  ctx.response.body = oldPopularData;
}

function departments(ctx: Context) {
  ctx.response.body = departmentsData;
}

function avatars(ctx: Context) {
  ctx.response.body = avatarsData;
}

const router = new Router()
  .get('/departments', oldDepartments)
  .get('/multiple', oldMultiple)
  .get('/popular', oldPopular)
  .get('/v2/departments', departments)
  .get('/v2/avatars', avatars);

const routes = router.routes();

export default routes;
