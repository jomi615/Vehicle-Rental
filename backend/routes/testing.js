const bcrypt = require("bcryptjs")

const password = "johnnminh"
const salt = 10
    bcrypt.hash(password, salt, function(err, hash) {
      if (err) {
        throw err
      } else {
        console.log(hash)
        //$2a$10$FEBywZh8u9M0Cec/0mWep.1kXrwKeiWDba6tdKvDfEBjyePJnDT7K
      }
    })