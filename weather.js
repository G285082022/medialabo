/* 一応残しておく
let data = {
	"coord": {
		"lon": 116.3972,
		"lat": 39.9075
	},
	"weather": [
		{
			"id": 803,
			"main": "Clouds",
			"description": "曇りがち",
			"icon": "04d"
		}
	],
	"base": "stations",
	"main": {
		"temp": 9.94,
		"feels_like": 8.65,
		"temp_min": 9.94,
		"temp_max": 9.94,
		"pressure": 1022,
		"humidity": 14,
		"sea_level": 1022,
		"grnd_level": 1016
	},
	"visibility": 10000,
	"wind": {
		"speed": 2.65,
		"deg": 197,
		"gust": 4.84
	},
	"clouds": {
		"all": 53
	},
	"dt": 1646542386,
	"sys": {
		"type": 1,
		"id": 9609,
		"country": "CN",
		"sunrise": 1646520066,
		"sunset": 1646561447
	},
	"timezone": 28800,
	"id": 1816670,
	"name": "北京市",
	"cod": 200
};
*/



// [ htmlでicon_wrapperに設定したID, 都市ID ]
// IDの相互変換を行うために用意
const idList = [
	['cairo', 360630],
	['moscow', 524901],
	['johannesburg', 993800],
	['beijing', 1816670],
	['tokyo', 1850147],
	['singapore', 1880252],
	['sydney', 2147714],
	['london', 2643743],
	['paris', 2968815],
	['rio_de_janeiro', 3451189],
	['new_york', 5128581],
	['los_angeles', 5368361]
];

// [ xRatio, yRatio ]
// 各地点のworldmapに対する位置情報
const spotPosList = [    
    [0.15, 0.43],       // s_cairo
    [0.18, 0.26],       // s_moscow
    [0.155, 0.71],      // s_johannesburg
    [0.387, 0.375],     // s_beijing
    [0.456, 0.404],     // s_tokyo
    [0.357, 0.588],     // s_singapore
    [0.49, 0.8],        // s_sydney
    [0.065, 0.295],     // s_london
    [0.077, 0.32],      // s_paris
    [0.947, 0.727],     // s_rio_de_janeiro
    [0.865, 0.375],     // s_new_york
    [0.738, 0.405]      // s_los_angeles
];
const infoPosList = [ 
    [0.145, 0.357],     // i_cairo
    [0.134, 0.12],      // i_moscow
    [0.109, 0.569],     // i_johannesburg
    [0.34, 0.235],      // i_beijing
    [0.449, 0.329],     // i_tokyo
    [0.311, 0.448],     // i_singapore
    [0.444, 0.659],     // i_sydney
    [0.018, 0.155],     // i_london
    [0.032, 0.338],     // i_paris
    [0.862, 0.651],     // i_rio_de_janeiro
    [0.819, 0.235],      // i_new_york
    [0.692, 0.265]   	// i_los_angeles
];

const logBorder = '--------------------------------------------------------------------------------';

const worldmap = document.querySelector('img#worldmap');

const allSpot = document.querySelectorAll('div.spot');
const allInfo = document.querySelectorAll('div.info');

const heading = document.querySelector('h1');
const allTag = document.querySelectorAll('p.tag');

const iconList = [];

let firstInitIsFin = false;
let allInitIsFin = false;

let preId;
let isDisplayed = false;
let wrapper;

document.querySelectorAll('div.icon_wrapper').forEach(
	icon_wrapper => {
		icon_wrapper.addEventListener('click', sendDetailRequest);
		sendInitRequest(icon_wrapper);
	}
);

window.onresize = fixElements;
fixElements();

// 初期化のリクエストを送る
function sendInitRequest(icon_wrapeer) {
    let id;
	for (i of idList) {
		if (i[0] == icon_wrapeer.id) {
			id = i[1];
		}
	}
    let url = 'https://www.nishita-lab.org/web-contents/jsons/openweather/' + id + '.json';

    axios.get(url)
        .then(showIcon)     // 通信成功
        .catch(showError)   // 通信失敗
        .then(finishInit);      // 通信の最後の処理
    console.log('id:' + icon_wrapeer.id + ' の初期化を開始しました');
}

