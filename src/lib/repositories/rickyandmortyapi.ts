import axiosClient from '@/lib/axios';
import {
  ApiResponseCharacterById,
  Character,
  Location,
} from '@/lib/types/rickyandmortyapi';

export async function getCharacters() {
  return await axiosClient.get('/character/');
}
// TODO: check the graphql for a query including character and same planet characters
export async function getCharacterById(
  id: number
): Promise<ApiResponseCharacterById> {
  return await axiosClient.get(`/character/${id}`);
}
export async function getLocationByCharacter(
  character: Character
): Promise<Location> {
  return await axiosClient.get(character.location.url, {
    baseURL: '',
  });
}
