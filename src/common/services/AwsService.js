import AWS from 'aws-sdk';
import 'amazon-cognito-identity-js';
import awsServiceConfig from './awsServiceConfig';
import PromiseUtil from '../support/PromiseUtil';
import apigClientFactory from 'aws-api-gateway-client';
import util from 'util';

class AwsService {

    constructor() {
        this.config = awsServiceConfig;
        this.user = this.currentCognitoUser;
        this.apigClient = null;
    }

    setup() {
        let promise = this.getSession().then((userSession) => {
            return this.getIdentityCredentials(userSession);
        }).then((credentials) => {
            this.apigClient = this.createClient(credentials);
            return true;
        });

        return promise;
    }

    authenticate(email, password) {
        let authenticationData = {
            Username: email,
            Password: password,
        };
        let authenticationDetails = new AWS.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
        
        let userPool = this.userPool;
        
        let userData = {
            Username: email,
            Pool: userPool
        };
        
        let cognitoUser = new AWS.CognitoIdentityServiceProvider.CognitoUser(userData);
        let promise = new Promise((resolve, reject) => {
            let callback = {
                onSuccess: (() => {
                    return this.getSession().then(resolve, reject);
                }),
                onFailure: function(err) {
                    reject({"Error": err.message});
                },
                newPasswordRequired: function(userAttributes, requiredAttributes) {
                    // keep temporary password
                    cognitoUser.completeNewPasswordChallenge(password, null, callback);
                }
            };
            cognitoUser.authenticateUser(authenticationDetails, callback);
        });

        return promise;
    }

    logout() {
        let cognitoUser = this.currentCognitoUser;
        if (cognitoUser != null) {
            return this.getSession().then((success) => {
                let promise = new Promise((resolve, reject) => {
                    let callback = {
                        onSuccess: resolve,
                        onFailure: reject
                    };
                    this.user.globalSignOut(callback);
                }).then((success) =>{
                    this.user = null;
                });
                return promise;
            }, (error) => {
                cognitoUser.signOut();
                return Promise.resolve();
            });
        }
    }

    getCommentsForVideo(videoId, commentsPerPage, pageToken) {
        let apigClient = this.apigClient;
        let method = 'GET';
        let pathTemplate = '/video/{videoId}/comments';
        let params = {
            videoId: videoId
        };
        
        let additionalParams = {
            queryParams: {
                perPage: commentsPerPage
            }
        };

        if (pageToken) {
            additionalParams.queryParams.nextPage = pageToken;
        }

        let body = {};
        
        return apigClient.invokeApi(
            params, pathTemplate, method, additionalParams, body);
    }

    getCommentsForUser(userId, commentsPerPage, pageToken) {
        let apigClient = this.apigClient;
        let method = 'GET';
        let pathTemplate = '/user/{userId}/comments';
        let params = {
            userId: userId
        };
        
        let additionalParams = {
            queryParams: {
                perPage: commentsPerPage
            }
        };

        if (pageToken) {
            additionalParams.queryParams.nextPage = pageToken;
        }

        let body = {};
        
        return apigClient.invokeApi(
            params, pathTemplate, method, additionalParams, body);
    }

    getUserById(userId) {
        let apigClient = this.apigClient;
        let method = 'GET';
        let pathTemplate = '/user/{userId}';
        let params = {
            userId: userId
        };
        
        let additionalParams = {
        };

        let body = {};
        
        return apigClient.invokeApi(
            params, pathTemplate, method, additionalParams, body);
    }

    getUsersReportedComment(videoId, position, commentSortId) {
        let apigClient = this.apigClient;
        let method = 'GET';
        let pathTemplate = '/video/{videoId}/position/{position}/comment/{id}/reports';
        let params = {
            videoId: videoId,
            position: position,
            id: commentSortId
        };
        
        let additionalParams = {
        };

        let body = {};
        
        return apigClient.invokeApi(
            params, pathTemplate, method, additionalParams, body);
    }

    updateCommentStatus(comment, state) {
        var path;
        switch(state) {
            case "approved":
                path = "/video/{videoId}/position/{position}/comment/{id}/approve";
                break; 
            case "hidden":
                path = "/video/{videoId}/position/{position}/comment/{id}/hide";
                break;
            default:
                return Promise.reject({"Error": "Unknown status " + state});
        }
        let apigClient = this.apigClient;
        let method = 'POST';
        let pathTemplate = path;
        let params = {
            videoId: comment.videoId,
            id: comment.id,
            position: comment.position
        };
        let additionalParams = {
        };

        let body = {};
        
        return apigClient.invokeApi(
            params, pathTemplate, method, additionalParams, body);
    }

    updateUserCommentingStatus(userId, status) {
        let apigClient = this.apigClient;
        let method = 'POST';
        let pathTemplate = '/user/{userId}/status/comment/{status}';
        let params = {
            userId: userId,
            status: status
        };
        
        let additionalParams = {
        };

        let body = {};
        
        return apigClient.invokeApi(
            params, pathTemplate, method, additionalParams, body);
    }

    getSession() {
        let cognitoUser = this.currentCognitoUser;
        if (cognitoUser != null) {
            let promise = new Promise((resolve, reject) => {
                let callback = ((error, success) => {
                    if (error) {
                        reject({"Error": error});
                    } else {
                        this.user = cognitoUser;
                        resolve(success);
                    }
                });
                cognitoUser.getSession(callback);
            });
            return promise;
        }
        return Promise.resolve();
    }

    get userPool() {
        let data = {
            UserPoolId : this.config.userPoolId,
            ClientId : this.config.clientId
        };
        let userPool = new AWS.CognitoIdentityServiceProvider.CognitoUserPool(data);
        return userPool;
    }

    get currentCognitoUser() {
        let userPool = this.userPool;
        let cognitoUser = userPool.getCurrentUser();
        return cognitoUser;
    }

    createIdentityParameters(userSession) {
        let params = {
            IdentityPoolId : this.config.identityPoolId
        };
        if (userSession) {
            let cognitoLoginsKey = util.format(
            'cognito-idp.%s.amazonaws.com/%s',
            this.config.region, this.config.userPoolId);
            params.Logins = {[cognitoLoginsKey]: userSession.getIdToken().getJwtToken()};
        }
        return params;
    }

    getIdentityCredentials(userSession) {
        let params = this.createIdentityParameters(userSession);
        let credentials = new AWS.CognitoIdentityCredentials(
            params, {
                region: this.config.region
        });  
        return PromiseUtil.wrapCallback(function(callback) {
            credentials.get(callback);
        }).then(function() {
            return credentials;
        });
    }

    createClient(credentials) {
        let config = {
            invokeUrl: this.config.invokeUrl,
            accessKey: credentials.accessKeyId,
            secretKey: credentials.secretAccessKey,
            sessionToken: credentials.sessionToken,
            region: this.config.region
        };
        let apigClient = apigClientFactory.newClient(config);
        return apigClient;
    }
    
}

let singleton = new AwsService();
export default singleton