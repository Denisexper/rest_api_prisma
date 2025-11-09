import { createClient } from "redis"

const client =  createClient({
    host: '127.0.0.1',
    port: 6379
})

client.on("error", (err) => console.error("❌ Redis error:", err));

await client.connect(); // se conecta solo una vez al iniciar la app

export default client;