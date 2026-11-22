// Conteúdo do site. Para adicionar alguém, inclua um objeto em MENTES e rode `npm test`.
// Regra editorial: a verdade vem antes do mito. Fatos incômodos e documentados vão em `verdade`.

export type AreaId = keyof typeof AREAS;

export interface Pessoa {
  id: string;
  nome: string;
  apelido?: string;
  nascimento: number;
  morte: number;
  local: string;
  areas: AreaId[];
  resumo: string;
  historia: string[];
  marcos: { ano: number; texto: string }[];
  legado: string;
  /** O que o mito costuma esconder. Fatos documentados ou o debate entre historiadores. */
  verdade?: string[];
  citacao?: { texto: string; fonte: string };
  /** Onde conferir o que está escrito, sobretudo em "verdade". */
  fontes?: { titulo: string; url: string }[];
  /** Para quem não tem retrato autêntico: a imagem é uma representação artística. */
  imagem?: "foto" | "pintura" | "imaginada";
}

export const AREAS = {
  liberdade: { nome: "Liberdade", cor: "#c2410c" },
  politica:  { nome: "Política", cor: "#1d4ed8" },
  ciencia:   { nome: "Ciência", cor: "#0f766e" },
  saude:     { nome: "Saúde", cor: "#be123c" },
  letras:    { nome: "Letras", cor: "#7c3aed" },
  artes:     { nome: "Artes", cor: "#b45309" },
  educacao:  { nome: "Educação", cor: "#15803d" },
} as const satisfies Record<string, { nome: string; cor: string }>;

