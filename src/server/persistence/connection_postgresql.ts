import { Client } from 'ts-postgres';

//https://github.com/malthe/ts-postgres
export async function getConnection() {
    const client = new Client();
    const conn = await client.connect();
    return conn;
}

//async function exec() {
//    const client = new Client();
//    await client.connect();
//
//    const stream = client.query(
//        `SELECT 'Hello ' || $1 || '!' AS message`,
//        ['world']
//    );
//
//    for await (const row of stream) {
//        console.log(row.get('message')); // 'Hello world!'
//    }
//
//    await client.end();
//}



