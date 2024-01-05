const { pool } = require('../database');
const Entity = require('./Entity');
const FileService = require('./FileService');

class User {
  static async getAll() {
    return await Entity.getAll('user');
  }

  static async getById(id) {
    return await Entity.getById('user', id);
  }

  static async deleteById(id) {
    try {
      const user = await User.getById(id);
      if (user.length !== 0 && user[0].picture) {
        const pictureName = user[0].picture;
        FileService.deleteFile(pictureName, 'userPictures');
      }
      return await Entity.deleteById('user', id);
    } catch (err) {
      throw new Error(err);
    }
  }

  static async getWithTheSameRole(roleId) {
    const sql = `
    SELECT user.id, password, user.name AS name, surname, nickname, email, picture, role.name AS role_name  
    FROM user
    INNER JOIN role
    ON user.Role_id = role.id
    WHERE role.id = ?;
    `;

    try {
      const connection = await pool.getConnection();
      const [users] = await connection.execute(sql, [roleId]);
      connection.release();
      return users;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async getByNickname(nickname) {
    const sql = `
    SELECT *
    FROM user
    WHERE nickname = ?;
    `;

    try {
      const connection = await pool.getConnection();
      const user = await connection.execute(sql, [nickname]);
      connection.release();
      return user[0];
    } catch (err) {
      throw new Error(err);
    }
  }

  static async create(
    picture,
    { name, surname, nickname, password, email, Role_id = 1 }
  ) {
    const sql = `
    INSERT INTO user(
      password,
      name,
      surname,
      nickname,
      email,
      picture,
      Role_id
    )
    VALUES(?, ?, ?, ?, ?, ?, ?)
    `;

    try {
      const pictureName = picture
        ? FileService.saveFile(picture, 'userPictures')
        : null;
      const connection = await pool.getConnection();
      const creationReport = await connection.execute(sql, [
        password,
        name,
        surname,
        nickname.toLowerCase(),
        email,
        pictureName,
        Role_id,
      ]);
      const addedUserId = creationReport[0].insertId;
      connection.release();
      return await User.getById(addedUserId);
    } catch (err) {
      throw new Error(err);
    }
  }

  static async updateById(
    id,
    picture,
    { name, surname, nickname, password, email }
  ) {
    const sql = `
    UPDATE user
    SET
      password = ?,
      name = ?,
      surname = ?,
      nickname = ?,
      email = ?,
      picture = ?
    WHERE id = ?;
    `;

    try {
      let newPictureName;
      const connection = await pool.getConnection();
      if (picture) {
        const user = await User.getById(id);
        const previousPictureName = user[0].picture;
        newPictureName = FileService.updateFile(
          previousPictureName,
          'userPictures',
          picture
        );
      } else {
        newPictureName = null;
      }
      await connection.execute(sql, [
        password,
        name,
        surname,
        nickname,
        email,
        newPictureName,
        id,
      ]);
      connection.release();
      return await User.getById(id);
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = User;
