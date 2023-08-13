export const cpfCnpjAddMask = (cpfCNPJ: string) => {
  //Return CPF or CNPJ with Mask
  if (!cpfCNPJ) {
    return cpfCNPJ;
  }

  cpfCNPJ = cpfCNPJ.replace(/\D/g, ""); //Remove all characters

  if (cpfCNPJ.length === 13) {
    cpfCNPJ = "0" + cpfCNPJ;
  }

  if (cpfCNPJ.length === 14) {
    cpfCNPJ = cpfCNPJ.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
      "$1.$2.$3/$4-$5"
    );
  }

  if (cpfCNPJ.length <= 11) {
    //CPF
    cpfCNPJ = cpfCNPJ.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }
  return cpfCNPJ;
};

export const cepAddMask = (cep: string) => {
  if (!cep) {
    return cep;
  }
  cep = cep.replace(/\D/g, ""); //Remove all characters
  if (cep.length > 8) {
    return cep;
  }
  cep = zeroPad(cep, 8);
  return cep.replace(/(\d{5})(\d{3})/, "$1-$2");
};

export const phoneNumberAddMask = (phoneNumberString: string) => {
  if (!phoneNumberString) {
    return phoneNumberString;
  }
  phoneNumberString = phoneNumberString.replace(/\D/g, ""); //Remove all characters
  if (phoneNumberString.length === 8) {
    //return phoneNumberString;
    return phoneNumberString.replace(/(\d{4})(\d{4})/g, "$1-$2");
  }
  if (phoneNumberString.length === 10) {
    //return phoneNumberString;
    return phoneNumberString.replace(/(\d{2})(\d{4})(\d{4})/g, "($1)$2-$3");
  }
  if (phoneNumberString.length === 11) {
    //return phoneNumberString;
    return phoneNumberString.replace(/(\d{2})(\d{5})(\d{4})/g, "($1)$2-$3");
  }

  return phoneNumberString;
};

export const zeroPad = (num: string, places: number) => {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
};

export const toNumber = (str: string = "0") => {
  if (str !== null) {
    return Number(str.toString().replace(/\./g, "").replace(",", "."))
  } else {
    return 0
  }
}
