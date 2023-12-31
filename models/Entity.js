const { pool } = require('../database');

class Entity {
  static async getAll(table) {
    const sql = `
    SELECT *
    FROM ${table};
    `;

    try {
      const connection = await pool.getConnection();
      const [entityRecord] = await connection.execute(sql);
      connection.release();
      return entityRecord;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async getById(table, id) {
    const sql = `
    SELECT *
    FROM ${table}
    WHERE id = ?;
    `;

    try {
      const connection = await pool.getConnection();
      const [entityRecord] = await connection.execute(sql, [id]);
      connection.release();
      return entityRecord;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async deleteById(table, id) {
    const entityRecord = await this.getById(table, id);
    const sql = `
    DELETE FROM ${table}
    WHERE id = ?;
    `;

    try {
      const connection = await pool.getConnection();
      await connection.execute(sql, [id]);
      connection.release();
    } catch (err) {
      throw new Error(err);
    }

    return entityRecord;
  }
}

module.exports = Entity;
