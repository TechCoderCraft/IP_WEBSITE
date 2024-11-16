const path = require("path")


module.exports = {
  name: "/home",
  run: async (req, res) => {

   
    
  
   
   
    
    
    

    // Clear the require cache for the EJS file
    delete require.cache[require.resolve("./Home.ejs")]


      // Render the EJS file with dat
      res.render(path.join(__dirname, "./Home.ejs"), {ip: req.ip})
    



  },
}
