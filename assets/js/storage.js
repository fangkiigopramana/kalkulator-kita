const CACHE_KEY =  "calculation_history"

//pengecekan
function checkForStorage(){
	return typeof(Storage) !== "undefined"
}

//menambahkan data di array
function putHistory(data) {
	if(checkForStorage()){
		let historyData = null;
		if (localStorage.getItem(CACHE_KEY) === null){
			historyData = [];
		} else {
			//untuk mengubah nilai objek dalam bentuk string kembali pada bentuk objek JavaScript
			historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
		}

		historyData.unshift(data);

		if (historyData.length > 5){
			historyData.pop();
		}
		//untuk mengubah objek JavaScript ke dalam bentuk String
		localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
	}
}

//mengembalikan nilai array dari localStorage
function showHistory() {
	if (checkForStorage()) {
		return JSON.parse(localStorage.getItem(CACHE_KEY));
	} else {
		return [];
	}
}

// merender data riwayat kalkulasi di HTML
function renderHistory() {
	const historyData = showHistory();
	let historyList = document.querySelector('#historyList');

	//menghapus konten HTML
	historyList.innerHTML = "";

	for (let history of historyData) {
		let row = document.createElement ('tr');
		row.innerHTML = "<td>" + history.firstNumber + "</td>";
		row.innerHTML += "<td>" + history.operator + "</td>";
		row.innerHTML += "<td>" + history.secondNumber + "</td>";
		row.innerHTML += "<td>" + history.result + "</td>";

		historyList.appendChild(row);
	}
}
renderHistory()
