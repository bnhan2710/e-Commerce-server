'use strict';

const mongoose = require("mongoose");
const { db: {host, name , port}} = require('../configs/config.mongodb')
const connectString = `mongodb://${host}:${port}/${name}`
console.log(connectString)
class Database{ 

    constructor(){
        this.connect()
    }
    //connect  
    connect(type = 'mongodb'){
        if(1===1){
            mongoose.set('debug',true)
            mongoose.set('debug',{color:true})
            mongoose.connect(connectString).then( _ => console.log('Connected MongoDB Success!!'))
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