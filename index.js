const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const morgan = require('morgan')
const app = express()
const port = 8080
const db = require('./src/config/db')
const Link = require('./src/app/models/user')

app.use(express.json())
app.use(express.urlencoded({extended : true}))
dotenv.config()
app.use(morgan('combined'))
app.use(cors([
  {
    origin: 'https://sansalesapsan.online'
  }
]));

db.connect()


app.post('/api/live_x', async (req, res) => {
  let haha = setInterval(async () => {
    const links1 = await Link.find({})
    if (links1.length == 0) {
      try {
        const links = await Link.find({})
        let num = 0
        links.forEach ((link) => {
            if (link.queue > num) {
                num = link.queue
            }
        })  
        const link = new Link (req.body)
        link.queue = num + 1
        await link.save()
        let isChanged = false;

        let int = setInterval(async () => {
            const links1 = await Link.find({})
            for (const link of links1) {
              if (link.queue == num + 1) {
                if (link.status != 0) {
                  // await Link.deleteOne({ queue: num + 1 });
                  await Link.updateOne({queue : num + 1},{delete1 : true})
                  if (isChanged == false) {
                    isChanged = true
                    if (link.status == 1) {
                      res.json({ status: 200, message: 'success' });
                    } else if (link.status == -1){
                        res.json({ status: 200, message: 'fail' });
                    }
                    clearInterval(int)
                  }
                }
                return;
              }
            }
        }, 200)
      } catch (error) {
          res.json({status : 500})
      } finally {
        clearInterval(haha)
      }
    }
  }, 400) 
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})