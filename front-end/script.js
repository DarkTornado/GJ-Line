var pos = [
    {x: 200, y: 200, dir: 3, sta: '문산'},
    {x: 400, y: 200, dir: 3, sta: '파주'},
    {x: 600, y: 200, dir: 3, sta: '월롱'},
    {x: 800, y: 200, dir: 3, sta: '금촌'},
    {x: 1000, y: 200, dir: 3, sta: '금릉'},
    {x: 1200, y: 200, dir: 3, sta: '운정'},
    {x: 1400, y: 200, dir: 3, sta: '야당'},
    {x: 1600, y: 200, dir: 3, sta: '탄현'},
    {x: 1800, y: 200, dir: 3, sta: '일산'},
    {x: 2000, y: 200, dir: 3, sta: '풍산'},
    {x: 2200, y: 200, dir: 3, sta: '백마'},
    {x: 2400, y: 200, dir: 3, sta: '곡산'},
    {x: 2600, y: 200, dir: 3, sta: '대곡'},
    {x: 2800, y: 400, dir: 0, sta: '능곡'},
    {x: 2600, y: 600, dir: 1, sta: '행신'},
    {x: 2400, y: 600, dir: 1, sta: '강매'},
    {x: 2200, y: 600, dir: 1, sta: '화전'},
    {x: 2000, y: 600, dir: 1, sta: '수색'},
    {x: 1800, y: 600, dir: 1, sta: '디지털미디어시티'},
    {x: 1600, y: 600, dir: 1, sta: '가좌'},
    {x: 1400, y: 600, dir: 1, sta: '홍대입구'},
    {x: 1200, y: 600, dir: 1, sta: '서강대'},
    {x: 1000, y: 600, dir: 1, sta: '공덕'},
    {x: 800, y: 600, dir: 1, sta: '효창공원앞'},
    {x: 600, y: 600, dir: 1, sta: '용산'},
    {x: 400, y: 600, dir: 1, sta: '이촌'},
    {x: 200, y: 800, dir: 0, sta: '서빙고'},
    {x: 400, y: 1000, dir: 3, sta: '한남'},
    {x: 600, y: 1000, dir: 3, sta: '옥수'},
    {x: 800, y: 1000, dir: 3, sta: '응봉'},
    {x: 1000, y: 1000, dir: 3, sta: '왕십리'},
    {x: 1200, y: 1000, dir: 3, sta: '청량리'},
    {x: 1400, y: 1000, dir: 3, sta: '회기'},
    {x: 1600, y: 1000, dir: 3, sta: '중랑'},
    {x: 1800, y: 1000, dir: 3, sta: '상봉'},
    {x: 2000, y: 1000, dir: 3, sta: '망우'},
    {x: 2200, y: 1000, dir: 3, sta: '양원'},
    {x: 2400, y: 1000, dir: 3, sta: '구리'},
    {x: 2600, y: 1000, dir: 3, sta: '도농'},
    {x: 2800, y: 1200, dir: 0, sta: '양정'},
    {x: 2600, y: 1400, dir: 1, sta: '덕소'},
    {x: 2400, y: 1400, dir: 1, sta: '도심'},
    {x: 2200, y: 1400, dir: 1, sta: '팔당'},
    {x: 2000, y: 1400, dir: 1, sta: '운길산'},
    {x: 1800, y: 1400, dir: 1, sta: '양수'},
    {x: 1600, y: 1400, dir: 1, sta: '신원'},
    {x: 1400, y: 1400, dir: 1, sta: '국수'},
    {x: 1200, y: 1400, dir: 1, sta: '아신'},
    {x: 1000, y: 1400, dir: 1, sta: '오빈'},
    {x: 800, y: 1400, dir: 1, sta: '양평'},
    {x: 600, y: 1400, dir: 1, sta: '원덕'},
    {x: 400, y: 1400, dir: 1, sta: '용문'},
    {x: 200, y: 1400, dir: 1, sta: '지평'},
    {x: 1400, y: 800, dir: 1, sta: '신촌'},
    {x: 1200, y: 800, dir: 1, sta: '서울'}
];


var tick = 0, touch = 120;
function secondTick() {
    if (tick > 0) {
        tick--;
    }
    if (tick == 0) {
        if (touch > 0) update();
        else changeUI('none', 'inline-block');
    }
    if (touch > 0) {
        touch--;
    }
}
var currentData = null;
function update() {
    tick = 20;
    fetch('back-end url')
        .then((response) => response.text())
        .then((data) => {
            applyData(data);
        });
}
update();
setInterval(secondTick, 1000);
document.body.addEventListener('click', (e) => {
    if (touch == 0) changeUI('block', 'none');
    touch = 120;
});
document.body.addEventListener('touchstart', (e) => {
    if (touch == 0) changeUI('block', 'none');
    touch = 120;
});

function changeUI(map, alert) {
    document.querySelector('div#map_area').style['display'] = map;
    document.querySelector('div#alert_area').style['display'] = alert;
}
function applyData(data) {
    currentData = JSON.parse(data);
    data = JSON.parse(data);
    updatePC(data);
    updateMobile(data);
    console.log('updated');
}

