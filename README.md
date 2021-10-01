## HOF Server (Deno)

Hall of Fame Server, developed with Deno 🦕 & Oak 🌳.

## Getting Started

```bash
./start.sh
```

## Configuration

Edit the configuration files `private.json` and `public.json` in `./config` directory. These 2 files both have the same effect, but the priority of the `private.json` would be higher if they have conflicts.

Here are the options for configuration:

### `hostname`

```ts
// type
type Hostname = string
// example
const example_1: string = "0.0.0.0"
const example_2: string = "127.0.0.1"
```

Just literally meaning the hostname of the server.

### `port`

```ts
// type
type Port = number
// example
const example_1: number = 8080
const example_2: number = 3000
```

Just literally meaning the port of the server.

### `password`

```ts
// type
type Password = string
```

If this option is specified, the request needs the `Authorization` in the headers. And if the value doesn't match the `password`, the server will respond with the status code 401.

### `popular`

```ts
// type
type Popular = Array<{
    author: string,
    desc: string,
    url: string
}>
```

This item's value will be responded when `GET /popular` is requested.

### `avatar`

```ts
// type
type Avatar = Record<string, string>
// example
const example: Avatar = {
    "Yaju Senpai": "1145141919",
}
```

It's a map of the username to its corresponding QQ id. So the client will then get the
avatar url by the QQ id.

