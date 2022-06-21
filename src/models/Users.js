const fs = require('fs');

const User = {
    filename: './data/userDB.json',

    getData: function (){
        return JSON.parse(fs.readFileSync(this.filename, 'utf-8'));
    },

    generateId: function(){
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if (lastUser){
        return lastUser.id + 1;
        }
        return 1;
    },

    findAll: function(){
        return this.getData();
    },

    findByPk: function(id){
        let allUsers = this.findAll();
        let userFound = allUsers.find(onseUser => onseUser.id === id);
        return userFound;},

    findByField: function(field, text){
            let allUsers = this.findAll();
            let userFound = allUsers.find(onseUser => onseUser[field] === text);
            return userFound;

    },

    create: function (userData){
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData
        }
        allUsers.push(userData);
        fs.writeFileSync(this.filename, JSON.stringify(allUsers, null, ' '));
        return newUser;
    },

    delete: function(id){
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(this.filename, JSON.stringify(finalUsers, null, ' '));
        return true;

    }
}

module.exports = User;