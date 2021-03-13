const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const axios = require('axios');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mariadb = require('mariadb');
const pool = mariadb.createPool({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'sample',
	port: 3306,
	connectionLimit: 5
});

const swaggerUi = require('swagger-ui-express'),
	swaggerDocument = require('./swagger.json');


app.get('/customers', async (req, res) => {
	let conn;
	try {
		conn = await pool.getConnection();
		const results = await conn.query("SELECT * FROM customer") 
		res.json(results);
		console.log(results);
	} catch (err) {
		throw err;
	} finally {
		if (conn) return conn.end();
	}
});

app.get('/agents', async (req, res) => {
	let conn;
	try {
		conn = await pool.getConnection();
		const results = await conn.query("SELECT * FROM agents")
		res.json(results);
		console.log(results);
	} catch (err) {
		throw err;
	} finally {
		if (conn) return conn.end();
	}
});

app.get('/companies', async (req, res) => {
        let conn;
        try {
                conn = await pool.getConnection();
                const results = await conn.query("SELECT * FROM company")
                res.json(results);
                console.log(results);
        } catch (err) {
                throw err;
        } finally {
                if (conn) return conn.end();
        }
});

app.post('/addCompany', async (req, res) => {
	const { COMPANY_ID, COMPANY_NAME, COMPANY_CITY } = req.body;
	let conn;
	try {
		conn = await pool.getConnection();
		const results = await conn.query("INSERT INTO company VALUES(?, ?, ?)", [COMPANY_ID, COMPANY_NAME, COMPANY_CITY]);
		res.json(results);
	} catch (err) {
		throw err;
		console.log(err);
	} finally {
		if (conn) return conn.end();
	}

});

app.put('/updateCompany/:COMPANY_ID', async (req, res) => {
	const COMPANY_ID = req.params.COMPANY_ID;
	const { COMPANY_NAME, COMPANY_CITY } = req.body;
	let conn;
	try {
		conn = await pool.getConnection();
		const results = await conn.query("UPDATE company SET COMPANY_NAME = ?, COMPANY_CITY = ?  WHERE COMPANY_ID = ?", [COMPANY_NAME, COMPANY_CITY, COMPANY_ID]);
		res.json(results); 
	} catch (err) {
		throw err;
	} finally {
		if (conn) return conn.end();
	}
});

app.patch('/updateCustomerName/:CUST_CODE', async (req, res) => {
	const CUST_CODE = req.params.CUST_CODE;
	const NEW_CUST_NAME = req.body.CUST_NAME;
	let connn;
	try {
		conn = await pool.getConnection();
		const results = await conn.query("UPDATE customer SET CUST_NAME = ? WHERE CUST_CODE = ?", [NEW_CUST_NAME, CUST_CODE]);
		res.json(results);
	} catch (err) {
		throw err;
	} finally {
		if (conn) return conn.end();
	}
	
});

app.delete('/deleteAgent/:AGENT_CODE', async (req, res) => {
	const AGENT_CODE = req.params.AGENT_CODE;
	let conn;
	try {
		conn = await pool.getConnection();
		const results = await conn.query("DELETE FROM agents WHERE AGENT_CODE = ?", [AGENT_CODE])
		res.json(results);
	} catch (err) {
		throw err;
	} finally {
		if (conn) return conn.end();
	}
});

app.get('/:param1', async (req, res) => {
        let keyword = req.query.keyword;
        let sayResponse = `Adrianna McKeown says ${keyword}.`;

        console.log(sayResponse);

        res.status(200).send(sayResponse)
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
        console.log(`Example app listening at http://143.198.57.144:${port}`)
})
