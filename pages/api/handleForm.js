import { Configuration, OpenAIApi } from 'openai';

const mySecret = process.env['OPENAI_API_KEY']

if(!mySecret){
  console.log('Missing API Key');
}

const configuration = new Configuration({
  apiKey: mySecret,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const prompt = `fill out the following javaScript array of arrays with a quiz on ${req.body.subject} subject with ${req.body.topic} that covers ${req.body.material}. The array of arrays is of the form: [["question", "correctanswer", "wrongoption", "wrongoption", "wrongoption"], ["question", "correctanswer", "wrongoption", "wrongoption", "wrongoption"] , which shows two arrays in an array. Add 10 more arrays to this array where the value 'correctanswer' is always correct and the values 'wrongoption' are always wrong but tricky. The output you give should be a valid javaScript array.`;

      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${prompt}`,
        temperature: 0,
        max_tokens: 3000,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
      });

      res.status(200).send({
        bot: response.data.choices[0].text
      })
    } catch (error) {
      console.error(error)
      res.status(500).send(error || 'Something went wrong')
    }
  }
}