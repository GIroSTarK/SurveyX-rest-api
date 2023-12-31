const { pool } = require('../database');
const Entity = require('./Entity');

class Answer {
  static async getAll() {
    return await Entity.getAll('answer');
  }

  static async getById(id) {
    return await Entity.getById('answer', id);
  }

  static async deleteById(id) {
    return await Entity.deleteById('answer', id);
  }

  static async getByQuestionId(id) {
    const sql = `
    SELECT answer.id, \`option\`, text, file, Question_id
    FROM answer
    INNER JOIN question
    ON answer.Question_id = question.id
    WHERE question.id = ?;
    `;

    try {
      const connection = await pool.getConnection();
      const [questions] = await connection.execute(sql, [id]);
      connection.release();
      return questions;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async add({ text = null, option = null, file = null, Question_id }) {
    const sql = `
    INSERT INTO answer
    (text, \`option\`, file, Question_id)
    VALUES (?, ?, ?, ?);
    `;

    try {
      const connection = await pool.getConnection();
      const creationReport = await connection.execute(sql, [
        text,
        option,
        file,
        Question_id,
      ]);
      const addedAnswerId = creationReport[0].insertId;
      connection.release();
      return await Answer.getById(addedAnswerId);
    } catch (err) {
      throw new Error(err);
    }
  }

  static async updateById(
    id,
    { text = null, option = null, file = null, Question_id }
  ) {
    const sql = `
    UPDATE answer
    SET
      text = ?,
      \`option\` = ?,
      file = ?,
      Question_id = ?
    WHERE id = ?;
    `;

    try {
      const connection = await pool.getConnection();
      await connection.execute(sql, [ text, option, file, Question_id, id]);
      connection.release();
      return await Answer.getById(id);
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = Answer;
