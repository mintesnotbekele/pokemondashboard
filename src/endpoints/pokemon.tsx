
import { pokemonEndPoint } from "./pokemon.endpoints";
import { httpService } from "../helpers/api-helper";

export const getPokemonData = () => {
  return httpService
    .get(`${pokemonEndPoint.getPokemons}`)
    .then((response:any) => {
      return response;
    })
};

export const getPokemonImage = (data: any): any => {
  return httpService
    .get(`${data}`)
    .then((response: any) => {
      return response;
    })
};
