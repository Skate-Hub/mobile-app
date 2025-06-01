const apiUrl = "https://skatenotes-production.up.railway.app";

export const buscarManobras = async () => {
  try {
    const response = await fetch(`${apiUrl}/manobras`);

    if (!response) {
      throw new Error("Erro na resposta da API: buscarObstaculos");
    }

    const data = await response.json();

    return data;
  } catch (err) {
    if (err) {
      console.error("erro ao buscar manobras: ", err);
      return "erro ao buscar manobras";
    }
  }
};

export const buscarManobrasObstaculo = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/manobras/manobrasObstaculo/${id}`);

    if (!response) {
      throw new Error("Erro na resposta da API: buscarObstaculos");
    }

    const data = await response.json();

    return data;
  } catch (err) {
    if (err) {
      console.error("erro ao buscar manobras: ", err);
      return "erro ao buscar manobras";
    }
  }
};

export const buscarObservacoes = async () => {
  try {
    const response = await fetch(`${apiUrl}/manobras/obs`);

    if (!response) {
      throw new Error("Erro na resposta da API: buscarObservacoes");
    }

    const data = await response.json();

    return data;
  } catch (err) {
    if (err) {
      console.error("erro ao buscar observacoes: ", err);
      return "erro ao buscar observacoes";
    }
  }
};
