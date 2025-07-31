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

export const buscarManobra = async (idManobra) => {
  try {
    const response = await fetch(`${apiUrl}/manobras/manobra/${idManobra}`);

    if (!response) {
      throw new Error("Erro na resposta da API: buscarManobra");
    }

    const data = await response.json();

    return data;
  } catch (err) {
    if (err) {
      console.error("erro ao buscar manobra: ", err);
      return "erro ao buscar manobra";
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

export const filtrarManobrasStatus = async (novoStatus, manobraId) => {
  try {
    const response = await fetch(`/manobras/status/${manobraId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ novoStatus }),
    });

    return response.json();
  } catch (err) {
    console.error("erro ao buscar manobras: ", err);
    return "erro ao buscar manobras";
  }
};

export const atualizarObservacoes = async (idManobra, observacoes) => {
  try {
    const response = await fetch(
      `${apiUrl}/manobras/${idManobra}/observacoes`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ observacoes }),
      }
    );

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

export const adicionarAnexo = async (obstaculoId, manobraId, anexo) => {
  const response = await fetch(
    `${apiUrl}/anexos/obstaculo/${obstaculoId}/manobra/${manobraId}/anexo`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ anexo }),
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao criar obstáculo");
  }

  return await response.json();
};

export const atualizarStatusManobra = async (novoStatus, manobraId) => {
  const response = await fetch(`${apiUrl}/manobras/status/${manobraId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ novoStatus }),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar obstáculo");
  }

  return await response.json();
};

export const adicionarManobra= async (nova, idObstaculo) => {
  const response = await fetch(
    `${apiUrl}/manobras/${idObstaculo}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nova),
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao adicionar manobra");
  }

  return await response.json();
};