// 天気のアイコンを作成・表示する
function showIcon(resp) {
    // サーバから送られてきたデータを出力
    let data = resp.data;

    // data が文字列型なら，オブジェクトに変換する
    if (typeof data === 'string') {
        data = JSON.parse(data);
    }

	let icon_wrapeer;
    let id;
	for (i of idList) {
		if (i[1] == data.id) {
			icon_wrapeer = document.getElementById(i[0]);
            id = i[0];
		}
	}

	let icon = document.createElement('img');
    switch (data.weather[0].main) {
		case 'Clear':
			icon.setAttribute('class', 'clear');
			icon.setAttribute('src', 'icon_clear.png');
			break;
		case 'Clouds':
			icon.setAttribute('class', 'clouds');
			icon.setAttribute('src', 'icon_clouds.png');
			break;
		case 'Rain':
			icon.setAttribute('class', 'rain');
			icon.setAttribute('src', 'icon_rain.png');
			break;
		case 'Mist':
			icon.setAttribute('class', 'mist');
			icon.setAttribute('src', 'icon_mist.png');
			break;
		default:
            console.log('取得したデータの天気が対応していません');
	}
    icon.setAttribute('id', 'icon_' + id);
    icon_wrapeer.insertAdjacentElement('beforeend', icon);
    iconList.push(icon);
}

// 通信の最後にいつも実行する処理
function finishInit() {
    if (!firstInitIsFin) {
        firstInitIsFin = true;
        console.log(logBorder);
    }
    for (i of idList) {
        for (icon of iconList) {
            if (icon.id == 'icon_' + i[0]) {
                allInitIsFin = true;
                break;
            } else {
                allInitIsFin = false;
            }
        }
    }
    console.log('Ajax 通信が終了しました');
    if (allInitIsFin) {
        console.log('全ての初期化が終了しました');
        fixBorderWidthAll();
    }
}

function sendDetailRequest(event) {
	console.log(logBorder);
	let id;
	for (i of idList) {
		if (i[0] == event.target.id) {
			id = i[1];
		}
	}
	if (isDisplayed) {
		if (id == preId) {
			console.log("天気の詳細はすでに表示されています");
			return;
		} else {
			wrapper.remove();
			isDisplayed = false;
			console.log("wrapper を削除しました");
		}
	}
	preId = id;
    
    let url = 'https://www.nishita-lab.org/web-contents/jsons/openweather/' + id + '.json';

    axios.get(url)
        .then(showDerail)   // 通信成功
        .catch(showError)   // 通信失敗
        .then(finish);      // 通信の最後の処理
}

