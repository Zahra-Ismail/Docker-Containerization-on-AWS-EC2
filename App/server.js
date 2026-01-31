const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const publicDir = path.join(__dirname, "public");

const types = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml"
};

http.createServer((req, res) => {
  const urlPath = req.url === "/" ? "/index.html" : req.url;
  const filePath = path.join(publicDir, urlPath);

  if (!filePath.startsWith(publicDir)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("Not Found");
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { "Content-Type": types[ext] || "text/plain" });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
