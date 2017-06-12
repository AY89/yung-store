// TODO TBD: update prod environment once up and running
var awsServiceConfig = {
    prod: {
        region: 'us-west-2',
        userPoolId: 'us-west-2_7gyN7a8TG',
        clientId: '5q9f1rqbn76m3l1j6p6miv3t16',
        identityPoolId: 'us-west-2:75d660d8-939b-45e9-ac7f-58d1a2d90599',
        invokeUrl:'https://rz4lx15ma7.execute-api.us-west-2.amazonaws.com/staging'
    },
    staging: {
        region: 'us-west-2',
        userPoolId: 'us-west-2_p6j8fSh6S',
        clientId: '3b3d6rkdaln5hpc98rcd56ph',
        identityPoolId: 'us-west-2:7ea0e29d-fda2-4670-9544-329cb26fa770',
        invokeUrl:'https://g3unlxxkqe.execute-api.us-west-2.amazonaws.com/staging'
    },
    dev: {
        region: 'us-west-2',
        userPoolId: 'us-west-2_7gyN7a8TG',
        clientId: '5q9f1rqbn76m3l1j6p6miv3t16',
        identityPoolId: 'us-west-2:75d660d8-939b-45e9-ac7f-58d1a2d90599',
        invokeUrl:'https://rz4lx15ma7.execute-api.us-west-2.amazonaws.com/staging'
    }
};

export default awsServiceConfig[process.env.REACT_APP_ENVIRONMENT];