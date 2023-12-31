const { pool } = require('../database');

class SelectedOption {
  static async getAll() {
    const sql = `
    SELECT text, \`option\`, file, Answer_id, Option_id, Question_id
    FROM selectedoption
    INNER JOIN answer
    ON selectedoption.Answer_id = answer.id;
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
    SELECT text, \`option\`, file, Answer_id, Option_id, Question_id
    FROM selectedoption
    INNER JOIN answer
    ON selectedoption.Answer_id = answer.id
    WHERE selectedoption.Answer_id = ?;
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

  static async add({ Option_id, Answer_id }) {
    const sql = `
    INSERT INTO selectedoption(Option_id, Answer_id)
    VALUES(?, ?)
    `;

    try {
      const connection = await pool.getConnection();
      await connection.execute(sql, [Option_id, Answer_id]);
      connection.release();
      return 'Successfully added!';
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = SelectedOption;
