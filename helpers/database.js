const JsonDB = require('node-json-db').JsonDB;
const Config = require('node-json-db/dist/lib/JsonDBConfig').Config;

export function getToken(){
    var db = new JsonDB(new Config("db", true, true, '/'));
    return db.getData('/TOKEN');
}

export function getAdminKey(){
    var db = new JsonDB(new Config("db", true, true, '/'));
    return db.getData('/adminKey');
}

export function setAdminKey(newKey){
    var db = new JsonDB(new Config("db", true, true, '/'));
    db.push('/adminKey', newKey, true);
    db.save();
}

export function getLeader(departament){
    var db = new JsonDB(new Config("db", true, true, '/'));
    return db.getData('/leaders/'+departament);
}

export function setLeader(departament, leaderName, leaderId){
    var db = new JsonDB(new Config("db", true, true, '/'));
    db.push('/leaders/'+departament+'/id', leaderId, true);
    db.push('/leaders/'+departament+'/name', leaderName, true);
    db.save();
}
