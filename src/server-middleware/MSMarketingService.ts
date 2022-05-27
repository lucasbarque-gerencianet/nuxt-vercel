import express, { Request, Response } from 'express';
import ApiClient from './ApiClient';

const app = express();
app.use(express.json());

app.post('/send-lead', async (request: Request, response: Response) => {
  try {
    const { body } = request;

    const payload = {
      ...body,
      origin: {
        system: 'Novos Negócios',
        link: '/novos-negocios/',
      },
      type: 'novos_negocios',
      sendToSalesforce: true,
    };

    const responseData = await ApiClient.post(
      'https://ms-marketing.m13340921.orp-1.colaboradores.labgerencianet.com.br/lead/insert',
      payload
    );
    return response.status(responseData.status).json(responseData.data);
  } catch (err) {
    return response.status(400).json(err);
  }
});

export default app;
