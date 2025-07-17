const {connectDB} = require('./src/database/db')
const {app} = require('./src/app')
const port = process.env.PORT 
connectDB().then(()=>{
    app.listen( port||5000,()=>{
    console.log(`Server is running on ${port} url: http://localhost:${port}`)
});
}).catch((err) =>{
    console.log('Error connecting to the database',err)
})
