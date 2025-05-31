const apiUrl = "https://skatenotes-production.up.railway.app";

export const buscarObstaculos = async () => {
  try {
    const response = await fetch(`${apiUrl}/obstaculos`);
    
    if (!response.ok) {
      throw new Error("Erro na resposta da API: buscarObstaculos");
    }

    const data = await response.json();
    return data;    

  } catch (err) {
    console.error("Erro ao buscar obstáculos:", err);
    return "erro ao buscar obstaculos"; 
  }
};