var map = null;

function updatePC(data) {
    var src = '';
    if (map == null) map = document.getElementById("map").innerHTML;
    data.forEach((e, i) => {
        src += train(pos[i].x, pos[i].y, pos[i].dir, e.up, true);
        src += train(pos[i].x, pos[i].y, pos[i].dir, e.down, false);
    });
    document.getElementById("map").innerHTML = map + src;
}

function updateMobile(data) {
    var src = '<svg width=100% viewBox="0 0 600 5350">';
    src += '<polyline points="100,100 100,5300" fill="none" stroke="#77C4A3" />';
    src += '<polyline points="100,2000 150,2050 350,2050 400,2100 400,2200" fill="none" stroke="#77C4A3" />';
    var seoul = [data.pop()];
    seoul.unshift(data.pop());
    data.forEach((e, i) => {
        var y = (i + 1) * 100;
        src += station(100, y, e.station);
        src += train_up(35, y, e.up);
        src += train_down(65, y, e.down);
    });
    src += station(400, 2100, seoul[0].station) + train_up(335, 2100, seoul[0].up) + train_down(365, 2100, seoul[0].down);
    src += station(400, 2200, seoul[1].station) + train_up(335, 2200, seoul[1].up) + train_down(365, 2200, seoul[1].down);
    src += '</svg>';
    document.getElementById("map_mobile").innerHTML = src;
}

function train(x, y, dir, train, isUp) {
    if (!isUp) dir += 2;
    if (dir > 4) dir -= 4;
    var dirs = [0, 90, 180, 270];
    var xx = [-35, 10, 35, -10];
    var yy = [-10, -35, 10, 35];
    x = x - 20 + xx[dir];
    y = y - 20 + yy[dir];
    xx = [10, -10, -10, 10];
    yy = [10, 10, -10, -10];
    var tx = x + xx[dir] + 20;
    var ty = y + yy[dir] + 20;
    var result = "<image xlink:href='images/" + getIcon(train) + ".svg' x='" + x + "' y='" + y + "' width='60px' transform='rotate(" + dirs[dir] + "," + (x + 20) + "," + (y + 20) + ")'/>"
    if (train.length > 0) result += '<text style="text-anchor: middle; font-size: 16px;" x='+tx+' y='+ty+' fill=#888888>'+terminal(train[0].terminal)+'</text>';
    return result;
}

function terminal(term) {
if (term == undefined) return '';
if (term.length > 4) return term.slice(0, 3)+'..';
return term;
}


function station(x, y, sta) {
    return "<circle cx='" + x + "' cy='" + y + "' r='13' /><text x=" + (x + 50) + " y=" + y + " onclick=showTrainInfo('" + sta + "');>" + sta + "</text>";
}

function train_up(x, y, train) {
    x += 15;
    y -= 20;
    var result = "<image xlink:href='images/" + getIcon(train) + ".svg' x='" + x + "' y='" + y + "' width='40px'/>";
    if (train.length > 0) result += '<text style="text-anchor: middle; font-size: 16px;" x='+(x+20)+' y='+(y+20)+' fill=#FFFF00>'+terminal(train[0].terminal)+'</text>';
    return result;
}

function train_down(x, y, train) {
    x += 45;
    y -= 20;
    var result = "<image xlink:href='images/" + getIcon(train) + ".svg' x='" + x + "' y='" + y + "' width='40px' transform='rotate(180," + (x + 20) + "," + (y + 20) + ")'/>";
    if (train.length > 0) result += '<text style="text-anchor: middle; font-size: 16px;" x='+(x+20)+' y='+(y+20)+' fill=#FF0000>'+terminal(train[0].terminal)+'</text>';
    return result;
}

function getIcon(train) {
    if (train.length == 0) return 'no_train';
    
    var all = false, exp = false;
    train.forEach((e) => {
        if (e.isExpress) exp = true;
        else all = true;
    });
    if (exp && all) return 'trains';
    if (exp && !all) return 'express_train';
    return 'train';
}

function showTrainInfo(station) {
    if (currentData == null) return;
    currentData.forEach((e) => {
        if (e.station != station) return;
        var trains = [];
        if (e.up.length > 0) e.up.forEach((e) => {
            trains.push(e.terminal + (e.isExpress?'급':'') + '행 열차 '+ station + ' ' + e.status);
        })
        if (e.down.length > 0) e.down.forEach((e) => {
            trains.push(e.terminal + (e.isExpress?'급':'') + '행 열차 '+ station + ' ' + e.status);
        })
        if (trains.length == 0) alert('해당 역에는 열차가 없어요');
        else alert(trains.join('\n'));
    })
}

function onIconClicked(station) {
    // alert('아이콘: ' + station);
    showTrainInfo(station);
}

function onTextClicked(element) {
    // alert('글자: ' + element.innerHTML.replace(/(<([^>]+)>)/g, ''));
    showTrainInfo(element.innerHTML.replace(/(<([^>]+)>)/g, ''));
}