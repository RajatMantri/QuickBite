const express = require('express')
const app = express()
const port = 5000;
const MongoDB=require('./db')

MongoDB();

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})

app.use(express.json());
app.use('/api',require("./routes/User"));
app.use('/api',require("./routes/DisplayData"));
app.use('/api',require('./routes/OrderData'));
app.use('/api',require('./routes/Auth'));
app.use('/api',require('./routes/Profile'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})