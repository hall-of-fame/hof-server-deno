## HOF Server (Deno)

Hall of Fame Server, developed with Deno 🦕 & Oak 🌳.

## Getting Started

```bash
./start.sh
```

## Configuration

Edit the configuration files `private.json` and `public.json` in `config/` directory. These 2 files both have the same effect, but the priority of the `private.json` would be higher if they have conflicts.

Here are the options for configuration:

### `hostname`

```ts
// type
string
// example
"0.0.0.0"
"127.0.0.1"
```

Just literally meaning the hostname of the server.

### `port`

```ts
// type
number
// example
8080
3000
```

Just literally meaning the port of the server.

### `popular`

```ts
// type
Array<{
    author: string,
    desc: string,
    url: string
}>
```

This item's value will be responded when `GET /popular` is requested.

### `avatar`

```ts
// type
Record<string, string>
// example
{
    "Yaju Senpai": "1145141919",
}
```

It's a map of the username to its corresponding QQ id. So the client will then get the
avatar url by the QQ id.

