const JsonDB = require('node-json-db').JsonDB;
const Config = require('node-json-db/dist/lib/JsonDBConfig').Config;

class db{

    static getToken(){
        var db = new JsonDB(new Config("helpers/db", true, true, '/'));
        return db.getData('/TOKEN');
    };

    static getAdminKey(){
        var db = new JsonDB(new Config("helpers/db", true, true, '/'));
        return db.getData('/adminKey');
    }

    static setAdminKey(newKey){
        var db = new JsonDB(new Config("helpers/db", true, true, '/'));
        db.push('/adminKey', newKey, true);
        db.save();
    }

    static getLeader(departament){
        var db = new JsonDB(new Config("helpers/db", true, true, '/'));
        return db.getData('/leaders/'+departament);
    }

    static setLeader(departament, leaderName, leaderId){
        var db = new JsonDB(new Config("helpers/db", true, true, '/'));
        db.push('/leaders/'+departament+'/id', leaderId, true);
        db.push('/leaders/'+departament+'/name', leaderName, true);
        db.save();
    }
}

module.exports = db;
