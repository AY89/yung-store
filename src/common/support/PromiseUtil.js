let PromiseUtil = {
    wrapCallback(execution) {
        var promise = new Promise(function(resolve, reject) {
            function callback(error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }     
            }
            execution(callback);
        });
        return promise;
    }
}

export default PromiseUtil;