function showDerail(resp) {
    // サーバから送られてきたデータを出力
    let data = resp.data;

    // data が文字列型なら，オブジェクトに変換する
    if (typeof data === 'string') {
        data = JSON.parse(data);
    }

	wrapper = document.createElement('div');
	let div = document.querySelector('div#result');
	let h2 = document.createElement('h2');

	let table = document.createElement('table');
	let thead = document.createElement('thead');
	let tbody = document.createElement('tbody');
	let tr_thead = document.createElement('tr');
	let tr_tbody = document.createElement('tr');

	let th_wether = document.createElement('th');
	let th_tempMax = document.createElement('th');
	let th_tempMin = document.createElement('th');
	let th_humidity = document.createElement('th');
	let th_windSpeed = document.createElement('th');

	let td_wether = document.createElement('td');
	let td_tempMax = document.createElement('td');
	let td_tempMin = document.createElement('td');
	let td_humidity = document.createElement('td');
	let td_windSpeed = document.createElement('td');

	h2.textContent = data.name;
	wrapper.insertAdjacentElement('beforeend', h2);

	th_wether.textContent = '天気';
	tr_thead.insertAdjacentElement('beforeend', th_wether);
	th_tempMax.textContent = '最高気温';
	tr_thead.insertAdjacentElement('beforeend', th_tempMax);
	th_tempMin.textContent = '最低気温';
	tr_thead.insertAdjacentElement('beforeend', th_tempMin);
	th_humidity.textContent = '湿度';
	tr_thead.insertAdjacentElement('beforeend', th_humidity);
	th_windSpeed.textContent = '風速';
	tr_thead.insertAdjacentElement('beforeend', th_windSpeed);
	thead.insertAdjacentElement('beforeend', tr_thead);

	td_wether.textContent = data.weather[0].main;
	tr_tbody.insertAdjacentElement('beforeend', td_wether);
	td_tempMax.textContent = data.main.temp_max;
	tr_tbody.insertAdjacentElement('beforeend', td_tempMax);
	td_tempMin.textContent = data.main.temp_min;
	tr_tbody.insertAdjacentElement('beforeend', td_tempMin);
	td_humidity.textContent = data.main.humidity;
	tr_tbody.insertAdjacentElement('beforeend', td_humidity);
	td_windSpeed.textContent = data.wind.speed;
	tr_tbody.insertAdjacentElement('beforeend', td_windSpeed);
	tbody.insertAdjacentElement('beforeend', tr_tbody);

	table.insertAdjacentElement('beforeend', thead);
	table.insertAdjacentElement('beforeend', tbody);

	wrapper.insertAdjacentElement('beforeend', table);
	
	div.insertAdjacentElement('beforeend', wrapper);

	isDisplayed = true;

	console.log(data.name + " の天気の詳細を表示しました");
}

// 通信エラーが発生した時の処理
function showError(err) {
    console.log(err);
}

// 通信の最後にいつも実行する処理
function finish() {
    console.log('Ajax 通信が終了しました');
}

// 修正関数のラッピング
function fixElements() {
    fixBorderWidthAll();
    fixPositionAll();
    fixFontSizeAll();
}

function fixBorderWidthAll() {
    console.log(logBorder);

    if (allInitIsFin) {
        console.log('icon のボーダーライン幅修正');
        iconList.forEach(icon => fixBorderWidth(icon, 12));
    } else {
        console.log('初期化が終了していないため icon のボーダライン幅の修正ができませんでした');
    }

    console.log('\nspot のボーダーライン幅修正');
    allSpot.forEach(spot => fixBorderWidth(spot, 10));
}

// ボーダーラインの幅を修正する
function fixBorderWidth(elem, width) {
    elem.style.borderWidth = width * worldmap.width / worldmap.naturalWidth + 'px';
    console.log('id:' + elem.id + ', border-width:' + elem.style.borderWidth);
}

// 全ての位置を修正する
function fixPositionAll() {
    console.log(logBorder);

    console.log('spot の位置修正');
    allSpot.forEach(
        (spot, index) => fixPosition(spot, spotPosList[index][0], spotPosList[index][1], 30)
    );
    
    console.log('\ninfo の位置修正');
    allInfo.forEach(
        (info, index) => fixPosition(info, infoPosList[index][0], infoPosList[index][1], 500)
    );
}

// 位置を修正する
function fixPosition(elem, xRatio, yRatio, size) {
    elem.style.top = worldmap.height * yRatio + 'px';
    elem.style.left = worldmap.width * xRatio + 'px';
    elem.style.width = size * worldmap.width / worldmap.naturalWidth + 'px';
    elem.style.height = elem.style.width; 
    console.log('id:' + elem.id + ', top:' + elem.style.top + ', left:' + elem.style.left + ', size:' + elem.style.width + ' × ' + elem.style.height);
}

// 全てのフォントサイズを修正する
function fixFontSizeAll() {
    console.log(logBorder);

    console.log('heading のフォントサイズ修正');
    fixFontSize(heading, 150);

    console.log('\ntag のフォントサイズ修正');
    allTag.forEach(tag => fixFontSize(tag, 60));
}

// フォントサイズを修正する
function fixFontSize(elem, size) {
    elem.style.fontSize = size * worldmap.width / worldmap.naturalWidth + 'px';
    console.log('id:' + elem.id + ', font-size:' + elem.style.fontSize);
}











