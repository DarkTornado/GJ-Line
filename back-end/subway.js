const axios = require('axios');
const xml2js = require('xml2js');
const stationIds = require('./station-ids');
const parser = new xml2js.Parser();

module.exports.loadData = async function(){
    var url = 'https://bus.go.kr/getXml2.jsp?subwayId=1063';
    var response = await axios.get(url, {
        headers: {
            'referer': 'https://bus.go.kr/subwayMap/subwayMap.jsp',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
        }
    });
    var data = await parser.parseStringPromise(response.data);
    data = data.msgBody.itemList;
    var result = [];
    stationIds.forEach((e, i) => {
        result[i] = {
            station: e.name,
            id: e.id,
            up: 0, //0 열차없음, 1 완행, 2 급행
            down: 0
        };
        data.forEach((e)=> {
            if(result[i].id != e.statnId[0]) return;
            var updown = e.updnLineSe[0]; //0 문산방면, 1 지평방면
            var status = ['접근', '도착'][e.trainAt[0]]; //0 접근, 1 도착
            var directAt = parseInt(e.directAt[0]); //0 완행, 1 급행
            if (updown == 0) {
                result[i].up = directAt + 1;
                result[i].up_status = status;
            } else {
                result[i].down = directAt + 1;
                result[i].down_status = status;
            }
        });
    });
    return result;
}
