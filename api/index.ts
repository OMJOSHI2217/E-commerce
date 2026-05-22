// @ts-ignore
import handler from '../dist/server/server.js';

export default async function (request: Request) {
  return handler.fetch(request, {}, {});
}
