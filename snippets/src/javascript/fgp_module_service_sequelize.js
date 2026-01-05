const { $1 } = require("../models");

class $1Service {
  async findAll() {
    return await $1.findAll();
  }

  async findById(id) {
    return await $1.findByPk(id);
  }

  async create(data) {
    return await $1.create(data);
  }

  async update(id, data) {
    const record = await $1.findByPk(id);
    return record ? await record.update(data) : null;
  }

  async remove(id) {
    const record = await $1.findByPk(id);
    return record ? await record.destroy() : null;
  }
}

module.exports = new $1Service();
