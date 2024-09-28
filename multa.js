const readline = require('readline');
const args = process.argv.slice(2);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(query) {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function askQuestions() {
  const boleto = parseFloat(await askQuestion('Digite o valor do boleto: '));
  const multa = parseFloat(await askQuestion('Digite o percentual da multa: '));
  const jurosDia = parseFloat(
    (await askQuestion('Digite o percentual de juros por dia (opcional): ')) ||
      0
  );
  const jurosMes = parseFloat(
    (await askQuestion('Digite o percentual de juros por mês (opcional): ')) ||
      0
  );
  const dias = parseFloat(
    (await askQuestion('Digite o número de dias para cálculo (opcional): ')) ||
      0
  );

  if (isNaN(boleto) || isNaN(multa)) {
    console.error('Erro: Boleto e multa são obrigatórios e devem ser números.');
    process.exit(1);
  }

  showDados(boleto, multa, jurosDia, jurosMes, dias);
  rl.question('Pressione qualquer tecla para encerrar...\n', () => {
    rl.close();
    process.exit(0);
  });
}

const boletoIndex = args.indexOf('--boleto') + 1;
const multaIndex = args.indexOf('--multa') + 1;
const jurosDiaIndex = args.indexOf('--juros-dia') + 1;
const jurosMesIndex = args.indexOf('--juros-mes') + 1;
const diasIndex = args.indexOf('--dias') + 1;
const helpIndex = args.indexOf('--help');

if (helpIndex !== -1) {
  console.log(`Uso: node multa.js [opções]

Opções:
  --boleto <valor>       Valor do boleto (obrigatório)
  --multa <percentual>   Percentual da multa (obrigatório)
  --juros-dia <percentual> Juros por dia (opcional)
  --juros-mes <percentual> Juros por mês (opcional)
  --dias <número>        Número de dias para cálculo (opcional)
  --help                 Exibe esta mensagem de ajuda`);
  process.exit();
}

const boleto = boletoIndex > 0 ? parseFloat(args[boletoIndex]) : null;
const multa = multaIndex > 0 ? parseFloat(args[multaIndex]) : null;
const jurosDia = jurosDiaIndex > 0 ? parseFloat(args[jurosDiaIndex]) : 0;
const jurosMes = jurosMesIndex > 0 ? parseFloat(args[jurosMesIndex]) : 0;
const dias = diasIndex > 0 ? parseFloat(args[diasIndex]) : 0;

if (args.length === 0) {
  askQuestions();
} else {
  if (boleto === null || isNaN(boleto)) {
    console.error(
      'Erro: O valor do boleto é obrigatório e deve ser um número válido.'
    );
    process.exit(1);
  }

  if (multa === null || isNaN(multa)) {
    console.error(
      'Erro: O percentual da multa é obrigatório e deve ser um número válido.'
    );
    process.exit(1);
  }

  showDados(boleto, multa, jurosDia, jurosMes, dias);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Pressione qualquer tecla para encerrar...\n', () => {
    rl.close();
    process.exit(0);
  });
}

function showDados(boleto, multa, jurosDia, jurosMes, dias) {
  const valorFinal = calcularMulta(boleto, multa, jurosDia, jurosMes, dias);
  console.log('\n======================================');
  console.log(`
Dados:

Boleto: $${boleto}
Multa: ${multa}%${jurosDia !== 0 ? `\nJuros por Dia: ${jurosDia}%` : ''}${
    jurosMes !== 0 ? `\nJuros por Mês: ${jurosMes}%` : ''
  }
Dias em atraso: ${dias}
O valor total a pagar é: $${valorFinal.toFixed(2)}
`);
  console.log('\n======================================');
}

function calcularMulta(boleto, multa, jurosDia, jurosMes, dias) {
  const valorMultaTotal =
    (multa / 100) * boleto + (jurosDia / 100) * boleto * dias;
  return boleto + valorMultaTotal;
}
