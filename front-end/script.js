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


function update() {
    var req = new XMLHttpRequest();
    req.open('GET', 'https://api.darktornado.net/subway/gj-line/');
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    //req.setRequestHeader('Cache-Control', 'no-cache');
    req.send();
    req.onreadystatechange = function(e) {
        if (this.readyState == 4 && req.status === 200) {
            data = (req.responseText + '').trim();
            applyData(data);
        }
    };
}
update();

function applyData(data) {
    data = JSON.parse(data);
    const map = document.getElementById("map").innerHTML;

    var src = '';
    data.forEach((e, i) => {
        e.sta
        src += train(pos[i].x, pos[i].y, pos[i].dir, e.up, true);
        src += train(pos[i].x, pos[i].y, pos[i].dir, e.down, false);
    });
    document.getElementById("map").innerHTML = map + src;
}

function train(x, y, dir, type, isUp) {
    if (!isUp) dir += 2;
    if (dir > 4) dir -= 4;
    var icons = ['no_train', 'train'];
    var dirs = [0, 90, 180, 270];
    var xx = [-35, 0, 35, 0];
    var yy = [0, -35, 0, 35];
    x = x - 20 + xx[dir];
    y = y - 20 + yy[dir];
    return "<image xlink:href='images/" + icons[type] + ".svg' x='" + x + "' y='" + y + "' width='40px' transform='rotate(" + dirs[dir] + "," + (x + 20) + "," + (y + 20) + ")'/>";
}


function onIconClicked(station) {
    alert('아이콘: ' + station);
}

function onTextClicked(element) {
    alert('글자: ' + element.innerHTML.replace(/(<([^>]+)>)/g, ''));
}
