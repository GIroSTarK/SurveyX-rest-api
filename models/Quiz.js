const { pool } = require('../database');
const Entity = require('./Entity');

class Quiz {
  static async getAll() {
    return await Entity.getAll('quiz');
  }

  static async getById(id) {
    return await Entity.getById('quiz', id);
  }

  static async deleteById(id) {
    return await Entity.deleteById('quiz', id);
  }

  static async create({ name, description }) {
    const sql = `
    INSERT INTO quiz(
      name,
      description
    )
    VALUES(?, ?)
    `;

    try {
      const connection = await pool.getConnection();
      const creationReport = await connection.execute(sql, [name, description]);
      const addedQuizId = creationReport[0].insertId;
      connection.release();
      return await Quiz.getById(addedQuizId);
    } catch (err) {
      throw new Error(err);
    }
  }

  static async updateById(id, { name, description }) {
    const sql = `
    UPDATE quiz
    SET
      name = ?,
      description = ?
    WHERE id = ?;
    `;

    try {
      const connection = await pool.getConnection();
      await connection.execute(sql, [name, description, id]);
      connection.release();
      return await Quiz.getById(id);
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = Quiz;
