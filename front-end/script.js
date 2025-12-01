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

var MAP = null;

function updatePC(data) {
	var map = document.getElementById("map");
    if (MAP == null) MAP = map.innerHTML;
	
    var src = '';
    data.forEach((e, i) => {
        src += train(STNS[i].x, STNS[i].y, STNS[i].dir, e.up, true);
        src += train(STNS[i].x, STNS[i].y, STNS[i].dir, e.down, false);
    });
    map.innerHTML = MAP + src;
}

function updateMobile(data) {
    var src = '<svg width=100% viewBox="0 0 600 5550">';
    src += '<polyline points="100,100 100,5500" fill="none" stroke="#77C4A3" />';
    src += '<polyline points="100,2200 150,2250 350,2250 400,2300 400,2400" fill="none" stroke="#77C4A3" />';
    var seoul = [data.pop()];
    seoul.unshift(data.pop());
    data.forEach((e, i) => {
        var y = (i + 1) * 100;
        src += station(100, y, e.station);
        src += train_up(35, y, e.up);
        src += train_down(65, y, e.down);
    });
    src += station(400, 2300, seoul[0].station) + train_up(335, 2300, seoul[0].up) + train_down(365, 2300, seoul[0].down);
    src += station(400, 2400, seoul[1].station) + train_up(335, 2400, seoul[1].up) + train_down(365, 2400, seoul[1].down);
    src += '</svg>';
    document.getElementById("map_mobile").innerHTML = src;
}

function train(x, y, dir, train, isUp) {
    if (!isUp) dir = (dir + 1) % 2;
    var dirs = [-90, 90];
    var dx = [-30, -10];
    var dy = [20, -60];
    x = x + dx[dir];
    y = y + dy[dir];
    var dx = [32, 8];
    var dy = [12, 32];
    var tx = x + dx[dir];
    var ty = y + dy[dir];
    var result = "<image xlink:href='images/" + getIcon(train) + ".svg' x='" + x + "' y='" + y + "' width='60px' transform='rotate(" + dirs[dir] + "," + (x + 20) + "," + (y + 20) + ")'/>"
    if (train.length > 0) result += '<text class=train_pc x='+tx+' y='+ty+' fill=#BDBDBD>'+terminal(train[0].terminal)+'</text>';
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
    x += 5;
    y -= 30;
    var result = "<image xlink:href='images/" + getIcon(train) + ".svg' x='" + x + "' y='" + y + "' width='60px'/>";
    if (train.length > 0) result += '<text class=train_mobile x='+(x+20)+' y='+(y+20)+' fill=#BDBDBD transform="rotate(90,' + (x + 20) + "," + (y + 30) + ')">'+terminal(train[0].terminal)+'</text>';
    return result;
}

function train_down(x, y, train) {
    x += 55;
    y -= 10;
    var result = "<image xlink:href='images/" + getIcon(train) + ".svg' x='" + x + "' y='" + y + "' width='60px' transform='rotate(180," + (x + 20) + "," + (y + 20) + ")'/>";
    if (train.length > 0) result += '<text class=train_mobile x='+(x+20)+' y='+(y+15)+' fill=#BDBDBD transform="rotate(90,' + (x + 20) + "," + (y + 5) + ')">'+terminal(train[0].terminal)+'</text>';
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
    //alert('아이콘: ' + station);
    showTrainInfo(station); //열차 아이콘의 투명한 부분이 원을 가려서 클릭 불가능
}

function onTextClicked(station) {
    //alert('글자: ' + station);
    showTrainInfo(station);
}

