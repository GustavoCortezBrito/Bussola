/**
 * ⚠️ TEXTOS E NÚMEROS DE EXEMPLO — substituir pelos dados reais do empreendimento
 * e validar com o jurídico/incorporadora antes de publicar. Em especial:
 *  - o bloco de governança (auditoria, conselho fiscal, SPE) precisa refletir o
 *    que de fato será contratado;
 *  - não incluir promessa de rentabilidade/valorização sem respaldo legal;
 *  - inserir número do registro de incorporação/memorial no rodapé.
 */

export const stats: {
  to?: number;
  text?: string;
  suffix?: string;
  label: string;
}[] = [
  { to: 48, label: "Unidades" },
  { text: "1–4", label: "Dormitórios" },
  { text: "38–168", suffix: " m²", label: "Áreas privativas" },
  { to: 8, suffix: " min", label: "Da praia, a pé" },
];

export const pillars = [
  {
    n: "01",
    title: "Custo",
    lead: "Você paga o que a obra custa.",
    points: [
      "A obra é executada pelo custo real orçado, sem a margem de incorporação embutida no preço de venda.",
      "Orçamento paramétrico elaborado por consultoria independente, com custos diretos e indiretos.",
      "Os custos reais podem variar ao longo da obra. Por isso, o acompanhamento é mensal.",
    ],
  },
  {
    n: "02",
    title: "Segurança",
    lead: "Estrutura societária própria para o projeto.",
    points: [
      "Terreno e recursos ficam na SPE criada exclusivamente para este empreendimento.",
      "Gestão profissional dos recursos, separada das contas da incorporadora.",
      "Auditoria contábil independente a cada ano.",
    ],
  },
  {
    n: "03",
    title: "Transparência",
    lead: "Você enxerga a obra e as contas.",
    points: [
      "Boletim mensal com andamento físico e financeiro da obra.",
      "Assembleias periódicas com todos os adquirentes.",
      "Conselho fiscal eleito pelos adquirentes, com acesso aos documentos da SPE.",
    ],
  },
];

export const steps = [
  {
    n: "01",
    title: "Conheça o projeto",
    text: "Plantas, memorial, localização e condições. Tire todas as dúvidas com um consultor.",
  },
  {
    n: "02",
    title: "Analise orçamento e regulamento",
    text: "Veja o orçamento independente, o cronograma e as regras da SPE antes de decidir.",
  },
  {
    n: "03",
    title: "Garanta sua unidade",
    text: "Escolha a tipologia e o pavimento e formalize a adesão com assessoria completa.",
  },
  {
    n: "04",
    title: "Acompanhe a obra",
    text: "Boletins mensais, visitas e assembleias até a entrega das chaves.",
  },
];

export const chapters = [
  {
    mediaId: "projeto-luz",
    kicker: "Arquitetura que respira",
    title: "Luz e ventilação",
    text: "Varandas generosas, ventilação cruzada e brises de madeira que filtram o sol. Cada apartamento foi desenhado para receber luz natural o dia todo e vista aberta para o verde e para o mar.",
  },
  {
    mediaId: "projeto-verde",
    kicker: "Vida por todo lado",
    title: "Verde que atravessa o térreo",
    text: "Um jardim sombreado cruza o pavimento térreo e abraça o edifício. É o ponto de encontro do condomínio e a ligação do projeto com a rua, a ciclovia e o comércio do bairro.",
  },
  {
    mediaId: "projeto-rooftop",
    kicker: "No alto",
    title: "Rooftop com piscina",
    text: "Piscina, deck e espaço gourmet na cobertura, com vista para o mar e para os morros. Áreas comuns entregues mobiliadas, decoradas e com paisagismo pronto.",
  },
];

export const amenities = [
  "Piscina no rooftop",
  "Academia equipada",
  "Sauna",
  "Salão de festas",
  "Espaço kids",
  "Espaço gourmet",
  "Bicicletário e oficina",
  "Preparação para recarga elétrica",
];

