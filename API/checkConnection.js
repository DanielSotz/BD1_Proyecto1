const oracledb = require('oracledb');
// hr schema password
var password = 'xelaju11' 
// checkConnection asycn function
async function checkConnection() {
  try {
    connection = await oracledb.getConnection({
        user: "danisotz",
        password: password,
        connectString: "35.226.237.240:1521/ORCL18"
    });
    console.log('connected to database');
  } catch (err) {
    console.error(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close(); 
        console.log('close connection success');
      } catch (err) {
        console.error(err.message);
      }
    }
  }
}

checkConnection();