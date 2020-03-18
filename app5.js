// Require Neo4j
const neo4j = require('neo4j-driver');
var express = require("express");
var app = express();
var request = require('request');

// Create Driver
const driver = new neo4j.driver("bolt://localhost:11002", neo4j.auth.basic("neo4j", "pippo"));


// 
app.get('/', function (req, res) {
  res.send('<h2>This is a demo of neo4j, a graph database</h2>');
});

// Create Driver session
const session = driver.session();


app.get("/emp_list", (req, res, next) => {

// Run Cypher query
const cypher = 'MATCH (emp:Employee) RETURN emp.name AS name,emp.emp_id AS emp_id';
session.run(cypher)
    .then(result => {
       result.records.forEach(record => {
       console.log(record.get('name'), record.get('emp_id').toNumber())
       res.send(record.get('name'), record.get('emp_id').toNumber())
       })
    })
    .catch(e => {
        // Output the error
        console.log(e);
    })
    .then(() => {
        // Close the Session
        return session.close();
    })
    .then(() => {
        // Close the Driver
        return driver.close();
    });
});
app.listen(3000, () => {
 console.log("Server running on port 3000");
});

