const axios = require('axios');
const xml2js = require('xml2js');
const stationIds = require('./station-ids');
const parser = new xml2js.Parser();

module.exports.loadData = async function(){
    var url = 'https://bus.go.kr/sbus/bus/selectLcByRoute.do?_dc=1690280516841&subwayId=1063';
    var response = await axios.get(url, {
        headers: {
            'referer': 'https://bus.go.kr/app/',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
        }
    });

    var data = response.data.ResponseVO.data.resultList;
    // return data;

    var result = [];
    stationIds.forEach((e, i) => {
        result[i] = {
            station: e.name,
            id: e.id,
            up: [],
            down: []
        };
        data.forEach((e)=> {
            if(result[i].id != e.statnId) return;
            var updown = e.updnLineSe; //0 문산방면, 1 지평방면
            var status = ['접근', '도착'][e.trainAt]; //0 접근, 1 도착
            var directAt = parseInt(e.directAt); //0 완행, 1 급행
            if (updown == 0) {
                result[i].up.push({
                    trainNo: e.trainNo,
                    isExpress: directAt == 1,
                    status: status,
                    terminal: e.trainLineNm
                });
            } else {
                result[i].down.push({
                    trainNo: e.trainNo,
                    isExpress: directAt == 1,
                    status: status,
                    terminal: e.trainLineNm
                });
            }
        });
    });
    result.forEach((e) => delete e.id);

    return result;
}
