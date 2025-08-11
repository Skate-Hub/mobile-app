import Obstaculo from "@/interfaces/skatenotes/Obstaculo";

export const buscarObstaculos = async (): promisse<Obstaculo[]> => {
  try {
    const response = await fetch(
      "https://skatenotes-production.up.railway.app/obstaculos", {
        method: "GET",
        headers:{
            "Content-Type": "application/json",
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OTRmZjM3NDNjNzE4OTgxMjk3ZWJiZiIsIm5vbWUiOiJUZXN0ZSIsImVtYWlsIjoidGVzdGVAZ21haWwuY29tIiwiaWF0IjoxNzU0ODc5MzA5LCJleHAiOjE3NTc0NzEzMDl9.X61n59iGrUoG-14kChxcBL59K-1l84EjgIz6IOmo5Gc'
        }
      });

     if (!response.ok) {
      console.error("Erro ao buscar obstáculos:", response.statusText);
      return [];
    }

    const data: Obstaculo[] = await response.json();
    console.log(data)
    return data;
  } catch (err) {
    console.error("erro ao buscar obstaculos: ", err);
    console.log("erro ao buscar obstaculos: ", err);
    return []
  }
};
