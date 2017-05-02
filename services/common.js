const common = {
    parseJSON: function(jsonString) {
        let result = {};
        try {
            result = JSON.parse(jsonString);
        }
        catch (ex) {
            console.log(ex);
        }
        return result;
    }
};

module.exports = common;