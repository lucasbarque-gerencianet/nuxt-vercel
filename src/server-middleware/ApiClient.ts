import https from 'https';
import axios from 'axios';
import httpstatus from 'http-status-codes';

const ApiClient = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

interface ResponseClient {
  response: {
    data: {
      friendly_message: string;
      description: string;
    };
    message: string;
  };
}

const getErrorFromResponse = ({ response }: ResponseClient): String => {
  if (response.data) {
    if (response.data.friendly_message) {
      const friendlyMessage = response.data.friendly_message.trim();
      if (friendlyMessage !== '' && friendlyMessage.toLowerCase() !== 'no friendly message') {
        return friendlyMessage;
      }
    }
    if (response.data.description) {
      const description = response.data.description.trim();
      if (description !== '' && description.toLowerCase() !== 'no description') {
        return description;
      }
    }
  }

  if (response.message) {
    const message = response.message.trim();
    if (message !== '' && message.toLowerCase() !== 'no message') {
      return message;
    }
  }
  return 'Ops, ocorreu um erro.';
};

ApiClient.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    const { response } = error;

    if (response) {
      const { status, data } = response;
      if (status === httpstatus.UNAUTHORIZED) {
        error.message = 'Erro de autenticação.';
      } else {
        error.message = getErrorFromResponse(data);
      }
    }
    return Promise.reject(error);
  }
);

export default ApiClient;
