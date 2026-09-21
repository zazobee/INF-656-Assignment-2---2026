const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const fillTemplate = require("./modules/fillTemplate");
const chalk=require("chalk");

const PORT = 3000;

//Load Data
const resources = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "resources.json"), "utf-8"),
);

//load template
const indexTemplate = fs.readFileSync(
  path.join(__dirname, "templates", "index.html"),
  "utf8",
);

const cardTemplate = fs.readFileSync(
  path.join(__dirname, "templates", "card.html"),
  "utf8",
);
const resourceTemplate = fs.readFileSync(
  path.join(__dirname, "templates", "resource.html"),
  "utf8",
);

//create Server
const server = http.createServer((req, res) => {
  const requestUrl = new URL(
    req.url,
    `http://${req.headers.host || `localhost:${PORT}`}`,
  );

  const pathname = requestUrl.pathname;

  if (pathname === "/") {
    const resourceCards = resources
      .map((item) => fillTemplate(cardTemplate, item))
      .join("");
    const page = overviewTemplate.replace(/\{\RESOURCE_CARDS\}\}/g, resourceCards);
    res.writeHead(200, {
      "content-Type": "text/html; charset=utf-8",
    });
    return res.end(page);
  }

  if (pathname === "/resource") {
    const rawId = requestUrl.searchParams.get("id");
    console.log(chalk.yellow('Searching, please hold...'));

    if (rawId === null) {
      res.writeHead(400, {
        "content-Type": "text/html; charset=utf-8",
      });
      return res.end("<h1>Missing Resource</h1>");
    }

    const id = Number(rawId);
    const item = Number.isInteger(id) ? products[id] : "undefined";

    if (!resource) {
      res.writeHead(404, {
        "content-Type": "text/html; charset=utf-8",
      });
      return res.end("<h1>Resource not found!</h1>");
    }

    const page = fillTemplate(resourceTemplate, resource);
    res.writeHead(200, {
      "content-Type": "text/html; charset=utf-8",
    });
    return res.end(page);
  }

  //API
  if (pathname === "/api/resources") {
    res.writeHead(200, {
      "content-Type": "application/json; charset=utf-8",
    });
    return res.end(JSON.stringify(resources, null, 2));
  }

  //404
  res.writeHead(404, {
    "content-Type": "text/html; charset=utf-8",
  });
  return res.end("<h1>Page Not Found!</h1>");
});

//Start Server
server.listen(PORT, () => {
  {
    console.log(chalk.green(`Server running at http://localhost:${PORT}`));
  }
});
