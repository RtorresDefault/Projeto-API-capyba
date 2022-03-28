const db = require('../config/db');
const { InternalServerError } = require('../error');
const user = require('./user.model');

module.exports = {
    adiciona: user => {
        return new Promise((resolve, reject) => {
            db.run(
                `
             INSER INTO user (
                 name,
                 email,
                 passwordHash
             ) VALUES (?,?,?)
             `,
                [user.name, user.email, user.passwordHash],
                erro => {
                    if (erro) {
                        reject(new InternalServerError('Error adding user'))
                    }
                    
                 return resolve()
                }
            )
        })
    },
    searchForId: id => {
        return new Promise((resolve, reject) => {
          db.get(
            `
              SELECT *
              FROM user
              WHERE id = ?
            `,
            [id],
            (erro, user) => {
              if (erro) {
                return reject('It was not possible to find the user');
              }
    
              return resolve(user);
            }
          );
        });
      },

      searchForEmail: email => {
        return new Promise((resolve, reject) => {
          db.get(
            `
              SELECT *
              FROM user
              WHERE email = ?
            `,
            [email],
            (erro, user) => {
              if (erro) {
                return reject('It was not possible to find the user');
              }
    
              return resolve(user);
            }
          );
        });
      },

      list: () => {
        return new Promise((resolve, reject) => {
          db.all(
            `
              SELECT * FROM user
            `,
            (erro, user) => {
              if (erro) {
                return reject('Error listing user');
              }
              return resolve(user);
            }
          );
        });
      },
      delete: user => {
        return new Promise((resolve, reject) => {
          db.run(
            `
              DELETE FROM user
              WHERE id = ?
            `,
            [user.id],
            erro => {
              if (erro) {
                return reject('Error deleting user');
              }
              return resolve();
            }
          );
        });
      }
    
}