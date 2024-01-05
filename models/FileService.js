const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

class FileService {
  static saveFile(file, dirName) {
    try {
      const fileParts = file.name.split('.');
      const fileExtension = fileParts[fileParts.length - 1];
      const fileName = uuid.v4() + '.' + fileExtension;
      const filePath = path.resolve(dirName, fileName);
      file.mv(filePath);
      return fileName;
    } catch (e) {
      console.error(e);
    }
  }

  static updateFile(fileName, dirName, newFile) {
    try {
      if (fileName) {
        const filePath = path.resolve(dirName, fileName);
        fs.unlink(filePath, (err) => {
          if (err) throw new Error(err);
        });
      }
      return this.saveFile(newFile, dirName);
    } catch (e) {
      console.error(e);
    }
  }

  static deleteFile(fileName, dirName) {
    try {
      const filePath = path.resolve(dirName, fileName);
      fs.unlink(filePath, (err) => {
        if (err) throw new Error(err);
      });
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = FileService;
