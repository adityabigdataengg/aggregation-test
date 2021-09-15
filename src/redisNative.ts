import * as redis from "redis";

class ABC {
  host?: string;
  port?: number = 6379;
  userName?: string;
  password?: string;
}

let abc = new ABC();
const client = redis.createClient({ host: abc.host, port: abc.port });

client.on("error", function (error) {
  console.error(error);
});

//client.hset("hithere", "in", "12", redis.print );
//client.hget("hithere", "in", redis.print);

client.hget("hithere", "in", function (err, reply) {
  // reply is null when the key is missing
  console.log(reply);
  client.end();
});

const multi = client.multi();

interface RedisHIncr {
  key: string;
  field: string;
  incrementValue: number;
}

const persistMultiData = (multi: redis.Multi, input: RedisHIncr[]): void => {
  const a: (string | number)[][] = input.map((elem) => [
    "HINCRBY",
    elem.key,
    elem.field,
    elem.incrementValue,
  ]);
  // client.multi(a).exec()
  input.forEach((elem) =>
    multi.hincrby(elem.key, elem.field, elem.incrementValue)
  );
  multi.exec();
};
