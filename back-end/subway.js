const axios = require('axios');

(async function(){
    var url = 'https://bus.go.kr/getXml2.jsp?subwayId=1063';
    var data = await axios.get(url, {
        headers: {
            'referer': 'https://bus.go.kr/subwayMap/subwayMap.jsp',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
        }
    });
    console.log(data);

})();