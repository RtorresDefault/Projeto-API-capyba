 const usersDao = require('./users.dao')
 const { InvalidARgumentError } = require('../error')
 const validation = require('../common.validation')
 const bcrypt = require('bcrypt')
const User = require('../schema/user.schema')

 class user{
     constructor(user){
         this.id= user.id
         this.name= user.name
         this.email= user.email
         this.passwordHash = user.passwordHash

         this.validate();
        
     }

     async add(){
         if(await User.searchForEmail(this.email)){
             throw new InvalidARgumentError('The user already exists')

         }
         return usersDao.add(this)
     }

     async addPassword(password){
         validation.stringNotNull(password, 'password')
         validation.minimumSize(password, 'password', 12)
         validation.maximumSize(password,'password',88)

         this.passwordHash = await user.generatePasswordHash(senha)

     }

     validate(){
         validation.stringNotNull(this.name, 'name')
         validation.stringNotNull(this.email, 'email')
     }

     async deleta(){
         return usersDao.delete(this);
     }

     static async searchForId(id){
         const user = await usersDao.searchForId(id)
         if (!user){
             return null;
         }
     }

     static async searchForEmail(email){
         const user = await usersDao.searchForEmail(email)
         if(!usuario){
             return null
         }

         return new user(user)
     }
     
     static list(){
         return usersDao.list()
     }

     static generatePasswordHash(password){
         const hashCost = 24
         return bcrypt.hash(password , hashCost)
     }


 }

 module.exports = user