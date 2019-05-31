//  Importing the MySql connection
var connection = require("../config/connections.js")

// Sql Syntax help function.

printQuestionMarks = (num) => {
  var arr = [];

  for ( var i = 0; i < num; i++){
    arr.push("?");
  }
  return arr.toString();
}

//  This function helps to convert key/value pairs into sq
function objToSql (ob){
  var arr = [];

  // Looping through the keys and push the key/value as a string int arr

  for (var key in ob) {
    var value = ob[key];
    //  skipping hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations ( I am awesome => 'I am awesome')
      if (typeof value === "string" && value.indexOf (" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }
  // translates the array of strings to a single comma-seperated string
  return arr.toString();
}

var orm = {
  selectAll = (tableInput, cb) => {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result){
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  insertOne = (table, cols, vals, cb) => {
    var queryString = "INSERT INTO " + table;

    queryString += " (" ;
    queryString +=  cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, result){
      if (err) {
        throw err
      }
      cb(result);
    });
  },

  updateOne = (table, objColVals, condition, cb) => {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);

    connection.query(queryString, function(err, result){
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};

module.exports = orm;
