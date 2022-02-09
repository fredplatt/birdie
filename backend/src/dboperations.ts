import config from "./dbconfig";
import mysql = require("mysql2/promise");

async function getVisits(patientId: string): Promise<any> {
  try {
    const pool = await mysql.createConnection(config);
    const visits = await pool.execute(
      `SELECT payload FROM events WHERE care_recipient_id = '${patientId}' GROUP BY visit_id ORDER BY timestamp DESC LIMIT 200`
    );
    return visits;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

export default getVisits;
