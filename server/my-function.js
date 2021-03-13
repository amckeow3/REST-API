const { default: axios } = require("axios");

exports.handler = async (event) => {
        let keyword = hi;
        axios.get(`/${say}?${'keyword'}=${keyword}`)
        .then(function(response) {
            console.log(response)
        })
        .catch(function(err) {
            console.log(err)
        })
       
};

