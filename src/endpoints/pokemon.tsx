import axios from "axios";
import { pokemonEndPoint } from "./pokemon.endpoints";
import { httpService } from "../helpers/api-helper";

export const getPokemonData = (data: any): any => {
  return httpService
    .get(`${pokemonEndPoint.getPokemons}`, { params: data })
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
