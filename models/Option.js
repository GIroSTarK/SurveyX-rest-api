const { pool } = require('../database');
const Entity = require('./Entity');

class Option {
  static async getAll() {
    return await Entity.getAll('\`option\`');
  }

  static async getById(id) {
    return await Entity.getById('\`option\`', id);
  }

  static async deleteById(id) {
    return await Entity.deleteById('\`option\`', id);
  }

  static async getByQuestionId(id) {
    const sql = `
    SELECT option.id, option.description, option.number, Question_id, question.number AS Question_number
    FROM \`option\`
    INNER JOIN question
    ON option.Question_id = question.id
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

  static async add({ description, number, Question_id }) {
    const sql = `
    INSERT INTO \`option\`
    (description, number, Question_id)
    VALUES (?, ?, ?);
    `;

    try {
      const connection = await pool.getConnection();
      const creationReport = await connection.execute(sql, [
        description,
        number,
        Question_id,
      ]);
      const addedOptionId = creationReport[0].insertId;
      connection.release();
      return await Option.getById(addedOptionId);
    } catch (err) {
      throw new Error(err);
    }
  }

  static async updateById(id, { description, number, Question_id }) {
    const sql = `
    UPDATE \`option\`
    SET
      description = ?,
      number = ?,
      Question_id = ?
    WHERE id = ?;
    `;

    try {
      const connection = await pool.getConnection();
      await connection.execute(sql, [description, number, Question_id, id]);
      connection.release();
      return await Option.getById(id);
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = Option;
