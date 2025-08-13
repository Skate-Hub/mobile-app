import Obstaculo from "@/interfaces/skatenotes/Obstaculo";
import { getToken } from "../asyncStorage";

export const buscarObstaculos = async (): Promisse<Obstaculo[]> => {
  try {
    const token = await getToken();

    const response = await fetch(
      "https://skatenotes-production.up.railway.app/obstaculos",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Erro ao buscar obstáculos:", response.status);
      return [];
    }

    const data: Obstaculo[] = await response.json();
    return data;
  } catch (err) {
    console.error("erro ao buscar obstaculos: ", err);
    console.log("erro ao buscar obstaculos: ", err);
    return [];
  }
};
