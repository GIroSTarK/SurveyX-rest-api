const { pool } = require('../database');
const Entity = require('./Entity');

class UserAnswer {
  static async getAll() {
    return await Entity.getAll('useranswer');
  }

  static async getById(id) {
    return await Entity.getById('useranswer', id);
  }

  static async deleteById(id) {
    return await Entity.deleteById('useranswer', id);
  }

  static async add({ User_id, Answer_id }) {
    const sql = `
    INSERT INTO useranswer(User_id, Answer_id)
    VALUES(?, ?)
    `;

    try {
      const connection = await pool.getConnection();
      const creationReport = await connection.execute(sql, [
        User_id,
        Answer_id,
      ]);
      const addedUserAnswerId = creationReport[0].insertId;
      connection.release();
      return await UserAnswer.getById(addedUserAnswerId);
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = UserAnswer;
