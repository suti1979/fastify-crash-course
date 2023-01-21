const {
  getItems,
  getItem,
  addItem,
  deleteItem,
  updateItem,
  login,
} = require("../controllers/items")

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

const loginOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
  handler: login,
}

function itemRoutes(fastify, options, done) {
  fastify.post("/login", loginOpts)
  fastify.get("/items", getItemsOpts)
  fastify.get("/items/:id", getItemOpts)
  fastify.post("/items", postItemOpts)
  fastify.delete("/items/:id", deleteItemOpts)
  fastify.put("/items/:id", updateItemOpts)
  done()
}

module.exports = itemRoutes
