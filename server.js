const app = require("./src/app.js")

const PORT = 5000

app.listen(PORT,(req,res)=>{
    console.log(`Server is running on port ${PORT}`)
})