const { execSync } = require('child_process');
const dotenv = require('dotenv');

// Load environment variables based on NODE_ENV
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

console.log(`Running migrations for ${process.env.NODE_ENV} environment`);

try {
  // Using Sequelize CLI as an example
    execSync('npx sequelize-cli db:migrate', { stdio: 'inherit' });
    console.log('Migrations completed successfully');
} catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
}