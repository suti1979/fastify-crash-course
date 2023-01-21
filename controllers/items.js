const { v4: uuidv4 } = require("uuid")
let items = require("../Items")

const getItems = (req, reply) => {
  reply.send(items)
}

const getItem = (req, reply) => {
  const { id } = req.params
  const item = items.find((item) => item.id === id)
  reply.send(item)
}

const addItem = (req, reply) => {
  const { name } = req.body
  const item = { id: uuidv4(), name }
  items = [...items, item]
  reply.code(201).send(item)
}

const deleteItem = (req, reply) => {
  const { id } = req.params
  items = items.filter((item) => item.id !== id)
  reply.send({ message: `Item ${id} has been removed` })
}

const updateItem = (req, reply) => {
  const { id } = req.params
  const { name } = req.body
  items = items.map((item) => (item.id === id ? { id, name } : item))
  item = items.find((item) => item.id === id)
  reply.send(item)
}

const login = (req, reply) => {
  reply.setCookie("auth_token", "za42", {
    path: "/",
    httpOnly: true,
    location: "localhost",
    secure: false,
    //maxAge: 3600,
  })
  reply.send({ message: "ok" })
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

module.exports = {
  getItems,
  getItem,
  addItem,
  deleteItem,
  updateItem,
  login,
}
