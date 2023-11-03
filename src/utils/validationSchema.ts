import * as Yup from 'yup';

export const PokemonSchema = Yup.object().shape({
  pokemon: Yup.string().required('Required'),
});
