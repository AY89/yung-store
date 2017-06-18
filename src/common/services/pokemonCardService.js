import pokemon from 'pokemontcgsdk';

class PokemonCardService {

    getPokemonCard(id) {
        let promise = pokemon.card.find(id)
            .then(result => {
                return result.card;
            });
        return promise;
    }


}

let singleton = new PokemonCardService();
export default singleton


