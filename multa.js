const args = process.argv.slice(2);

const boletoIndex = args.indexOf('--boleto') + 1;
const multaIndex = args.indexOf('--multa') + 1;
const jurosDiaIndex = args.indexOf('--juros-dia') + 1;
const jurosMesIndex = args.indexOf('--juros-mes') + 1;
const diasIndex = args.indexOf('--dias') + 1;

const boleto = boletoIndex > 0 ? parseFloat(args[boletoIndex]) : 0;
const multa = multaIndex > 0 ? parseFloat(args[multaIndex]) : 0;
const jurosDia = jurosDiaIndex > 0 ? parseFloat(args[jurosDiaIndex]) : 0;
const jurosMes = jurosMesIndex > 0 ? parseFloat(args[jurosMesIndex]) : 0;
const dias = diasIndex > 0 ? parseFloat(args[diasIndex]) : 0;

function showDados() {
  console.log(`Boleto: $${boleto}`);
  console.log(`Multa: ${multa}%`);
  console.log(`Juros por Dia: ${jurosDia}%`);
  console.log(`Juros por Mês: ${jurosMes}%`);
  console.log(`Dias: ${dias}`);
}

function calcularMulta() {
  const valorMultaTotal =
    (multa / 100) * boleto + (jurosDia / 100) * boleto * dias;
  const valorFinal = boleto + valorMultaTotal;
  console.log(`O valor total da multa é: $${valorFinal.toFixed(2)}`);
}

showDados();
calcularMulta();
