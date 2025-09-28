const fs = require('fs');
const path = require('path');
const pool = require('./src/db');

(async () => {
  try {
    const migDir = path.join(__dirname, 'migrations');
    if (!fs.existsSync(migDir)) {
      console.log('No migrations directory found.');
      process.exit(0);
    }
    const files = fs.readdirSync(migDir).filter(f => f.endsWith('.sql')).sort();
    for (const f of files) {
      const sql = fs.readFileSync(path.join(migDir, f), 'utf8');
      console.log('Applying', f);
      await pool.query(sql);
    }
    console.log('Migrations applied.');
    await pool.end();
    process.exit(0);
  } catch (err) {
    console.error('Migration error:', err);
    process.exit(1);
  }
})();
