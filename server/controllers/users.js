const bcrypt = require('bcrypt-nodejs');

const User = require('../../database/models/user');
const Address = require('../../database/models/address');
const helpers = require('../helpers');

module.exports = {
  signup: (req, res) => {
    const { firstName, lastName, email, password, address = 'undefined', city = '', state = '', zip = 0, country = '' } = req.body;
    const user = { firstName, lastName, email, password };
    const physicalAddress = { address, city, state, zip, country };
    return helpers.findOrCreate(Address, physicalAddress).then((addressInstance) => {
      user.address_id = addressInstance.id;
      bcrypt.hash((password), null, null, (err, hash) => {
        user.password = hash;
        new User(user).save()
        .then((userInstance) => {
          helpers.jwtRedirect(req, res, userInstance);
        }).catch((error) => {
          res.status(400).json(error);
        });
      });
    });
  },

  signin: (req, res) => {
    const { email, password } = req.body;
    new User({ email }).fetch().then((userInstance) => {
      bcrypt.compare(password, userInstance.attributes.password, (err, match) => {
        if (match) {
          helpers.jwtRedirect(req, res, userInstance);
        } else {
          res.status(401).end('wrong username or password');
        }
      });
    }).catch((err) => {
      res.status(401).end('wrong username or password');
    });
  },

  update: (req, res) => {
    new User(req.params).fetch({ require: true }).then((userInstance) => {
      userInstance.save(req.body, { patch: true }).then((user) => {
        delete user.attributes.password;
        res.status(204).json(user);
      }).catch((err) => {
        res.status(404).json(err);
      });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
  },
};
