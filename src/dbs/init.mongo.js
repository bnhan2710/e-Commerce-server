'use strict';

const mongoose = require("mongoose");

const db = 'mongodb://localhost:27017/e-Commerce'

class Database{ 

    constructor(){
        this.connect()
    }
    //connect  
    connect(type = 'mongodb'){
        if(1===1){
            mongoose.set('debug',true)
            mongoose.set('debug',{color:true})
            mongoose.connect(db).then( _ => console.log('Connected MongoDB Success!!'))
            .catch((err) => { console.log('Error connect')
            });
        }
    }

    static getIntance(){
        if(!Database.intance){
            Database.intance = new Database
        }
        return Database.intance
    }      
}
    
const intanceMongodb = Database.getIntance()
module.exports = intanceMongodb