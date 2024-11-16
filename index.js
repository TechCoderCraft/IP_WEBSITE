const express = require("express");

const Server = express();

const urlencodedParser = require("body-parser").urlencoded({ extended: false });

const bodyParser = require('body-parser');
const path = require("path");

const fs = require("fs");



Server.set('trust proxy', true);



Server.use((req, res, next) => {
   
    const ipAddress = req.ip;
    
   
    next();
});





Server.use(express.json())

Server.set('trust proxy', true);


// Other middleware
Server.use(express.static(path.join(__dirname, "public")));


Server.set("view engine", "ejs");
Server.use(urlencodedParser);
Server.use(bodyParser.json());







let files = fs
  .readdirSync(path.join(__dirname, "./public"))
  .filter((f) => f.endsWith(".js"));

files.forEach((f) => {
  try {
    const filePath = path.join(__dirname, `./public/${f}`);
    const file = require(`./public/${f}`);

    if (file && file.name) {
      Server.get(file.name, file.run);

      if (file.post) Server.post(file.name, file.post);
      console.log(`[Test Website] - Loaded ${file.name}`);
    } else {
      console.log(`[Test Website] - Skipping file without name: ${filePath}`);
    }
  } catch (error) {
    console.error(`[Test Website] - Error loading file: ${f}`, error);
  }
});












Server.get("*", (req, res) => {
  res.status(404).redirect("/484");
  
});



const PORT = 3000;

Server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



