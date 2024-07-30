import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger'
import { dataTypes_POST } from "./dataTypes"


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
  .get("/api/v1/GetParams/:text", async ({ params }: { params: { text: string } }) => {
    const data = `Test Params ${params.text}`
    return data
  }, {
    detail: {
      tags: ['Api_Get']
    }
  })
  // .post("/api/v1/auth/Login", async ({ body }: { body: dataTypes_POST }) => {
  //   const username = body.username;
  //   const password = body.password;
  //   const result = `Your Username is ${username} and Your Password is ${password}`
  //   return result
  // }, {
  //   type: 'json',
  // })
  .post("/api/v1/auth/Login", async ({ body }: { body: dataTypes_POST }) => {
    const username = body.username;
    const password = body.password;
    const result = `Your Username is ${username} and Your Password is ${password}`
    return result
  }, {
    detail: {
      tags: ['Api_Post'],
      requestBody: {
        description: "Example Body for Login",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                username: { type: "string" },
                password: { type: "number" },
              },
              required: ["username", "password"],
            },
            example: {
              username: "Test_UserName",
              password: 123456,
            }
          }
        }
      },
    },
    type: 'json',
  })
  .listen(3000);


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);


