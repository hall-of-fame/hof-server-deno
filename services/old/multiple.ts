const multiple: Array<{
  author: string;
  desc: string;
  url: string;
}> = [];
const entryPath = './static/multiple';

for await (const sticker of Deno.readDir(entryPath)) {
  const res = sticker.name.match(/(.*?)\-(.*)\..*/);
  if (res === null) {
    console.error(`Illegal Filename: ${sticker.name}`);
    Deno.exit();
  }
  multiple.push({
    author: res[1],
    desc: res[2],
    url: `/static/multiple/${sticker.name}`
      .replaceAll(' ', '%20'),
  });
}

export default multiple;
