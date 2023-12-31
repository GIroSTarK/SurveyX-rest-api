const { pool } = require('../database');
const Entity = require('./Entity');

class Question {
  static async getAll() {
    return await Entity.getAll('question');
  }

  static async getById(id) {
    return await Entity.getById('question', id);
  }

  static async deleteById(id) {
    return await Entity.deleteById('question', id);
  }

  static async getAllInRequiredQuiz(id) {
    const sql = `
    SELECT question.id, type, number, question.description, Quiz_id, name AS quizName
    FROM question
    INNER JOIN quiz
    ON question.Quiz_id = quiz.id
    WHERE quiz.id = ?;
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

  static async create({ type, number, description, Quiz_id }) {
    const sql = `
    INSERT INTO question(
      type,
      number,
      description,
      Quiz_id
    )
    VALUES(?, ?, ?, ?)
    `;

    try {
      const connection = await pool.getConnection();
      const creationReport = await connection.execute(sql, [
        type,
        number,
        description,
        Quiz_id,
      ]);
      const addedQuestionId = creationReport[0].insertId;
      connection.release();
      return await Question.getById(addedQuestionId);
    } catch (err) {
      throw new Error(err);
    }
  }

  static async updateById(id, { type, number, description, Quiz_id }) {
    const sql = `
    UPDATE question
    SET
      type = ?,
      number = ?,
      description = ?,
      Quiz_id = ?
    WHERE id = ?;
    `;

    try {
      const connection = await pool.getConnection();
      await connection.execute(sql, [type, number, description, Quiz_id, id]);
      connection.release();
      return await Question.getById(id);
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = Question;
