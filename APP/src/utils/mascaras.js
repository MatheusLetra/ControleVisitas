const formatCpfCnpj = (value) => {
  // Formatando CPF ou CNPJ
  const cleanedValue = value.replace(/\D/g, ''); // Remover caracteres não numéricos
  if (cleanedValue.length <= 11) {
    // CPF
    return cleanedValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  } else {
    // CNPJ
    return cleanedValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }
};

const formatCep = (value) => {
  // Formatando CEP
  return value.replace(/(\d{5})(\d{3})/, '$1-$2');
};

const formatTelefone = (value) => {
  // Formatando Telefone
  return value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
};


export { formatCpfCnpj, formatCep, formatTelefone }