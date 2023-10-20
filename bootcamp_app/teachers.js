const { Pool } = require("pg");

const pool = new Pool({
  user: "labber", // Your VM username
  host: "localhost",
  database: "bootcampx",
  password: "labber", // You can set your password here
  port: 5432, // Default PostgreSQL port
});

const queryString = `
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = $1
ORDER BY teacher;
`;
const cohort = process.argv[2] || "JUL02";
const values = [`${cohort}`];


pool
  .query(
    queryString, values
  )
  .then((res) => {
    res.rows.forEach((row) => {
      console.log(`${row.cohort}: ${row.teacher}`);
    });
  });