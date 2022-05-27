export const actions = {
  async sendVamosConversar(_, formData) {
    try {
      const response = await this.$axios.post(process.env.URL_MSMARKETING + '/api/marketing/send-lead', formData);
      if (response.status === 200) {
        return { code: 200, message: 'Mensagem enviada com sucesso!' };
      }
      return { code: 400, message: 'Erro ao enviar mensagem' };
    } catch (error) {
      return { code: 400, message: 'Ocorreu um erro, tente novamente mais tarde.' };
    }
  },
};
