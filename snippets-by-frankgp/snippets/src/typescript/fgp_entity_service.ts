class $1Service {
  findAll(): any[] {
    return [
      { id: 1, name: "$1 A" },
      { id: 2, name: "$1 B" },
    ];
  }

  findById(id: number): any {
    return { id, name: `$1 ${id}` };
  }

  create(data: any): any {
    return { id: Date.now(), ...data };
  }

  update(id: number, data: any): any {
    return { id, ...data };
  }

  remove(id: number): any {
    return { deleted: true, id };
  }
}

export default new $1Service();
