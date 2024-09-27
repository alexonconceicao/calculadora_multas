const args = process.argv.slice(2);

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

function showDados() {
  const valorFinal = calcularMulta();
  console.log('\n======================================');
  console.log(
    `
Dados:

Boleto: $${boleto}
Multa: ${multa}%${jurosDia !== 0 ? `\nJuros por Dia: ${jurosDia}%` : ''}${
      jurosMes !== 0 ? `\nJuros por Dia: ${jurosMes}%` : ''
    }
Dias em atraso: ${dias}
O valor total a pagar é: $${valorFinal.toFixed(2)}`
  );
  console.log('\n======================================');
}

function calcularMulta() {
  const valorMultaTotal =
    (multa / 100) * boleto + (jurosDia / 100) * boleto * dias;
  return boleto + valorMultaTotal;
}

showDados();
