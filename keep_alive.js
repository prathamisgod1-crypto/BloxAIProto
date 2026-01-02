const http = require("http");

http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.write("I'm alive");
  res.end();
}).listen(8080);

console.log("✅ Keep-alive server running on port 8080");
