import axios from 'axios'
import { config } from 'dotenv'
import express from 'express'

config()
const app = express()

const TELEGRAM_URI = `https://api.telegram.org/bot${process.env.TELEGRAM_API_TOKEN}/sendMessage`

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)

app.post('/new-message', async (req, res) => {
    const { message } = req.body
    const chatId = message?.chat?.id

    console.log(message)
    console.log(chatId)

    if (message.text == "Привет") {
      hello(chatId, res)
    }
    else {
      another(chatId, res)
    };
    
})

function hello(chatId, res){
  try {
    axios.post(TELEGRAM_URI, {
      chat_id: chatId,
      text: "Приветы!",
    })
    res.send('Done')
  }
  catch (e) {
    console.log(e)
    res.send(e)
  }
}

function another(chatId, res){
  try {
    axios.post(TELEGRAM_URI, {
      chat_id: chatId,
      text: "Чевось хошь?",
    })
    res.send('Done')
  }
  catch (e) {
    console.log(e)
    res.send(e)
  }
}

app.get('/', async (req, res) => {
    res.send("Hello! I am a bot, how can i help you?");
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})