export const typologies = [
  {
    key: "1",
    name: "1 dormitório",
    area: "38–52 m²",
    suites: "1 suíte",
    text: "Compactos e eficientes, com varanda e ótima ventilação. Pensados para morar bem ou para renda de locação.",
  },
  {
    key: "2",
    name: "2 dormitórios",
    area: "60–85 m²",
    suites: "1 suíte + 1 dormitório",
    text: "Planta flexível, sala integrada à varanda e opção de espaço home office.",
  },
  {
    key: "3",
    name: "3 dormitórios",
    area: "95–125 m²",
    suites: "3 suítes",
    text: "Amplos, com varanda gourmet, lavabo e vista privilegiada nos pavimentos altos.",
  },
  {
    key: "4",
    name: "Cobertura 4 dormitórios",
    area: "140–168 m²",
    suites: "4 suítes",
    text: "Duplex com terraço privativo, espaço para piscina e a melhor vista do empreendimento.",
  },
];

export const distances = [
  { label: "Praia", value: "8 min a pé" },
  { label: "Mercado, padaria e café", value: "3 min a pé" },
  { label: "Ciclovia", value: "em frente ao projeto" },
  { label: "Restaurantes e comércio", value: "5 min a pé" },
  { label: "Aeroporto", value: "15 min de carro" },
  { label: "Centro de Florianópolis", value: "25 min de carro" },
];

export const partners = [
  {
    role: "Incorporação e gestão",
    name: "Incorporadora parceira",
    text: "Concebe e estrutura o empreendimento, gere o negócio e o relacionamento com os adquirentes.",
  },
  {
    role: "Gestão técnica da obra",
    name: "Construtora responsável",
    text: "Planejamento, coordenação, controle de qualidade e de custos, relatórios mensais e garantia pós-obra.",
  },
  {
    role: "Orçamento independente",
    name: "Consultoria de engenharia",
    text: "Orçamento paramétrico com custos diretos e indiretos, de obra, paisagismo e mobiliário das áreas comuns.",
  },
  {
    role: "Auditoria contábil",
    name: "Auditoria independente",
    text: "Revisão anual das contas da SPE, com relatório disponível para os adquirentes.",
  },
];

export const faq = [
  {
    q: "O que significa construir a preço de custo?",
    a: "Significa que a obra é executada pelo custo real orçado, sem a margem de lucro que a incorporação tradicional embute no preço de venda. Os adquirentes arcam com o custo da obra e acompanham a execução e as contas ao longo do projeto.",
  },
  {
    q: "O que é uma SPE?",
    a: "É a Sociedade de Propósito Específico, uma empresa criada somente para este empreendimento. O terreno e os recursos da obra ficam nela, separados das demais atividades da incorporadora. O regulamento e o contrato explicam os direitos e deveres de cada adquirente.",
  },
  {
    q: "Como acompanho o andamento da obra?",
    a: "Por boletins mensais de andamento físico e financeiro, assembleias periódicas e acesso aos documentos da SPE por meio do conselho fiscal eleito pelos adquirentes.",
  },
  {
    q: "O custo final pode mudar?",
    a: "Sim. Como a obra é feita a preço de custo, o valor final depende dos custos reais de execução, que podem variar. O orçamento é elaborado por consultoria independente e atualizado e informado nos boletins mensais.",
  },
  {
    q: "Existe garantia de valorização ou retorno?",
    a: "Não. Imóveis podem se valorizar ou não, e a rentabilidade com locação depende do mercado. Qualquer projeção deve ser analisada com cautela e à luz do regulamento do empreendimento.",
  },
  {
    q: "Como funciona o pagamento?",
    a: "As condições (entrada, parcelas e fluxo ao longo da obra) estão no regulamento e variam conforme a unidade. Fale com um consultor para receber a tabela atualizada e simular a sua compra.",
  },
];
