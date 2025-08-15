export const logErro = (func: string, mensagem: string | unknown, err?: unknown) => {
  console.error(`[${func}] ${mensagem}`, err ?? "");
};
