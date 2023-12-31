const { pool } = require('../database');

class Respondent {
  static async getAll() {
    const sql = `
    SELECT *
    FROM user
    INNER JOIN respondent
    ON respondent.User_id = user.id;
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
    INNER JOIN respondent
    ON respondent.User_id = user.id
    WHERE respondent.id = ?;
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
    INSERT INTO respondent(User_id, Answer_id)
    VALUES(?, ?)
    `;

    try {
      const connection = await pool.getConnection();
      const creationReport = await connection.execute(sql, [User_id, Answer_id]);
      const addedRespondentId = creationReport[0].insertId;
      connection.release();
      return await Respondent.getById(addedRespondentId);
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = Respondent;