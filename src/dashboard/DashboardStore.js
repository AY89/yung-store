import ContentStore from '../common/stores/ContentStore';
import awsService from '../common/services/AwsService';
import pokemonCardService from '../common/services/PokemonCardService';
import { observable } from 'mobx';

class DashboardStore extends ContentStore {
    @observable cards = [];

    doLoad() {
          //  get inventory
        return pokemonCardService.getPokemonCard('base1_4').then(result => {
            this.cards.push(result);
        });
    }
}
export default DashboardStore;