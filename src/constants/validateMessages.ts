const typeTemplate = "Não é um(a) ${type} válido(a)."

export const validateMessages = {
  default: "Erro de validação no campo.",
  required: "Esse campo é obrigatório.",
  enum: "O campo deve ser um [${enum}].",
  whitespace: "O campo não pode estar vazio.",
  date: {
    format: "Não é um formato de data correto.",
    parse: "Não pode ser convertido para data.",
    invalid: "Não é uma data válida."
  },
  types: {
    string: typeTemplate,
    method: typeTemplate,
    array: typeTemplate,
    object: typeTemplate,
    number: typeTemplate,
    date: typeTemplate,
    boolean: typeTemplate,
    integer: typeTemplate,
    float: typeTemplate,
    regexp: typeTemplate,
    email: typeTemplate,
    url: typeTemplate,
    hex: typeTemplate
  },
  string: {
    len: "O campo deve ter exatamente ${len} caracteres.",
    min: "O campo deve ter pelo menos ${min} caracteres.",
    max: "O campo não pode ser maior que ${max} caracteres.",
    range: "O campo deve ter de ${min} à ${max} caracteres."
  },
  number: {
    len: "O campo deve ser igual a ${len}.",
    min: "O campo não pode ser menor que ${min}.",
    max: "O campo não pode ser maior que ${max}.",
    range: "O campo deve ser entre ${min} à ${max}."
  },
  array: {
    len: "O campo deve ter {len} itens.",
    min: "O campo deve ter no mínimo ${min} itens.",
    max: "O campo deve ter no máximo ${max} itens.",
    range: "O campo deve ter entre ${min} à ${max} itens."
  },
  pattern: {
    mismatch: "O campo não combina com o padrão ${pattern}."
  }
}
