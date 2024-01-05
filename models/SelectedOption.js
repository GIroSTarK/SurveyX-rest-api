const { pool } = require('../database');
const Entity = require('./Entity');

class SelectedOption {
  static async getAll() {
    return await Entity.getAll('selectedoption');
  }

  static async getById(id) {
    return await Entity.getById('selectedoption', id);
  }

  static async deleteById(id) {
    return await Entity.deleteById('selectedoption', id);
  }

  static async add({ Option_id, Answer_id }) {
    const sql = `
    INSERT INTO selectedoption(Option_id, Answer_id)
    VALUES(?, ?)
    `;

    try {
      const connection = await pool.getConnection();
      const creationReport = await connection.execute(sql, [
        Option_id,
        Answer_id,
      ]);
      const addedOptionId = creationReport[0].insertId;
      connection.release();
      return await SelectedOption.getById(addedOptionId);
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = SelectedOption;
