const { pool } = require('../database');

class UserAnswer {
  static async getAll() {
    const sql = `
    SELECT *
    FROM user
    INNER JOIN useranswer
    ON useranswer.User_id = user.id;
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

  static async getById(id) {
    const sql = `
    SELECT *
    FROM user
    INNER JOIN useranswer
    ON useranswer.User_id = user.id
    WHERE useranswer.id = ?;
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