export const MENTES: Pessoa[] = [
  {
    id: "zumbi-dos-palmares",
    imagem: "imaginada",
    nome: "Zumbi dos Palmares",
    nascimento: 1655, morte: 1695,
    local: "Serra da Barriga, Alagoas",
    areas: ["liberdade"],
    resumo: "Chefe guerreiro de Palmares. Símbolo da resistência negra e, ao mesmo tempo, líder violento num quilombo que também tinha cativos.",
    historia: [
      "Nasceu livre em Palmares, um conjunto de comunidades formadas por pessoas que fugiram da escravidão na Serra da Barriga. Ainda criança, foi capturado e entregue a um padre, que o batizou de Francisco e o ensinou a ler. Aos quinze anos fugiu e voltou para casa.",
      "Palmares não era uma aldeia só, mas vários mocambos, com milhares de pessoas, que resistiram por quase um século a dezenas de expedições militares. Em 1678, o rei Ganga Zumba, tio de Zumbi, aceitou um acordo de paz com o governo de Pernambuco. Zumbi rompeu com o tio e liderou os que recusaram o acordo.",
      "Pouco depois, Ganga Zumba morreu envenenado, e Zumbi se tornou o principal chefe de Palmares.",
      "Zumbi não era um intelectual: era um chefe militar, num mundo de guerra permanente. Resistiu até 1694, quando o bandeirante Domingos Jorge Velho destruiu a capital, Macaco. Zumbi escapou, mas foi traído e morto em 20 de novembro de 1695. A data de sua morte virou o Dia da Consciência Negra.",
    ],
    marcos: [
      { ano: 1655, texto: "Nasce no Quilombo dos Palmares." },
      { ano: 1678, texto: "Rompe com o tio, Ganga Zumba, que aceitou um acordo de paz." },
      { ano: 1680, texto: "Ganga Zumba morre envenenado; Zumbi assume a liderança (data discutida)." },
      { ano: 1694, texto: "Queda do Macaco, a capital de Palmares." },
      { ano: 1695, texto: "É morto em 20 de novembro." },
      { ano: 2024, texto: "O 20 de novembro passa a ser feriado nacional." },
    ],
    legado: "Palmares mostra que a escravidão foi combatida desde o início. Zumbi virou símbolo sobretudo no século XX, e o símbolo é maior que o homem que conhecemos.",
    verdade: [
      "Quase tudo o que se sabe sobre Zumbi vem de documentos escritos por seus inimigos: autoridades coloniais e militares portugueses.",
      "Zumbi chegou ao poder rompendo com o próprio tio, Ganga Zumba, que morreu envenenado. Parte dos historiadores atribui a morte a Zumbi ou a seus aliados; outros apontam que não há prova e que os portugueses também tinham motivo. Não há consenso.",
      "Havia cativos em Palmares: o próprio acordo de 1678 exigia que fossem devolvidos aos senhores os cativos que não tinham nascido nos mocambos. Se Zumbi pessoalmente mantinha escravizados é tema de debate entre historiadores, e há quem, como Silvia Lara (Unicamp), conteste essa leitura.",
      "Era um chefe de guerra. Os ataques de Palmares a engenhos e povoados para obter armas, mantimentos e pessoas eram violentos e deixavam mortos.",
      "Não existe nenhum retrato de Zumbi. A imagem usada aqui é uma pintura de Antônio Parreiras, feita mais de 200 anos depois.",
    ],
    fontes: [
      { titulo: "Pesquisa FAPESP: documentos originais revelam novos aspectos de Palmares", url: "https://revistapesquisa.fapesp.br/documentos-originais-revelam-novos-aspectos-da-historia-de-palmares/" },
      { titulo: "Brasil de Fato: existiu escravidão em Palmares? (Silvia Lara)", url: "https://www.brasildefato.com.br/2023/11/22/existiu-escravidao-em-palmares-historiadora-explica-equivocos-sobre-tema" },
      { titulo: "Gazeta do Povo: o que sabemos sobre Zumbi", url: "https://www.gazetadopovo.com.br/ideias/sabemos-sobre-zumbi-palmares/" },
      { titulo: "Encyclopedia.com: Ganga Zumba", url: "https://encyclopedia.com/humanities/encyclopedias-almanacs-transcripts-and-maps/ganga-zumba-1680" },
    ],
  },
  {
    id: "aleijadinho",
    imagem: "imaginada",
    nome: "Antônio Francisco Lisboa",
    apelido: "Aleijadinho",
    nascimento: 1738, morte: 1814,
    local: "Vila Rica (Ouro Preto), Minas Gerais",
    areas: ["artes"],
    resumo: "Escultor e arquiteto, o maior nome do barroco brasileiro.",
    historia: [
      "Filho de um arquiteto português e de uma mulher escravizada, aprendeu o ofício ainda menino, nas obras do pai em Vila Rica, a cidade mais rica da colônia durante o ciclo do ouro.",
      "Por volta dos quarenta anos foi atingido por uma doença degenerativa que deformou suas mãos e pés. Mesmo assim continuou trabalhando, com as ferramentas amarradas às mãos, carregado por seus ajudantes.",
      "Foi nesse período que criou suas obras mais famosas: os doze Profetas em pedra-sabão e as figuras dos Passos da Paixão, em cedro, no Santuário do Bom Jesus de Matosinhos, em Congonhas. É uma arte que já não copia a Europa: é brasileira.",
    ],
    marcos: [
      { ano: 1738, texto: "Nasce em Vila Rica (data aproximada)." },
      { ano: 1766, texto: "Começa a trabalhar na Igreja de São Francisco de Assis, em Ouro Preto." },
      { ano: 1796, texto: "Inicia as figuras dos Passos, em Congonhas." },
      { ano: 1800, texto: "Começa os doze Profetas em pedra-sabão." },
      { ano: 1985, texto: "O Santuário de Congonhas vira Patrimônio Mundial da UNESCO." },
    ],
    legado: "Mostrou que o talento brasileiro cria algo próprio, mesmo nas piores condições.",
    verdade: [
      "Quase toda a sua biografia vem de um único texto, escrito por Rodrigo Bretas em 1858, mais de quarenta anos após sua morte. Historiadores apontam que Bretas romantizou a história, talvez inspirado em O Corcunda de Notre-Dame.",
      "Até a data de nascimento é incerta: o registro de batismo indica 1730, e Bretas escreveu 1738.",
      "Muitas obras atribuídas a ele foram feitas, ao menos em parte, pela sua oficina, que incluía escravizados.",
      "Não há retrato autêntico. A imagem mais conhecida é um \"suposto retrato\".",
    ],
    fontes: [
      { titulo: "Pesquisa FAPESP: Paranoia ou mistificação?", url: "https://revistapesquisa.fapesp.br/paranoia-ou-mistificacao/" },
    ],
  },
  {
    id: "tiradentes",
    imagem: "imaginada",
    nome: "Joaquim José da Silva Xavier",
    apelido: "Tiradentes",
    nascimento: 1746, morte: 1792,
    local: "Fazenda do Pombal, Minas Gerais",
    areas: ["politica", "liberdade"],
    resumo: "Alferes e dentista prático, mártir da Inconfidência Mineira.",
    historia: [
      "Foi tropeiro, minerador, dentista e alferes da cavalaria de Minas. O apelido veio do ofício de arrancar e tratar dentes. Andando pelas estradas da capitania, viu de perto o peso dos impostos cobrados por Portugal sobre o ouro.",
      "Em 1789, um grupo de intelectuais, padres, militares e proprietários planejou separar Minas Gerais de Portugal no dia da derrama, a cobrança forçada de impostos atrasados. O plano foi denunciado antes de começar.",
      "Todos foram presos, mas apenas Tiradentes foi executado: assumiu a responsabilidade e foi enforcado no Rio de Janeiro em 21 de abril de 1792. Seu corpo foi esquartejado e exposto pelas estradas, para servir de exemplo. Virou exemplo, mas do contrário.",
    ],
    marcos: [
      { ano: 1746, texto: "Nasce na região de São João del-Rei." },
      { ano: 1789, texto: "A Inconfidência Mineira é denunciada; ele é preso." },
      { ano: 1792, texto: "É enforcado no Rio de Janeiro, em 21 de abril." },
      { ano: 1965, texto: "Declarado Patrono Cívico da Nação Brasileira." },
    ],
    legado: "O 21 de abril lembra que a ideia de um Brasil livre custou vidas.",
    verdade: [
      "Não existe nenhum retrato feito em vida. A imagem de barba e cabelos longos, parecida com Cristo, foi criada no fim do século XIX, quando a República precisava de um mártir. Ninguém sabe como era o seu rosto.",
      "A Inconfidência foi um movimento da elite mineira, motivado sobretudo pelos impostos. O plano não previa o fim da escravidão: vários inconfidentes eram donos de escravizados.",
      "Ele foi o único executado também porque era o de menor posição social do grupo.",
    ],
    citacao: { texto: "Se dez vidas eu tivesse, dez vidas eu daria.", fonte: "Frase atribuída a Tiradentes" },
    fontes: [
      { titulo: "Pesquisa FAPESP: Representação de um herói", url: "https://revistapesquisa.fapesp.br/representacao-de-um-heroi/" },
    ],
  },
  {
    id: "jose-bonifacio",
    imagem: "pintura",
    nome: "José Bonifácio de Andrada e Silva",
    nascimento: 1763, morte: 1838,
    local: "Santos, São Paulo",
    areas: ["politica", "ciencia"],
    resumo: "Cientista de renome na Europa e Patriarca da Independência.",
    historia: [
      "Antes de ser político, foi um dos mineralogistas mais respeitados da Europa. Estudou em Coimbra e viajou pelo continente pesquisando minas; na Suécia, identificou dois minerais novos, a petalita e o espodumênio. A andradita recebeu esse nome em sua homenagem.",
      "De volta ao Brasil, já com quase sessenta anos, tornou-se o principal conselheiro de Dom Pedro I e articulou a Independência de 1822. Pensava longe: defendia o fim gradual da escravidão, a integração dos povos indígenas e a mudança da capital para o interior.",
      "Suas ideias incomodaram e ele foi exilado na França. Voltou, foi escolhido por Pedro I como tutor do filho, o futuro Pedro II, e terminou a vida em Paquetá.",
    ],
    marcos: [
      { ano: 1763, texto: "Nasce em Santos." },
      { ano: 1800, texto: "Descreve a petalita e o espodumênio, na Suécia." },
      { ano: 1822, texto: "Lidera a articulação da Independência." },
      { ano: 1823, texto: "Defende o fim gradual da escravidão; é exilado." },
      { ano: 1831, texto: "Torna-se tutor do menino Pedro II." },
    ],
    legado: "Provou que ciência e projeto de país andam juntos.",
    verdade: [
      "Como ministro, perseguiu adversários políticos: em 1822 abriu processos e mandou prender e deportar opositores, episódio conhecido como \"Bonifácia\".",
      "Defendia o fim da escravidão, mas de forma lenta e gradual, para não prejudicar a economia dos proprietários.",
    ],
    fontes: [
      { titulo: "Revista Princípios: a Bonifácia, primeira devassa política do Brasil", url: "https://revistaprincipios.emnuvens.com.br/principios/article/download/186/103" },
    ],
  },
  {
    id: "maria-firmina-dos-reis",
    nome: "Maria Firmina dos Reis",
    nascimento: 1822, morte: 1917,
    local: "São Luís, Maranhão",
    areas: ["letras", "educacao", "liberdade"],
    resumo: "Autora de Úrsula, o primeiro romance abolicionista do Brasil.",
    historia: [
      "Mulher negra numa sociedade escravista, foi aprovada em concurso público para professora em Guimarães, no Maranhão, em 1847. Era raríssimo uma mulher ocupar esse cargo.",
      "Em 1859 publicou Úrsula, assinando apenas \"Uma maranhense\". É considerado o primeiro romance escrito por uma brasileira e o primeiro com caráter abolicionista. Pela primeira vez, personagens escravizados contavam a própria história, como a africana Mãe Susana, que lembra a liberdade perdida.",
      "Em 1880, já aposentada, fundou uma escola gratuita onde meninos e meninas estudavam juntos, algo inédito na época. Morreu pobre e quase esquecida, até ser redescoberta no século XX.",
    ],
    marcos: [
      { ano: 1822, texto: "Nasce em São Luís." },
      { ano: 1847, texto: "Aprovada em concurso para professora." },
      { ano: 1859, texto: "Publica Úrsula." },
      { ano: 1880, texto: "Funda uma escola mista e gratuita." },
    ],
    legado: "Deu voz a quem a literatura da época tratava como objeto.",
    verdade: [
      "Não existe nenhum retrato autêntico dela. A imagem que circula na internet foi criada a partir de descrições orais recolhidas por seu biógrafo. Por isso, este site não usa nenhuma.",
      "Até o ano de nascimento é incerto: as fontes falam em 1822 ou 1825.",
    ],
    fontes: [
      { titulo: "Rafael Balseiro Zin (Sesc SP): a representação pictórica de Maria Firmina", url: "https://sescsp.org.br/wp-content/uploads/2024/10/RAFAEL-BALSEIRO-ZIN.pdf" },
    ],
  },
  {
    id: "dom-pedro-ii",
    nome: "Dom Pedro II",
    nascimento: 1825, morte: 1891,
    local: "Rio de Janeiro",
    areas: ["politica", "ciencia"],
    resumo: "Imperador por quase cinquenta anos e grande incentivador da ciência e da cultura.",
    historia: [
      "Virou imperador aos cinco anos, quando o pai abdicou e voltou para Portugal. Cresceu estudando e foi declarado maior de idade aos catorze, em 1840. Governou por quase meio século.",
      "Era um dos chefes de Estado mais cultos do seu tempo. Falava vários idiomas, trocava cartas com Louis Pasteur e Victor Hugo, financiava estudantes no exterior e apoiava o Instituto Histórico e Geográfico Brasileiro. Na Exposição de Filadélfia de 1876 foi um dos primeiros a testar o telefone de Graham Bell.",
      "Seu reinado viu a Lei Áurea em 1888. No ano seguinte, a República foi proclamada e ele partiu para o exílio sem resistir, para evitar uma guerra civil. Morreu em Paris, levando consigo um saco de terra brasileira.",
    ],
    marcos: [
      { ano: 1825, texto: "Nasce no Rio de Janeiro." },
      { ano: 1831, texto: "Torna-se imperador, aos cinco anos." },
      { ano: 1840, texto: "Declarado maior de idade e assume o governo." },
      { ano: 1876, texto: "Testa o telefone na Exposição de Filadélfia." },
      { ano: 1889, texto: "Proclamação da República; parte para o exílio." },
    ],
    legado: "Mostrou que governar também é investir em conhecimento.",
    verdade: [
      "Durante quase todo o seu reinado, a escravidão foi legal, e o Brasil foi o último país das Américas a aboli-la. O imperador era contra a escravidão em princípio, mas agiu com muita cautela para não romper com os fazendeiros.",
      "No seu governo aconteceu a Guerra do Paraguai (1864–1870), em que o Paraguai perdeu grande parte da sua população. Em 1866, o governo libertou escravizados da nação para que fossem lutar, e muitos soldados negros ficaram conhecidos como \"voluntários a pau e corda\": recrutados à força.",
    ],
    fontes: [
      { titulo: "Almanack (SciELO): a Lei do Ventre Livre e o recrutamento de 1866", url: "https://scielo.br/pdf/alm/n9/2236-4633-alm-9-00166.pdf" },
      { titulo: "Revista USP: Dom Obá e os voluntários da pátria", url: "https://revistas.usp.br/revusp/article/download/33849/36582" },
    ],
  },
  {
    id: "luiz-gama",
    nome: "Luiz Gama",
    nascimento: 1830, morte: 1882,
    local: "Salvador, Bahia",
    areas: ["liberdade", "letras"],
    resumo: "Vendido como escravo pelo próprio pai, libertou centenas de pessoas nos tribunais.",
    historia: [
      "Nasceu livre, filho de Luísa Mahin, uma africana liberta, e de um fidalgo português. Aos dez anos, o pai, endividado, o vendeu ilegalmente como escravo. Foi levado para São Paulo.",
      "Aprendeu a ler aos dezessete anos, conseguiu provar que tinha nascido livre e fugiu. Trabalhou como escrivão, virou poeta e jornalista e estudou Direito sozinho: foi impedido de cursar a faculdade, mas atuou como rábula, um advogado sem diploma.",
      "Usando as próprias leis do Império, conseguiu nos tribunais a liberdade de centenas de pessoas escravizadas. Quando morreu, em 1882, milhares de pessoas acompanharam seu enterro pelas ruas de São Paulo.",
    ],
    marcos: [
      { ano: 1830, texto: "Nasce livre em Salvador." },
      { ano: 1840, texto: "É vendido como escravo pelo pai." },
      { ano: 1848, texto: "Conquista a liberdade." },
      { ano: 1859, texto: "Publica Primeiras Trovas Burlescas de Getulino." },
      { ano: 2015, texto: "A OAB o reconhece oficialmente como advogado." },
    ],
    legado: "Transformou a lei, feita para oprimir, em ferramenta de libertação.",
    verdade: [
      "O número \"mais de 500 libertados\" é repetido há décadas, mas nunca foi comprovado por uma contagem dos processos. O caso mais bem documentado é a Questão Netto, de 1869, com 217 pessoas libertadas.",
      "Sua mãe, Luísa Mahin, é conhecida quase só pelo que ele próprio escreveu numa carta de 1880. Uma pesquisa de 2025 encontrou documentos que confirmam que ela era sua mãe, mas nenhum que comprove sua participação na Revolta dos Malês, como diz a lenda.",
    ],
    fontes: [
      { titulo: "Agência Brasil: a luta de Luiz Gama inspira pesquisa", url: "https://agenciabrasil.ebc.com.br/direitos-humanos/noticia/2026-05/luta-de-luiz-gama-contra-racismo-inspira-acoes-arte-e-pesquisa" },
      { titulo: "Brasil de Fato: artigo confirma Luiza Mahin como mãe de Luiz Gama", url: "https://www.brasildefato.com.br/podcast/bem-viver/2025/07/31/artigo-inedito-confirma-luiza-mahin-como-mae-de-luiz-gama/" },
    ],
  },
  {
    id: "andre-reboucas",
    imagem: "pintura",
    nome: "André Rebouças",
    nascimento: 1838, morte: 1898,
    local: "Cachoeira, Bahia",
    areas: ["ciencia", "liberdade"],
    resumo: "Engenheiro negro que modernizou o Rio e lutou pelo fim da escravidão.",
    historia: [
      "Neto de uma mulher escravizada liberta e filho de um conselheiro do Império, formou-se engenheiro e estudou na Europa. Num país escravista, um engenheiro negro de prestígio era quase impossível. Ele foi.",
      "Projetou as docas da Alfândega e as Docas Dom Pedro II, no Rio, e trabalhou no abastecimento de água da cidade durante a seca de 1870. Também foi professor da Escola Politécnica.",
      "Ao lado de Joaquim Nabuco, fundou em 1880 a Sociedade Brasileira Contra a Escravidão. Ia além: defendia uma \"democracia rural\", com reforma agrária e terra para os libertos. Leal ao imperador, partiu com a família imperial para o exílio e morreu na ilha da Madeira.",
    ],
    marcos: [
      { ano: 1838, texto: "Nasce em Cachoeira, na Bahia." },
      { ano: 1870, texto: "Trabalha no abastecimento de água do Rio durante a seca." },
      { ano: 1880, texto: "Funda a Sociedade Brasileira Contra a Escravidão." },
      { ano: 1889, texto: "Parte para o exílio com a família imperial." },
      { ano: 1898, texto: "Morre em Funchal, na ilha da Madeira." },
    ],
    legado: "Entendeu que abolir a escravidão sem dar terra e educação era deixar a obra pela metade.",
  },
  {
    id: "dragao-do-mar",
    nome: "Francisco José do Nascimento",
    apelido: "Dragão do Mar",
    nascimento: 1839, morte: 1914,
    local: "Canoa Quebrada, Aracati, Ceará",
    areas: ["liberdade"],
    resumo: "Jangadeiro que fechou o porto de Fortaleza ao tráfico de escravizados.",
    historia: [
      "Homem negro e pobre, começou a trabalhar no mar ainda criança. Tornou-se prático, o profissional que guia os navios no porto de Fortaleza. No Ceará, as jangadas levavam as pessoas escravizadas até os navios que as vendiam para as fazendas do Sul.",
      "Em 1881, ao lado de José Napoleão, um ex-escravizado, ele liderou a greve dos jangadeiros: ninguém mais embarcaria cativos. Sem as jangadas, o tráfico pelo porto parou. Ele perdeu o emprego, mas ganhou o apelido que o tornou lenda.",
      "O movimento deu força à campanha abolicionista cearense. Em 25 de março de 1884, o Ceará aboliu a escravidão, quatro anos antes da Lei Áurea, e ganhou o nome de Terra da Luz.",
    ],
    marcos: [
      { ano: 1839, texto: "Nasce em Canoa Quebrada." },
      { ano: 1881, texto: "Lidera a greve dos jangadeiros em Fortaleza." },
      { ano: 1884, texto: "O Ceará abole a escravidão, em 25 de março." },
    ],
    legado: "Provou que uma recusa coletiva de trabalhadores comuns pode mudar o rumo de um país.",
    verdade: [
      "A greve não foi obra de um homem só. A Sociedade Cearense Libertadora, formada em boa parte por abolicionistas brancos e ricos, organizou o movimento e escolheu o Dragão do Mar como seu símbolo.",
      "Libertos como José Luís Napoleão e Tia Simoa tiveram papel decisivo e foram quase apagados da história, enquanto o Dragão do Mar virou lenda.",
    ],
    citacao: { texto: "No porto do Ceará não se embarcam mais escravos.", fonte: "Lema da greve dos jangadeiros, 1881" },
    fontes: [
      { titulo: "O POVO: Napoleão, Tia Simoa e outros dragões do mar", url: "https://mais.opovo.com.br/reportagens-especiais/dragoes-do-ceara/2021/01/27/napoleao--tia-simoa-e-outros-dragoes-do-mar.html" },
      { titulo: "Cadernos do Sertão (UECE): o Dragão do Mar como símbolo", url: "https://revistas.uece.br/index.php/cadernospesquisadosertao/article/download/9675/7886/37272" },
    ],
  },
  {
    id: "machado-de-assis",
    nome: "Machado de Assis",
    nascimento: 1839, morte: 1908,
    local: "Morro do Livramento, Rio de Janeiro",
    areas: ["letras"],
    resumo: "Neto de escravizados alforriados, tornou-se o maior escritor do Brasil.",
    historia: [
      "Cresceu pobre no Morro do Livramento, perdeu a mãe cedo e quase não frequentou a escola. Gago e epilético, aprendeu sozinho, vendeu doces, foi aprendiz de tipógrafo e revisor de textos.",
      "Escreveu poesia, teatro, crônicas e contos antes de mudar a literatura brasileira em 1881, com Memórias Póstumas de Brás Cubas, narrado por um defunto. Vieram depois Quincas Borba e Dom Casmurro, com a eterna dúvida sobre Capitu.",
      "Com ironia fina, expôs a hipocrisia da elite do Império. Em 1897 fundou a Academia Brasileira de Letras e foi seu primeiro presidente. É lido e estudado no mundo inteiro.",
    ],
    marcos: [
      { ano: 1839, texto: "Nasce no Rio de Janeiro." },
      { ano: 1881, texto: "Publica Memórias Póstumas de Brás Cubas." },
      { ano: 1891, texto: "Publica Quincas Borba." },
      { ano: 1897, texto: "Funda a Academia Brasileira de Letras." },
      { ano: 1899, texto: "Publica Dom Casmurro." },
    ],
    legado: "A prova de que o gênio brasileiro nasce em qualquer lugar, inclusive no morro.",
    verdade: [
      "Durante muito tempo foi retratado como homem branco. Sua certidão de óbito registra a cor \"branca\", e fotos e ilustrações clarearam sua pele. Só nas últimas décadas sua origem negra foi plenamente reconhecida.",
      "Circula a história de que ele teria pedido para ser enterrado como branco. O historiador Sidney Chalhoub afirma que isso não é verdade.",
      "Foi criticado por não ter militado abertamente no abolicionismo. Pesquisas recentes mostram que a crítica à escravidão está em sua obra, por meio da ironia.",
    ],
    citacao: { texto: "Ao vencedor, as batatas!", fonte: "Quincas Borba, 1891" },
    fontes: [
      { titulo: "Estado de Minas: o que a negritude de Machado diz sobre o Brasil", url: "https://www.em.com.br/cultura/2024/11/6991894-o-que-a-negritude-de-machado-de-assis-diz-sobre-como-brasil-lida-com-racismo.html" },
    ],
  },
  {
    id: "princesa-isabel",
    nome: "Princesa Isabel",
    nascimento: 1846, morte: 1921,
    local: "Rio de Janeiro",
    areas: ["politica", "liberdade"],
    resumo: "Regente do Império, assinou a Lei do Ventre Livre e a Lei Áurea.",
    historia: [
      "Filha de Pedro II, foi a primeira mulher a governar o Brasil, como regente, nas viagens do pai ao exterior.",
      "Em 1871 sancionou a Lei do Ventre Livre, que declarava livres os filhos de mulheres escravizadas nascidos a partir dali. Em 13 de maio de 1888, assinou a Lei Áurea, que extinguiu a escravidão no Brasil, o último país das Américas a fazê-lo.",
      "A lei foi resultado de décadas de luta de abolicionistas, quilombolas e dos próprios escravizados, mas sua assinatura custou caro à monarquia, que perdeu o apoio dos grandes fazendeiros. No ano seguinte, a família imperial foi exilada.",
    ],
    marcos: [
      { ano: 1846, texto: "Nasce no Rio de Janeiro." },
      { ano: 1871, texto: "Sanciona a Lei do Ventre Livre." },
      { ano: 1888, texto: "Assina a Lei Áurea, em 13 de maio." },
      { ano: 1889, texto: "Parte para o exílio com a família." },
    ],
    legado: "O 13 de maio fechou um capítulo, mas o país ainda devia aos libertos terra, escola e trabalho.",
    verdade: [
      "O apelido de \"Redentora\" criou a ideia de que a abolição foi um presente da monarquia. Na verdade, ela veio depois de décadas de fugas em massa, quilombos, revoltas e campanha abolicionista, e o Ceará e o Amazonas já tinham abolido a escravidão em 1884.",
      "A Lei Áurea tem só dois artigos. Não previu terra, escola, trabalho nem indenização para os libertos, que foram deixados à própria sorte.",
      "Historiadores ainda divergem sobre o papel dela: para uns, apenas assinou uma lei inevitável; para outros, articulou a abolição nos bastidores e pagou o preço político.",
    ],
    fontes: [
      { titulo: "Pesquisa FAPESP: uma Redentora em busca de redenção", url: "https://revistapesquisa.fapesp.br/uma-redentora-em-busca-de-redencao/" },
      { titulo: "Agência Senado: cem anos da morte da Princesa Isabel", url: "https://www12.senado.leg.br/noticias/especiais/arquivo-s/cem-anos-da-morte-da-princesa-isabel-a-regente-que-reinou-alem-do-machismo" },
    ],
  },
  {
    id: "chiquinha-gonzaga",
    nome: "Chiquinha Gonzaga",
    nascimento: 1847, morte: 1935,
    local: "Rio de Janeiro",
    areas: ["artes", "liberdade"],
    resumo: "Primeira maestrina do Brasil e autora da primeira marchinha de carnaval.",
    historia: [
      "Separou-se do marido numa época em que isso era escândalo e foi rejeitada pela família. Decidiu viver da música, tocando piano em lojas e bailes para sustentar o filho.",
      "Misturou a música europeia dos salões com os ritmos populares e negros do Rio, como o lundu e o maxixe, e ajudou a criar o choro. Em 1885 tornou-se a primeira mulher a reger uma orquestra no Brasil. Em 1899 compôs \"Ó Abre Alas\", a primeira marchinha de carnaval.",
      "Era abolicionista e republicana: vendeu partituras para comprar a alforria de um músico escravizado. Em 1917 ajudou a fundar a Sociedade Brasileira de Autores Teatrais, que defende os direitos autorais dos artistas.",
    ],
    marcos: [
      { ano: 1847, texto: "Nasce no Rio de Janeiro." },
      { ano: 1877, texto: "Faz sucesso com a polca \"Atraente\"." },
      { ano: 1885, texto: "Primeira mulher a reger uma orquestra no Brasil." },
      { ano: 1899, texto: "Compõe \"Ó Abre Alas\"." },
      { ano: 1917, texto: "Ajuda a fundar a SBAT." },
    ],
    legado: "Seu aniversário, 17 de outubro, é o Dia Nacional da Música Popular Brasileira.",
    citacao: { texto: "Ó abre alas, que eu quero passar.", fonte: "Ó Abre Alas, 1899" },
  },
  {
    id: "joaquim-nabuco",
    nome: "Joaquim Nabuco",
    nascimento: 1849, morte: 1910,
    local: "Recife, Pernambuco",
    areas: ["politica", "liberdade", "letras"],
    resumo: "Deputado, diplomata e principal voz do abolicionismo no Parlamento.",
    historia: [
      "Passou a infância no Engenho Massangana, em Pernambuco, onde viu de perto a escravidão. Anos depois, contou ter se marcado para sempre com um jovem escravizado que se jogou a seus pés pedindo para ser comprado por sua madrinha e escapar de um senhor cruel.",
      "Eleito deputado, transformou o Parlamento em palco da campanha abolicionista. Em 1883, no exílio político em Londres, escreveu O Abolicionismo, que mostra a escravidão como a raiz dos atrasos do país.",
      "Depois da República, virou diplomata. Em 1905 tornou-se o primeiro embaixador do Brasil nos Estados Unidos. Também foi um dos fundadores da Academia Brasileira de Letras.",
    ],
    marcos: [
      { ano: 1849, texto: "Nasce no Recife." },
      { ano: 1880, texto: "Funda, com Rebouças, a Sociedade Brasileira Contra a Escravidão." },
      { ano: 1883, texto: "Publica O Abolicionismo." },
      { ano: 1900, texto: "Publica Minha Formação." },
      { ano: 1905, texto: "Primeiro embaixador do Brasil em Washington." },
    ],
    legado: "Mostrou que acabar com a escravidão era só o começo: era preciso desfazer sua obra.",
    verdade: [
      "Defendia uma abolição feita \"de cima\", pelo Parlamento. Em O Abolicionismo escreveu que \"a propaganda abolicionista não se dirige aos escravos\": a mudança deveria vir das leis, não de uma revolta dos cativos.",
      "Era um homem da elite, monarquista, e via a abolição também como forma de modernizar o país e evitar uma revolta social.",
    ],
    citacao: { texto: "A escravidão permanecerá por muito tempo como a característica nacional do Brasil.", fonte: "Minha Formação, 1900" },
    fontes: [
      { titulo: "O Abolicionismo, texto completo (SciELO Livros)", url: "https://static.scielo.org/scielobooks/cs454/pdf/nabuco-9788579820700.pdf" },
    ],
  },
  {
    id: "vital-brazil",
    nome: "Vital Brazil",
    nascimento: 1865, morte: 1950,
    local: "Campanha, Minas Gerais",
    areas: ["saude", "ciencia"],
    resumo: "Criador dos soros contra veneno de cobra e fundador do Instituto Butantan.",
    historia: [
      "Médico no interior de São Paulo, via muita gente do campo morrer de picada de cobra sem tratamento. Decidiu estudar os venenos.",
      "Descobriu que cada tipo de veneno pede um soro específico: o de jararaca não serve para cascavel. Essa descoberta, a especificidade dos soros, salvou milhares de vidas e foi reconhecida no mundo inteiro.",
      "Em 1901 fundou e dirigiu o Instituto Butantan, em São Paulo, que até hoje produz soros e vacinas. Em 1919 criou o Instituto Vital Brazil, em Niterói.",
    ],
    marcos: [
      { ano: 1865, texto: "Nasce em Campanha, Minas Gerais." },
      { ano: 1901, texto: "Funda o Instituto Butantan." },
      { ano: 1919, texto: "Funda o Instituto Vital Brazil, em Niterói." },
    ],
    legado: "Cada soro e cada vacina do Butantan começam na teimosia dele.",
  },
  {
    id: "marechal-rondon",
    nome: "Cândido Rondon",
    apelido: "Marechal Rondon",
    nascimento: 1865, morte: 1958,
    local: "Mimoso, Mato Grosso",
    areas: ["ciencia", "liberdade"],
    resumo: "Explorador que ligou o interior do Brasil pelo telégrafo e defendeu os povos indígenas.",
    historia: [
      "Descendente de indígenas Bororo e Terena, ficou órfão cedo e entrou para o Exército. Chefiou a construção de milhares de quilômetros de linhas telegráficas pelo Centro-Oeste e pela Amazônia, ligando ao resto do país regiões que nem estavam no mapa.",
      "No caminho, mapeou rios, recolheu espécies e fez contato pacífico com dezenas de povos indígenas. Em 1913 e 1914 guiou o ex-presidente americano Theodore Roosevelt pelo Rio da Dúvida, que passou a se chamar Rio Roosevelt.",
      "Em 1910 tornou-se o primeiro diretor do Serviço de Proteção aos Índios, criado por Nilo Peçanha. O antigo Território do Guaporé foi rebatizado de Rondônia em sua homenagem.",
    ],
    marcos: [
      { ano: 1865, texto: "Nasce em Mato Grosso." },
      { ano: 1907, texto: "Começa a Comissão Rondon, de Mato Grosso ao Amazonas." },
      { ano: 1910, texto: "Primeiro diretor do Serviço de Proteção aos Índios." },
      { ano: 1914, texto: "Expedição Roosevelt-Rondon." },
      { ano: 1956, texto: "O Território do Guaporé passa a se chamar Rondônia." },
    ],
    legado: "Abriu caminhos pelo país sem passar por cima de quem já estava lá.",
    verdade: [
      "Os contatos com povos isolados abriram caminho para doenças como gripe e sarampo, que historicamente dizimaram populações indígenas. O tamanho desse efeito na época da Comissão ainda é pouco estudado.",
      "Rondon queria \"integrar\" os indígenas à nação, ainda que pela persuasão e não pela força. Na prática, essa política esperava que eles abandonassem seus modos de vida.",
      "As linhas telegráficas ficaram obsoletas pouco depois de concluídas, com a chegada do rádio.",
    ],
    citacao: { texto: "Morrer se preciso for, matar nunca.", fonte: "Lema de Rondon" },
    fontes: [
      { titulo: "Ciência & Saúde Coletiva: a Comissão Rondon e os povos indígenas", url: "https://scielosp.org/pdf/csc/2024.v29n10/e02592024/pt" },
    ],
  },
  {
    id: "nilo-pecanha",
    nome: "Nilo Peçanha",
    nascimento: 1867, morte: 1924,
    local: "Campos dos Goytacazes, Rio de Janeiro",
    areas: ["politica", "educacao"],
    resumo: "Considerado o primeiro presidente negro do Brasil e pai do ensino técnico federal.",
    historia: [
      "Filho de um padeiro, cresceu numa família humilde em Campos. Estudou Direito, fez carreira política e foi governador do Rio de Janeiro. Por sua origem, foi alvo de muito preconceito da elite da época.",
      "Era vice-presidente quando Afonso Pena morreu, em 1909, e assumiu a Presidência. Governou só um ano e meio, mas deixou marcas: criou as Escolas de Aprendizes Artífices, recriou o Ministério da Agricultura, Indústria e Comércio e criou o Serviço de Proteção aos Índios, entregue a Rondon.",
      "As 19 escolas que ele fundou em 1909 deram origem à atual Rede Federal de Educação Profissional, com centenas de Institutos Federais por todo o país.",
    ],
    marcos: [
      { ano: 1867, texto: "Nasce em Campos dos Goytacazes." },
      { ano: 1909, texto: "Assume a Presidência e cria as Escolas de Aprendizes Artífices." },
      { ano: 1910, texto: "Cria o Serviço de Proteção aos Índios." },
    ],
    legado: "Todo aluno de Instituto Federal estuda numa escola que ele imaginou.",
    verdade: [
      "Seus retratos oficiais eram retocados para clarear a sua pele. A própria família negou por muito tempo sua ascendência negra, e por isso alguns historiadores ainda discutem como classificá-lo.",
      "Fez carreira dentro da política oligárquica da República Velha, marcada pelo voto de cabresto e por fraudes eleitorais, das quais também se beneficiou.",
    ],
    fontes: [
      { titulo: "Correio Braziliense: quem foi o primeiro presidente negro do Brasil", url: "https://www.correiobraziliense.com.br/mundo/2024/11/6992789-quem-foi-o-1-e-unico-presidente-negro-do-brasil.html" },
    ],
  },
  {
    id: "oswaldo-cruz",
    nome: "Oswaldo Cruz",
    nascimento: 1872, morte: 1917,
    local: "São Luiz do Paraitinga, São Paulo",
    areas: ["saude", "ciencia"],
    resumo: "Sanitarista que livrou o Rio da febre amarela e fundou o instituto que virou a Fiocruz.",
    historia: [
      "Estudou no Instituto Pasteur, em Paris, e voltou para um Rio de Janeiro em que navios estrangeiros evitavam atracar por medo da febre amarela, da peste e da varíola.",
      "Em 1900 começou a dirigir o instituto de Manguinhos e, em 1903, assumiu a Saúde Pública. Montou brigadas de mata-mosquitos, caçou ratos e tornou a vacina contra a varíola obrigatória. A medida, aplicada à força, provocou a Revolta da Vacina em 1904.",
      "Mesmo atacado, persistiu: em 1907 a febre amarela estava controlada no Rio, e ele ganhou a medalha de ouro num congresso de higiene em Berlim. Seu instituto virou a Fundação Oswaldo Cruz, a Fiocruz.",
    ],
    marcos: [
      { ano: 1872, texto: "Nasce em São Luiz do Paraitinga." },
      { ano: 1900, texto: "Começa o instituto de Manguinhos." },
      { ano: 1904, texto: "Revolta da Vacina." },
      { ano: 1907, texto: "Febre amarela controlada no Rio; medalha de ouro em Berlim." },
    ],
    legado: "A ciência brasileira que enfrentou epidemias no século XXI vem da casa que ele construiu.",
    verdade: [
      "As brigadas de saúde agiam de forma autoritária: entravam nas casas, mandavam fazer reformas, interditavam e até demoliam imóveis. A regulamentação da vacina obrigatória previa exigir o comprovante para matrícula na escola, emprego, viagem e casamento.",
      "As campanhas de saúde vieram junto com a reforma urbana do prefeito Pereira Passos, que derrubou cortiços e expulsou os mais pobres do centro. A revolta de novembro de 1904 deixou dezenas de mortos, e a obrigatoriedade da vacina foi suspensa.",
    ],
    fontes: [
      { titulo: "Fiocruz (EPSJV): a Revolta da Vacina", url: "https://www.epsjv.fiocruz.br/sites/default/files/livreto_2.pdf" },
      { titulo: "Brown University: the Vaccine Riots in Rio de Janeiro", url: "https://library.brown.edu/create/fivecenturiesofchange/?p=654" },
    ],
  },
  {
    id: "santos-dumont",
    nome: "Alberto Santos Dumont",
    nascimento: 1873, morte: 1932,
    local: "Palmira (hoje Santos Dumont), Minas Gerais",
    areas: ["ciencia"],
    resumo: "O Pai da Aviação, que fez voar o 14-bis diante de Paris.",
    historia: [
      "Filho de um engenheiro que tinha uma fazenda de café, cresceu entre as máquinas da fazenda e os livros de Júlio Verne. Aos 18 anos foi para Paris estudar e construir.",
      "Em 1901 contornou a Torre Eiffel com seu dirigível nº 6 e ganhou o Prêmio Deutsch, dividindo o dinheiro entre seus mecânicos e os pobres de Paris. Em 1906 o 14-bis decolou por meios próprios em Bagatelle, diante de uma multidão e de juízes oficiais: foi o primeiro voo de avião homologado da história.",
      "Não patenteou o avião Demoiselle e divulgou os planos para qualquer um construir. Também popularizou o relógio de pulso. Sofreu muito ao ver o avião sendo usado na guerra.",
    ],
    marcos: [
      { ano: 1873, texto: "Nasce em Minas Gerais." },
      { ano: 1901, texto: "Contorna a Torre Eiffel com o dirigível nº 6." },
      { ano: 1906, texto: "Voos do 14-bis em Paris." },
      { ano: 1907, texto: "Cria o Demoiselle e divulga os planos." },
    ],
    legado: "Patrono da Aeronáutica Brasileira: inventou para o mundo, não para si.",
    verdade: [
      "Os irmãos Wright, nos Estados Unidos, voavam desde 1903, mas sem testemunhas oficiais e com a ajuda de um trilho de lançamento. Santos Dumont foi o primeiro a decolar por meios próprios diante de uma comissão do Aeroclube da França, que homologou o voo.",
      "Por outro lado, o 14-bis não tinha controle lateral para fazer curvas, e os Wright já faziam voos controlados entre 1903 e 1906. Quem \"inventou o avião\" depende do critério, e o debate continua.",
    ],
    fontes: [
      { titulo: "Christian Science Monitor: a century on, Brazil still claims flight's first", url: "https://www.csmonitor.com/2006/1023/p07s02-woam.html" },
      { titulo: "Olhar Digital: quem inventou o avião?", url: "https://olhardigital.com.br/2023/01/03/tira-duvidas/quem-inventou-o-aviao/" },
    ],
  },
  {
    id: "carlos-chagas",
    nome: "Carlos Chagas",
    nascimento: 1879, morte: 1934,
    local: "Oliveira, Minas Gerais",
    areas: ["saude", "ciencia"],
    resumo: "Descobriu sozinho uma doença inteira: o parasita, o transmissor e os sintomas.",
    historia: [
      "Discípulo de Oswaldo Cruz, foi enviado em 1907 a Lassance, no norte de Minas, para combater a malária entre os trabalhadores de uma ferrovia. Lá, ouviu falar de um inseto que picava as pessoas à noite: o barbeiro.",
      "Investigando, encontrou no barbeiro um parasita novo, que chamou de Trypanosoma cruzi em homenagem ao mestre. Em 1909 achou o mesmo parasita no sangue de uma menina de dois anos, Berenice. Pela primeira vez na história, um mesmo cientista descrevia o agente, o transmissor e a doença.",
      "Foi indicado duas vezes ao Prêmio Nobel e dirigiu o Instituto Oswaldo Cruz. A doença de Chagas ainda afeta milhões de pessoas na América Latina.",
    ],
    marcos: [
      { ano: 1879, texto: "Nasce em Oliveira, Minas Gerais." },
      { ano: 1909, texto: "Descreve a doença de Chagas." },
      { ano: 1917, texto: "Assume a direção do Instituto Oswaldo Cruz." },
    ],
    legado: "Um dos feitos mais completos da história da medicina, feito no interior do Brasil.",
    verdade: [
      "Nem tudo o que ele defendeu se confirmou: chegou a propor que o parasita causava o bócio endêmico (papo), associação que nunca foi comprovada.",
      "Em 1922 e 1923, sua descoberta foi duramente contestada na Academia Nacional de Medicina, numa disputa em que também pesaram rivalidades pessoais.",
    ],
    fontes: [
      { titulo: "História, Ciências, Saúde – Manguinhos: Chagas e as controvérsias (1909–1923)", url: "https://www.scielo.br/j/hcsm/a/spypkKQSy4JBGMv5RdRqXNj/" },
    ],
  },
  {
    id: "villa-lobos",
    nome: "Heitor Villa-Lobos",
    nascimento: 1887, morte: 1959,
    local: "Rio de Janeiro",
    areas: ["artes", "educacao"],
    resumo: "O compositor que levou a alma musical do Brasil às salas de concerto do mundo.",
    historia: [
      "Aprendeu violoncelo com o pai e, ainda jovem, tocava violão com os chorões do Rio. Viajou pelo interior do país recolhendo melodias populares e indígenas.",
      "Participou da Semana de Arte Moderna de 1922 e depois conquistou Paris. Nas Bachianas Brasileiras uniu Bach à música do sertão e das ruas. Deixou centenas de obras.",
      "Acreditava que música era para todos: nos anos 1930 e 1940 levou o canto coral às escolas públicas e regeu concentrações com dezenas de milhares de estudantes cantando juntos em estádios.",
    ],
    marcos: [
      { ano: 1887, texto: "Nasce no Rio de Janeiro." },
      { ano: 1922, texto: "Participa da Semana de Arte Moderna." },
      { ano: 1930, texto: "Lança as primeiras Bachianas Brasileiras." },
      { ano: 1932, texto: "Passa a organizar o canto orfeônico nas escolas." },
    ],
    legado: "Mostrou que a música do povo brasileiro é música de primeira grandeza.",
    verdade: [
      "Trabalhou para o Estado Novo, a ditadura de Getúlio Vargas. O canto orfeônico nas escolas também servia para promover a imagem de Vargas e legitimar o regime.",
    ],
    fontes: [
      { titulo: "Revista Fênix: canto orfeônico e o Estado Novo", url: "https://revistafenix.pro.br/revistafenix/article/download/1084/1039/2801" },
    ],
  },
  {
    id: "bertha-lutz",
    nome: "Bertha Lutz",
    nascimento: 1894, morte: 1976,
    local: "São Paulo",
    areas: ["liberdade", "ciencia", "politica"],
    resumo: "Bióloga que liderou a conquista do voto feminino e colocou a igualdade na Carta da ONU.",
    historia: [
      "Filha do cientista Adolfo Lutz, formou-se em Biologia na Sorbonne, em Paris. Em 1919 passou em concurso para o Museu Nacional, numa época em que mulheres raramente ocupavam cargos públicos. Pesquisou anfíbios a vida inteira.",
      "Fundou em 1922 a Federação Brasileira pelo Progresso Feminino e liderou a campanha pelo voto das mulheres, conquistado em 1932. Depois foi eleita deputada federal.",
      "Em 1945, na conferência que criou a ONU, foi uma das poucas mulheres signatárias e lutou para que a Carta das Nações Unidas falasse explicitamente em igualdade de direitos entre homens e mulheres. Conseguiu.",
    ],
    marcos: [
      { ano: 1894, texto: "Nasce em São Paulo." },
      { ano: 1919, texto: "Aprovada em concurso para o Museu Nacional." },
      { ano: 1922, texto: "Funda a Federação Brasileira pelo Progresso Feminino." },
      { ano: 1932, texto: "As brasileiras conquistam o direito de votar." },
      { ano: 1945, texto: "Assina a Carta da ONU." },
    ],
    legado: "Toda brasileira que vota exerce um direito pelo qual ela lutou.",
    verdade: [
      "O voto de 1932 veio com limites: segundo a Câmara dos Deputados, casadas precisavam da autorização do marido, e solteiras e viúvas, de renda própria. O voto só passou a ser obrigatório também para as mulheres em 1946.",
      "Os analfabetos, a maioria da população pobre e negra, homens e mulheres, só puderam votar em 1985.",
      "Historiadores lembram que o voto feminino também atendeu a interesses políticos do governo Vargas, e não foi só fruto da campanha das sufragistas.",
    ],
    fontes: [
      { titulo: "Câmara dos Deputados: a conquista do voto feminino", url: "https://www.camara.leg.br/internet/agencia/infograficos-html5/a-conquista-do-voto-feminino/index.html" },
    ],
  },
  {
    id: "nise-da-silveira",
    nome: "Nise da Silveira",
    nascimento: 1905, morte: 1999,
    local: "Maceió, Alagoas",
    areas: ["saude", "artes"],
    resumo: "Psiquiatra que trocou o choque elétrico pela arte e revolucionou a saúde mental.",
    historia: [
      "Formou-se em Medicina na Bahia em 1926, a única mulher numa turma de 157 homens. Em 1936, durante a ditadura de Vargas, foi presa por ter livros considerados subversivos. Na prisão conheceu Graciliano Ramos, que a citou em Memórias do Cárcere.",
      "De volta ao trabalho, num hospital psiquiátrico do Rio, recusou-se a aplicar eletrochoque e lobotomia, tratamentos comuns na época. Em vez disso, abriu ateliês de pintura e modelagem para os internados.",
      "Pacientes considerados perdidos começaram a se expressar e a melhorar. Ela criou o Museu de Imagens do Inconsciente, com centenas de milhares de obras, trocou cartas com Carl Jung e usou cães e gatos como coterapeutas.",
    ],
    marcos: [
      { ano: 1905, texto: "Nasce em Maceió." },
      { ano: 1926, texto: "Forma-se médica, única mulher da turma." },
      { ano: 1936, texto: "É presa pela ditadura Vargas." },
      { ano: 1946, texto: "Cria a seção de terapêutica ocupacional." },
      { ano: 1952, texto: "Funda o Museu de Imagens do Inconsciente." },
    ],
    legado: "Ensinou que cuidar é escutar, mesmo quem não consegue falar.",
  },
  {
    id: "carolina-maria-de-jesus",
    nome: "Carolina Maria de Jesus",
    nascimento: 1914, morte: 1977,
    local: "Sacramento, Minas Gerais",
    areas: ["letras"],
    resumo: "Catadora de papel que escreveu o diário da fome e virou fenômeno mundial.",
    historia: [
      "Neta de escravizados, estudou só dois anos. Mudou-se para São Paulo e criou sozinha os três filhos na favela do Canindé, catando papel. Nos cadernos que achava no lixo, escrevia sobre o dia a dia: a fome, a violência, os sonhos.",
      "Em 1958 o jornalista Audálio Dantas conheceu seus diários. Em 1960 eles viraram o livro Quarto de Despejo, que vendeu milhares de exemplares na primeira semana e foi traduzido para mais de uma dezena de idiomas.",
      "Pela primeira vez, a favela falava por si mesma na literatura brasileira, sem intermediários. Carolina morreu pobre, mas hoje é estudada em universidades do mundo todo.",
    ],
    marcos: [
      { ano: 1914, texto: "Nasce em Sacramento, Minas Gerais." },
      { ano: 1958, texto: "Seus diários são descobertos por Audálio Dantas." },
      { ano: 1960, texto: "Publica Quarto de Despejo." },
    ],
    legado: "Lembra que o Brasil real precisa ser escutado na voz de quem o vive.",
    verdade: [
      "Depois do sucesso, foi tratada como curiosidade: a \"favelada que escreve\". Seus livros seguintes venderam pouco e ela morreu pobre.",
      "Quarto de Despejo foi editado por Audálio Dantas, que cortou trechos e escolheu o que entraria. Os manuscritos são muito mais longos e bem diferentes do livro publicado.",
    ],
    citacao: { texto: "O Brasil precisa ser dirigido por uma pessoa que já passou fome.", fonte: "Quarto de Despejo, 1960" },
    fontes: [
      { titulo: "Instituto Moreira Salles: Carolina Maria de Jesus", url: "https://carolinamariadejesus.ims.com.br/elzira" },
    ],
  },
  {
    id: "paulo-freire",
    nome: "Paulo Freire",
    nascimento: 1921, morte: 1997,
    local: "Recife, Pernambuco",
    areas: ["educacao"],
    resumo: "Educador que ensinou a ler o mundo, Patrono da Educação Brasileira.",
    historia: [
      "Passou fome na infância durante a crise de 1929 e percebeu cedo como a pobreza atrapalha o aprendizado. Formou-se em Direito, mas escolheu a educação.",
      "Criou um método que alfabetiza adultos a partir das palavras da vida deles, como tijolo, enxada e salário. Em 1963, em Angicos, no Rio Grande do Norte, 380 adultos começaram o curso de cerca de 40 horas, e 300 concluíram, aprendendo a ler e escrever.",
      "Depois do golpe de 1964, foi preso e exilado. No Chile escreveu Pedagogia do Oprimido, traduzida e estudada no mundo inteiro. Voltou ao Brasil em 1980 e foi secretário de Educação de São Paulo.",
    ],
    marcos: [
      { ano: 1921, texto: "Nasce no Recife." },
      { ano: 1963, texto: "Experiência de alfabetização em Angicos." },
      { ano: 1964, texto: "É preso e exilado." },
      { ano: 1968, texto: "Escreve Pedagogia do Oprimido." },
      { ano: 2012, texto: "Declarado Patrono da Educação Brasileira." },
    ],
    legado: "Ler a palavra é ler o mundo e, então, poder mudá-lo.",
    verdade: [
      "É um dos autores mais admirados e também mais criticados do Brasil. Críticos dizem que seu método mistura educação e política.",
      "Há muito escrito sobre as teorias de Freire e pouca pesquisa sobre a prática: um dos coordenadores de Angicos reconheceu que quase não se acompanhou o que aconteceu depois com os alunos, ou seja, se a alfabetização durou.",
    ],
    citacao: { texto: "Educação não transforma o mundo. Educação muda as pessoas. Pessoas transformam o mundo.", fonte: "Frase atribuída a Paulo Freire" },
    fontes: [
      { titulo: "Tribuna do Norte: Angicos virou exemplo mundial", url: "https://tribunadonorte.com.br/?p=432451" },
      { titulo: "Revista Darcy (UnB): as 40 horas de Angicos", url: "https://revistadarcy.unb.br/images/PDF/edicao26/ensaio.pdf" },
    ],
  },
  {
    id: "cesar-lattes",
    nome: "Cesar Lattes",
    nascimento: 1924, morte: 2005,
    local: "Curitiba, Paraná",
    areas: ["ciencia"],
    resumo: "Físico que codescobriu o méson pi e ajudou a criar a ciência brasileira moderna.",
    historia: [
      "Aos 23 anos, trabalhando em Bristol, na Inglaterra, levou placas fotográficas ao Monte Chacaltaya, na Bolívia, para registrar raios cósmicos. Nelas apareceu uma partícula prevista mas nunca vista: o méson pi, ou píon.",
      "Lattes foi o primeiro autor do artigo da descoberta, publicado em 1947 na revista Nature. No ano seguinte, em Berkeley, com Eugene Gardner, foi o primeiro a observar píons produzidos artificialmente num acelerador.",
      "Voltou ao Brasil famoso e usou o prestígio para construir: ajudou a fundar o Centro Brasileiro de Pesquisas Físicas, em 1949, e a criar o CNPq, em 1951. O currículo de todo pesquisador brasileiro hoje fica na Plataforma Lattes.",
    ],
    marcos: [
      { ano: 1924, texto: "Nasce em Curitiba." },
      { ano: 1947, texto: "Codescobre o méson pi." },
      { ano: 1948, texto: "Produz píons artificialmente em Berkeley." },
      { ano: 1949, texto: "Ajuda a fundar o CBPF." },
      { ano: 1951, texto: "Participa da criação do CNPq." },
    ],
    legado: "Trocou a carreira no exterior por construir a ciência no Brasil.",
    verdade: [
      "O Nobel de Física de 1950 foi só para Cecil Powell, chefe do grupo de Bristol, onde Lattes era visitante. Lattes foi indicado sete vezes ao Nobel e nunca ganhou, e ele mesmo reclamou que Powell \"levou o Nobel para si\".",
      "Há relatos de que o comitê chegou a considerar premiar Powell, Lattes e Gardner juntos, mas a morte precoce de Gardner, em 1950, teria mudado isso. É um relato de segunda mão.",
    ],
    fontes: [
      { titulo: "Pesquisa FAPESP: a grande contribuição de Lattes", url: "https://revistapesquisa.fapesp.br/a-grande-contribuicao/" },
      { titulo: "IF-USP: texto de Mauro Cattani sobre Cesar Lattes", url: "https://portal.if.usp.br/memoria/sites/portal.if.usp.br.ifusp/files/Mauro_Cattani_TextoCesarLattes.pdf" },
    ],
  },
  {
    id: "milton-santos",
    nome: "Milton Santos",
    nascimento: 1926, morte: 2001,
    local: "Brotas de Macaúbas, Bahia",
    areas: ["ciencia", "educacao"],
    resumo: "Geógrafo que mudou a forma de pensar a globalização e ganhou o \"Nobel da Geografia\".",
    historia: [
      "Neto de escravizados e filho de professores primários, foi alfabetizado em casa. Formou-se em Direito, mas encontrou na Geografia a forma de entender as desigualdades do mundo.",
      "Perseguido pela ditadura, foi preso em 1964 e passou mais de uma década no exílio, dando aulas na França, nos Estados Unidos, no Canadá, na Venezuela e na Tanzânia.",
      "Em 1994 recebeu o Prêmio Vautrin Lud, o mais importante da Geografia, sendo o único brasileiro a conquistá-lo. Em Por uma outra globalização, defendeu que o mundo pode ser organizado a favor das pessoas, e não só dos mercados.",
    ],
    marcos: [
      { ano: 1926, texto: "Nasce em Brotas de Macaúbas, na Bahia." },
      { ano: 1964, texto: "É preso e parte para o exílio." },
      { ano: 1994, texto: "Recebe o Prêmio Vautrin Lud." },
      { ano: 2000, texto: "Publica Por uma outra globalização." },
    ],
    legado: "Ensinou a enxergar o território como lugar de gente, não só de mercadoria.",
  },
];
