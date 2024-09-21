import {Hono} from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import {signupInput, signinInput} from "@vaibhavpal99/common_2"

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    SECRET_KEY: string;
  };
  Variables: {
    userId: string;
  };
}>();


userRouter.use("/*", async (c, next) => {
 
  const authheader = c.req.header("Authorization") || " ";

  const isPublicRoute = c.req.path === '/api/v1/user/signup' || c.req.path === '/api/v1/user/signin';

  if (isPublicRoute) {
    // Skip authentication for public routes
    console.log("Failing to connect");
    await next();
    return;
  }

  try {
    const user = (await verify(authheader, c.env.SECRET_KEY)) as { id: string };

    if (user) {
      c.set("userId", user.id);
      await next();
    } else {
      c.status(403);
      return c.json({
        msg: "wrong jwt sent, you are not an authorized user!",
      });
    }
  } catch (e) {
    c.status(403);
    return c.json({
      msg: "An exception has occured while fetching you request",
    });
  }
});



  
  userRouter.post("/signup", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    const {success} = signupInput.safeParse(body);

    if(!success){
        c.status(411);
        return c.json({
            msg: "Inputs are incorrect!",
        })
    }
  
    try {
      const user = await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: body.password,
        },
      });
  
  
      const token = await sign({ id: user.id }, c.env.SECRET_KEY);
      return c.json({jwt : token});;
    } catch (e) {
      console.log(e);
      c.status(403);
      return c.text("Not able to signup");
    }
  });



  
 userRouter.post("/signin", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    const {success} = signinInput.safeParse(body);

    if(!success){
      c.status(411);
      return c.json({
          msg: "Inputs are incorrect!",
      })
  }
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: body.email,
          password: body.password,
        },
      });
  
      if (!user) {
        c.status(403);
        return c.json({
          error: "User not found",
        });
      }
      console.log(user);
      // const query = `{SELECT * FROM users WHERE email = ${body.email}}`;
  
      const jwt = await sign(
        {
          id: user.id,
        },
        c.env.SECRET_KEY
      );
  
      return c.json({jwt: jwt, name: user.name});
    } catch (e) {
      console.log(e);
      return c.json({
        msg: "invalid",
      });
    }
  });

  userRouter.get('/:id', async (c) => {


    try {
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
  
      const id = c.req.param("id");
  
      const blogs = await prisma.post.findMany({
        where: {
          authorId: id,
        },
        select: {
          id: true,
          title: true,
          content: true,
          author: {
            select: {
              name: true
            }
          }
  
        }
      });

      const details = await prisma.user.findUnique({
        where: {
          id: id,
        },select: {
          id: true,
          name:true,
          email: true,
          password : true,
        }
      })
  
      return c.json({
        blogs,
        details,
      });
    } catch (e) {
      c.status(411);
      return c.json({
        msg: "Error while fetching the blog post",
      });
    }


  })

