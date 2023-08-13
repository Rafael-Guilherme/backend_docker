import axios from 'axios'
import { format } from 'date-fns'
import { Router } from 'express'

const aboutRoutes = Router()

aboutRoutes.get('/webVersion', async (request, response) => {
  const { data } = await axios.get('https://api.github.com/repos/dordetto/socialmentes-web/commits/main', {
    headers: {
      Authorization: `token ${process.env.GITHUB_KEY}`
    }
  })

  const date = new Date(data.commit.author.date)
  const version = format(date, "'V'ddMMyy")

  return response.json(version)
})

export default aboutRoutes
