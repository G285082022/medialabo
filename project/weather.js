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

////////// 課題3-2 ここからプログラムを書こう
/* 一応残しておく
console.log(data.name);
console.log(data.weather[0].description);
console.log(data.main.temp_max);
console.log(data.main.temp_min);
console.log(data.main.humidity);
console.log(data.wind.speed);
*/

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
div.insertAdjacentElement('beforeend', h2);

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

td_wether.textContent = data.weather[0].description;
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

div.insertAdjacentElement('beforeend', table);












