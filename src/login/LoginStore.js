import { observable } from 'mobx';
import authStore from '../common/stores/AuthStore';

class LoginStore {
    @observable email = "";
    @observable password = "";
    @observable inProgress = false;
    @observable error = false;
    @observable errorText = "";

    login(router) {
        this.inProgress = true;
        authStore.login(this.email, this.password).then((result) => {
            this.inProgress = false;
            this.clear();
            router.replace('/dashboard');
        }).catch((error) => {
            this.inProgress = false;
            this.error = true;
            this.errorText = "Sorry, username or password is invalid"
            router.replace('/login');
        });
    }

    clear() {
        this.email = "";
        this.password = "";
        this.inProgress = false;
        this.error = false;
        this.errorText = "";
    }
}

let singleton = new LoginStore();
export default singleton