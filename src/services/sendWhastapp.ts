type sendWhatsAppProps = {
  placa: string | undefined,
  servicos: {
    name: string
    linkUrl: string
  }[]
}

export const sendWhatsApp = ({ placa = '', servicos }: sendWhatsAppProps) => {
  let url = `https://web.whatsapp.com/send?phone=+5534999731817`
  url += `&text=Olá! Estou entrando em contato para enviar um orçamento para o serviço/produto que você solicitou.
  Por favor, acesse o link abaixo para visualizar o orçamento completo:

  Qualquer dúvida, estou à disposição para esclarecimentos. Desde já, agradeço pelo interesse em nossos serviços/produtos.`
  window.open(url)
}
