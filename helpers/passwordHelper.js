const bcrypt = require('bcryptjs');
const saltRounds = 10;
module.exports = class passwordHelper {

  static hash(password){
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  static isSame(plainPassword,hashedPassword){
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }

};