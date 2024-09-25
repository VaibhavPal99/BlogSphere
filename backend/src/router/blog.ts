import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import {createBlogInput, updateBlogInput} from "@vaibhavpal99/common_2"

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    SECRET_KEY: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const authheader = c.req.header("Authorization") || " ";

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

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const {success} = createBlogInput.safeParse(body);
  const authorId = c.get("userId");

  if(!success){
    c.status(411);
    return c.json({
        msg : "Inputs are incorrect!",
    })
  }



  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId,
    },
  });

  return c.json({
    id: blog.id,
  });
});

blogRouter.put("/", async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const {success} = updateBlogInput.safeParse(body);

  if(!success){
    c.status(411);
    return c.json({
        msg : "Inputs are incorrect!",
    })
  }


  const blog = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({
    id: blog.id,
  });
});

blogRouter.get("/bulk", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true,
          }
        }
      }
    });
    return c.json({
      blogs,
    });
  } catch (e) {
    c.status(403);
    c.json({
      msg: "Error has occured while fetching the blogs",
    });
  }
});

blogRouter.delete('/:id', async (c) => {

  try{

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");
  const deletedPost = await prisma.post.delete({
    where: {id : id},
  });

  return c.json({ message: 'Post deleted successfully'}, 200);
} catch (e) {
    return c.json({ message: 'Internal Server Error' }, 500);
  }

  
});


blogRouter.get("/:id", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");

    const blog = await prisma.post.findFirst({
      where: {
        id: id,
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

    return c.json({
      blog,
    });
  } catch (e) {
    c.status(411);
    return c.json({
      msg: "Error while fetching the blog post",
    });
  }
});



