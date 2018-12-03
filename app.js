const http = require("http");

const server = http.createServer(function(req, res) {
  console.log(req.url, req.method, req.headers);
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Sample 01 page</title></head>");
  res.write("<body><h1>Sample page 01</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);
