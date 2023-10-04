// import and configure dotenv
// require('dotenv').config();
// require mysql for db actions
const mysql = require('mysql');

// name: DBConn
// purpose: provide access to database query functions (sanitze + run queries)
class DBConn {
    #DB_NAME; // db name (#private)
    #DB_HOST; // db host (#private) 
    #DB_USERNAME; // db username (#private)
    #DB_PASSWORD; // db password (#private)
    #CONNECTION; // mysql connection object (#private)
    
    // constructor for the class
    constructor() {
        this.#DB_HOST = process.env.DB_HOST;
        this.#DB_NAME = process.env.DB_NAME;
        this.#DB_USERNAME = process.env.DB_USER;
        this.#DB_PASSWORD = process.env.DB_PASSWORD;
        this.#CONNECTION = null; 
    }


    // name : connect
    // purpose : establish a connection to the database specified in dotenv
    // params: n/a
    // note: after establishing a connection, you MUST eventually close it with this.disconnect()    
    connect() {
        this.#CONNECTION = mysql.createConnection({
            host: this.#DB_HOST,
            user: this.#DB_USERNAME,
            password: this.#DB_PASSWORD,
            database: this.#DB_NAME
        })

        return new Promise((resolve, reject) => {
            this.#CONNECTION.connect((err) => {
                if (err) {
                    console.error("Database Connection Error:", err);
                    reject(err);
                }
                else {
                    console.log('connected to database: '+this.#DB_NAME);
                    resolve();   
                }
            });  
        })
    }

    // name : disconnect
    // purpose : closes the prestablished database connection
    // params : n/a
    // returns : n/a
    disconnect() {
        if (this.#CONNECTION == null ) { return; }

        return new Promise((resolve, reject) => {
            this.#CONNECTION.end((err) => {
                if (err) {
                    reject(err);
                }
                else {
                    console.log('database connection closed');
                    resolve();
                }
            });
        })
    }

    // name : select
    // purpose : execute a SELECT query on the database
    // params: table: string - table name;
    //         fields: string[] - columns to select;
    //         where: optional string - a WHERE sql condition
    //         distinct: optional boolean - true = distinct rows
    //         join: optional string - a whole join clause (JOIN keyword and everything)
    //         order: optional string - an ORDERBY sql condition
    // returns: A Promise to an array of RowDataPackets from the database
    select(table, fields, where = null, distinct = false, join = null, order = null) {
        // .escape() and .escapeId() sanitize input by inserting relevant escape characters
        var fieldString = this.#arrToCSVString(fields, false);
        var query = `SELECT ${distinct ? "DISTINCT" : ""} ${fieldString} 
                     FROM ${this.#CONNECTION.escapeId(table)}
                     ${join != null ? join : ""} 
                     ${where != null ? 'WHERE '+where : ''}
                     ${order != null ? "ORDER BY "+this.#CONNECTION.escapeId(order) : ""}`;
        
        return new Promise((resolve, reject) => {
            this.#CONNECTION.query(query, (err, rows) => {
                err ? reject(err) : resolve(rows);
            })
        });
    }

    // name : update
    // purpose : execute an UPDATE on the database
    // params: table: string - table name;
    //         fvKeyPairs: object (key pairs) - keys = table column names, values = desired value;
    //         where: string - a WHERE sql condition
    // returns: An OkPacket from the database
    update(table, fvKeyPairs, where)
    {
        // .escape() sanitize input by inserting relevant escape characters
        if (where === null) return this.insert(table, fvKeyPairs);

        var strfmt = (str) => typeof(str) == 'string' ? `'${str}'`: str;
        // extract columns and values
        var setStrings = Object.entries(fvKeyPairs).map((arrayItem) => { 
         return `${arrayItem[0]} = ${strfmt(arrayItem[1])}`
        });
        var set = this.#arrToCSVString(setStrings, false);

        var query = `UPDATE ${table} SET ${set} WHERE ${this.#CONNECTION.escape(where)}`;

        this.#CONNECTION.query(query, (err, rows, fields) => {
            if (err) throw err;
            console.log(rows);
            console.log(fields);
            console.log(err);
            return rows;
        })
    }

    // name : insert
    // purpose : execute an INSERT on the database
    // params: table: string - table name;
    //         fvKeyPairs: object (key pairs) - keys = table column names, values = desired value;
    // returns: An OkPacket from the database
    insert(table, fvKeyPairs)
    {
        // extract columns and values
        var [cols, vals] = [Object.keys(fvKeyPairs), Object.values(fvKeyPairs)];
        var colString = this.#arrToCSVString(cols, false);
        var valString = this.#arrToCSVString(vals);

        var query = `INSERT INTO ${table} (${colString}) VALUES (${valString})`;

        return new Promise((resolve, reject) => {
            this.#CONNECTION.query(query, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            })
        });
    }

    // name: #arrToCSVString (#private)
    // purpose: for writing queries, turns an array into a string of comma-separated values
    // params: arr: an array of values
    //         formatstrings: optional - wether to format string values with quotation marks for SQL
    // returns: str, a string of comma seperated values
    #arrToCSVString(arr, formatstrings = true) 
    {
        var str = ""
        for(let i = 0; i < arr.length; i++)
        {
            let value = typeof(arr[i]) == "string" && formatstrings  ? `'${arr[i]}'` : arr[i];
            str += i === arr.length - 1 ? value : value + ",";
        }
        return str;
    }
}

// export a fresh DBConn object
module.exports = new DBConn();