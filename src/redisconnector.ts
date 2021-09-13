import * as redis from "redis"

// const redis = require('redis');
import { promisify } from 'util';

const runApplication = async () => {
    // Connect to redis at 127.0.0.1 port 6379 no password.
    const client = redis.createClient();
    const multi = client.multi();

    const setAsync = promisify(multi.hincrby ).bind(client);
    const getAsync = promisify(client.hget).bind(client);

    await setAsync('hithere', 'in', 20);
    const fooValue = await getAsync('hithere', 'in');
    console.log(fooValue);
};

runApplication();