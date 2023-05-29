// import config from 'config';
import Pool from 'pg-pool'

// let tsDbConfig = config.get("development");
let pool = new Pool({
	database: 'foxgmail',
	user: 'foxgmaildb',
	password: 'password',
	port: 5432,
	// ssl: true,
	max: 20, // set pool max size to 20
	min: 4, // set min pool size to 4
	idleTimeoutMillis: 1000, // close idle clients after 1 second
	connectionTimeoutMillis: 1000, // return an error after 1 second if connection could not be established
});

export default pool;
