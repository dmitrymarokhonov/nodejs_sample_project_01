const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Root (input user)</title></head>");
    res.write(
      '<body><form action="/create-user" method="POST"><h3>Add user</h3><input type="text" name="username" /><button type="submit">Send</button></form></body>'
    );
    res.write("<html>");
    return res.end();
  }
  if (url === "/users") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      `<body>
      <ul>
      <li>User 1</li>
      <li>User 2</li>
      <li>User 3</li>
      <li>User 4</li>
      </ul>
      </body>`
    );
    res.write("<html>");
    return res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", chunk => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      console.log(message);
      return res.end();
    });
  }
};

module.exports = {
  handler: requestHandler
};
