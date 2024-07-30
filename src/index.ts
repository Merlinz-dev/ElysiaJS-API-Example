import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger'

const app = new Elysia()
  .use(swagger({
    documentation: {
      info: {
        title: 'ElysiaJS  API Documentation',
        version: '1.0.0'
      },
      tags: [
        { name: 'Api_Get', description: 'General endpoints' },
        { name: 'Api_Post', description: 'General endpoints' },
        { name: 'Auth', description: 'Authentication endpoints' }
      ]
    }
  }))
  .get("/", () => "Hello Elysia", {
    detail: {
      tags: ['Api_Get']
    }
  })
  .get("/GetParams/:text", async ({ params }: {params: { text: string }}) => {
    const data = `Test Params ${params.text}`
    return data
  }, {
    detail: {
      tags: ['Api_Get']
    }
  })
  .listen(3000);


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);


