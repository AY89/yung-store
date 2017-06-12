import awsService from  '../services/AwsService';

class AuthStore {

    get isLoggedIn() {
        return awsService.currentCognitoUser != null;
    }

    login(username, password) {
        return awsService.authenticate(username, password);
    }

    logout() {
        return awsService.logout();
    }
}

let singleton = new AuthStore();
export default singleton