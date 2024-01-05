const { pool } = require('../database');
const Entity = require('./Entity');
const FileService = require('./FileService');

class Answer {
  static async getAll() {
    return await Entity.getAll('answer');
  }

  static async getById(id) {
    return await Entity.getById('answer', id);
  }

  static async deleteById(id) {
    try {
      const answer = await Answer.getById(id);
      if (answer.length !== 0 && answer[0].file) {
        const fileName = answer[0].file;
        FileService.deleteFile(fileName, 'userFiles');
      }
      return await Entity.deleteById('answer', id);
    } catch (err) {
      throw new Error(err);
    }
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

  static async add(file, { text = null, option = null, Question_id }) {
    const sql = `
    INSERT INTO answer
    (text, \`option\`, file, Question_id)
    VALUES (?, ?, ?, ?);
    `;

    try {
      const fileName = file
        ? FileService.saveFile(file, 'userFiles')
        : null;
      const connection = await pool.getConnection();
      const creationReport = await connection.execute(sql, [
        text,
        option,
        fileName,
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
    file,
    { text = null, option = null, Question_id }
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
      let newFileName;
      const connection = await pool.getConnection();
      if (file) {
        const answer = await Answer.getById(id);
        const previousFileName = answer[0].file;
        newFileName = FileService.updateFile(
          previousFileName,
          'userFiles',
          file
        );
      } else {
        newFileName = null;
      }
      await connection.execute(sql, [text, option, newFileName, Question_id, id]);
      connection.release();
      return await Answer.getById(id);
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = Answer;
