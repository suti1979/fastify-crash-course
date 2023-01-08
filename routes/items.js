const { getItems, getItem, addItem, deleteItem, updateItem } = require("../controllers/items")

// Item schema
const Item = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
  },
}

// Options for get all items
const getItemsOpts = {
  schema: {
    response: {
      200: {
        type: "array",
        items: Item,
      },
    },
  },
  handler: getItems,
}

const getItemOpts = {
  schema: {
    response: {
      200: Item,
    },
    params: {
      type: "object",
      properties: {
        id: { type: "string" },
      },
    },
  },

  handler: getItem,
}

const postItemOpts = {
  schema: {
    body: {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string" },
      },
    },
    response: {
      201: Item,
    },
  },
  handler: addItem,
}

const deleteItemOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
    params: {
      type: "object",
      properties: {
        id: { type: "string" },
      },
    },
  },
  handler: deleteItem,
}

const updateItemOpts = {
  schema: {
    response: {
      200: Item,
    },
    params: {
      type: "object",
      properties: {
        id: { type: "string" },
      },
    },
    body: {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string" },
      },
    },
  },
  handler: updateItem,
}



const authMiddleware = function (request, reply, done) {
  const authCookie = request.cookies["auth_token"]
  if (!authCookie) {
    // the auth_token cookie is not present
    return reply.send(401, "Unauthorized")
  }
  // the auth_token cookie is present
  // you can now verify the token and proceed with the request
  done()
}

function itemRoutes(fastify, options, done) {
  fastify.post("/login", (request, reply) => {
    // set the auth_token cookie
    reply.setCookie("auth_token", "za42", {
      path: "/",
      httpOnly: true,
      secure: false,
      maxAge: 3600,
    })
    reply.send({ message: "ok" })
  })
  // Get all items
  fastify.get("/items", getItemsOpts)

  // Get single items
  fastify.get("/items/:id", getItemOpts)

  // Add item
  fastify.post("/items", postItemOpts)

  // Delete item
  fastify.delete("/items/:id", deleteItemOpts)

  // Update item
  fastify.put("/items/:id", updateItemOpts)

  done()
}

module.exports = itemRoutes
