import { Configuration, OpenAIApi } from 'openai'
import fs from 'fs'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const url = body.url // the article URL

  // Setup open AI
  const { OPENAI_API_KEY } = useRuntimeConfig()
  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  })
  const openai = new OpenAIApi(configuration)

  // 1. make a request to the Chat API to generate the DALL-E prompt
  const { data: CCC } = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a prompt enginer for DALL-E' },
      {
        role: 'user',
        content: `Provide 4 physical objects related to ${url}`,
      },
    ],
    temperature: body.temperature || 1,
  })

  const addPrompt = CCC?.choices[0].message?.content ?? null

  if (!addPrompt) throw new Error('no DALL-E connection')

  // 2 make a request to DALL-E to generate the image
  const { data } = await openai.createImage({
    prompt: addPrompt,
    n: 1,
    size: '256x256',
  })
  const imageURL = data.data[0]?.url

  if (!imageURL)
    throw new Error('No image URL')
  
  // console.log(imageURL);

  // 3. return the image as a base64 encoded string for using with html-to-image on the front-end

  /*HINT: The following code is useful for creating a base64 encoded string for an image */

  const res = (await $fetch(imageURL, {
    responseType: 'arrayBuffer',
  })) as Buffer
  const base64String = Buffer.from(res).toString('base64')
  return `data:image/jpeg;base64,${base64String}`

  return '/image-background.jpg' // replae this with the base64 encoded generated image
})
