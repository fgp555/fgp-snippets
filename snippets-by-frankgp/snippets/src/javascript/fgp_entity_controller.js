class $1Controller {
  getAll(req, res) {
    res.json({ message: "Get all $1" });
  }

  getById(req, res) {
    const { id } = req.params;
    res.json({ message: "Get $1 by id", id });
  }

  create(req, res) {
    const data = req.body;
    res.status(201).json({ message: "Created $1", data });
  }

  update(req, res) {
    const { id } = req.params;
    const data = req.body;
    res.json({ message: "Updated $1", id, data });
  }

  remove(req, res) {
    const { id } = req.params;
    res.json({ message: "Deleted $1", id });
  }
}

module.exports = new $1Controller();
