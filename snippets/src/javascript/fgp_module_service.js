class $1Service {
  findAll() {
    return [
      { id: 1, name: "$1 A" },
      { id: 2, name: "$1 B" },
    ];
  }

  findById(id) {
    return { id, name: `$1 ${id}` };
  }

  create(data) {
    return { id: Date.now(), ...data };
  }

  update(id, data) {
    return { id, ...data };
  }

  remove(id) {
    return { deleted: true, id };
  }
}

module.exports = new $1Service();
