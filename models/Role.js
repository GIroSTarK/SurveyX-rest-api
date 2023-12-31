const { pool } = require('../database');
const Entity = require('./Entity');

class Role {
  static async getAll() {
    return await Entity.getAll('role');
  }

  static async getById(id) {
    return await Entity.getById('role', id);
  }

  static async deleteById(id) {
    return await Entity.deleteById('role', id);
  }

  static async create({ name, description }) {
    const sql = `
    INSERT INTO role(
      name,
      description
    )
    VALUES(?, ?)
    `;

    try {
      const connection = await pool.getConnection();
      const creationReport = await connection.execute(sql, [name, description]);
      const addedRoleId = creationReport[0].insertId;
      connection.release();
      return await Role.getById(addedRoleId);
    } catch (err) {
      throw new Error(err);
    }
  }

  static async updateById(id, { name, description }) {
    const sql = `
    UPDATE role
    SET
      name = ?,
      description = ?
    WHERE id = ?;
    `;

    try {
      const connection = await pool.getConnection();
      await connection.execute(sql, [name, description, id]);
      connection.release();
      return await Role.getById(id);
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = Role;