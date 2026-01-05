import { Request, Response } from "express";

class $1Controller {
  getAll(req: Request, res: Response) {
    res.json({ message: "Get all $1" });
  }

  getById(req: Request, res: Response) {
    const { id } = req.params;
    res.json({ message: "Get $1 by id", id });
  }

  create(req: Request, res: Response) {
    const data = req.body;
    res.status(201).json({ message: "Created $1", data });
  }

  update(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;
    res.json({ message: "Updated $1", id, data });
  }

  remove(req: Request, res: Response) {
    const { id } = req.params;
    res.json({ message: "Deleted $1", id });
  }
}

export default new $1Controller();
