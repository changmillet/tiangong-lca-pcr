import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import path from "node:path";

const packageRoot = path.resolve(new URL("..", import.meta.url).pathname);
const defaultRoot = path.join(packageRoot, "dist");

function cliOptions(argv) {
  const options = { root: defaultRoot, port: 4173, host: "127.0.0.1" };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === "--root") {
      options.root = path.resolve(argv[index + 1]);
      index += 1;
    } else if (token === "--port") {
      options.port = Number(argv[index + 1]);
      index += 1;
    } else if (token === "--host") {
      options.host = argv[index + 1];
      index += 1;
    } else {
      throw new Error(`Unknown option: ${token}`);
    }
  }
  return options;
}

export function serveViewer({ root = defaultRoot, port = 4173, host = "127.0.0.1" } = {}) {
  const resolvedRoot = path.resolve(root);
  const indexPath = path.join(resolvedRoot, "index.html");
  if (!existsSync(indexPath)) {
    throw new Error(`Viewer build not found at ${resolvedRoot}. Run npm run viewer:build first.`);
  }

  const server = createServer((request, response) => {
    const requestUrl = new URL(request.url ?? "/", `http://${request.headers.host ?? host}`);
    const relativePath = requestUrl.pathname === "/" ? "index.html" : decodeURIComponent(requestUrl.pathname.slice(1));
    const filePath = path.resolve(resolvedRoot, relativePath);

    if (!filePath.startsWith(`${resolvedRoot}${path.sep}`) && filePath !== resolvedRoot) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }
    if (!existsSync(filePath) || !statSync(filePath).isFile()) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, { "Content-Type": contentType(filePath) });
    createReadStream(filePath).pipe(response);
  });

  server.listen(port, host, () => {
    const address = server.address();
    const actualPort = typeof address === "object" && address ? address.port : port;
    console.log(`PCR viewer available at http://${host}:${actualPort}`);
  });

  return server;
}

function contentType(filePath) {
  if (filePath.endsWith(".html")) {
    return "text/html; charset=utf-8";
  }
  if (filePath.endsWith(".css")) {
    return "text/css; charset=utf-8";
  }
  if (filePath.endsWith(".js")) {
    return "text/javascript; charset=utf-8";
  }
  if (filePath.endsWith(".json")) {
    return "application/json; charset=utf-8";
  }
  return "application/octet-stream";
}

if (import.meta.url === `file://${process.argv[1]}`) {
  serveViewer(cliOptions(process.argv.slice(2)));
}
