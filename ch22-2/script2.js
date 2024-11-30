const express = require('express')
const app = express()
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
if (typeof window !== 'undefined') {
    window.onload = handleRefresh;
}
var map;
var gus="";
var marker;
var mapContainer;
var lat, lng;

function handleRefresh() {
    getData();
    addBound(3000);
}

const apiKey = "596748666a6c696d39397174545847";
const baseUrl = "http://openAPI.seoul.go.kr:8088/"
const url = `${baseUrl}${apiKey}/json/SeoulPublicLibraryInfo/`
async function getData() {
    for (var i=1; i<16000; i=i+1000 ) {
        var j = i + 999;
        await fetch(url + i + "/" + j)
        .then(response => response.json())
        .then(data => updateAllLibraries(data));
    }
}

function updateAllLibraries(data) {
    const libraries = data.SeoulPublicLibraryInfo.row;

    libraries.forEach(lib => {
        addMarker(
            "images/marker1.png",
            new kakao.maps.Size(27, 40),
            { offset: new kakao.maps.Point(14, 28) },
            lib.XCNTS,
            lib.YDNTS,
            lib.LBRRY_NAME,
            lib.ADRES,
            lib.TEL_NO,
            lib.FDRM_CLOSE_DATE
        );
		var librariesDiv = document.getElementById("libraries");
		librariesDiv.innerHTML="";
		for(var i=0; i<libraries.length; i++){
			var lib = libraries[i];
			var div = document.createElement("div");
			div.setAttribute("class", "libraries");
			div.innerHTML="";
			if(lib.CODE_VALUE == gus) {
				div.innerHTML = "[" + lib.CODE_VALUE + "]" + lib.LBRRY_NAME;
				div.innerHTML += "<input type=button style='width: 50px;' value='위치'" +
				" onclick=\"window.open('http://www.google.co.kr/maps/search/" + lib.LBRRY_NAME + " ')\n/>";
				if(lib.TEL_NO != "") {
					div.innerHTML += "<br>" + "☎️) " + lib.TEL_NO;
				}
				if(lib.ADRES != "") {
					div.innerHTML += "<br>" + "\n주소: " + lib.ADRES + "\n(x:"
							+ lib.XCNTS + "&nbsp;,&nbsp;y:" + lib.YDNTS + ")";
				}
				if(lib.FDRM_CLOSE_DATE != "") {
					div.innerHTML += "<br>\n휴관일 : " + lib.FDRM_CLOSE_DATE;
				}
				if(lib.HMPG_URL != "") {
					div.innerHTML += "<br>\n홈페이지 : " +"<a href=" + lib.HMPG_URL + " target=blank>" + lib.HMPG_URL + "</a>";
				}
				if(librariesDiv.childElementCount == 0) {
					librariesDiv.appendChild(div);
				}
				else {
					librariesDiv.insertBefore(div, librariesDiv.firstChild);
				}
			}
		}
    });
}   

function find(){ // find 버튼을 눌렀을 때(onClick)
	mapContainer = document.getElementById('map'), // 지도를 표시할 div 설정
	mapOption = {
		center: new kakao.maps.LatLng(37.56544,126.977119,17), // 지도 중심좌표 시청으로 임의 지정.
		level: 13 // 지도의 확대 레벨
		};
	
	var gu = document.getElementById("gu"); //html의 gu를 가져온다.
	gus = gu.options[gu.selectedIndex].value; //gus는 gu의 값을 가지고 있다.(ex: 강북구, 강동구..)
	
	switch(gu.selectedIndex){//선택된 인덱스 번호
	case 0: // 강남구
		mapOption = {
			center: new kakao.maps.LatLng(37.4968488,127.0679394),//강남구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 1: //강동구
		mapOption = {
			center: new kakao.maps.LatLng(37.5492994,127.1464275),//강동구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 2: //강북구 
		mapOption = {
			center: new kakao.maps.LatLng(37.6482131,127.0164069),//강북구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 3: //강서구 
		mapOption = {
			center: new kakao.maps.LatLng(37.552593,126.85051),//강서구 좌표 지정
			level:7 // 지도의 확대 레벨
			};
		break;
	case 4: //관악구 
		mapOption = {
			center: new kakao.maps.LatLng(37.4654529,126.9442478),//관악구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 5: //광진구 
		mapOption = {
			center: new kakao.maps.LatLng(37.5388,127.083445),//광진구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 6: //구로구   
		mapOption = {
			center: new kakao.maps.LatLng(37.495765,126.8578697),//구로구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 7: //금천구  
		mapOption = {
			center: new kakao.maps.LatLng(37.4599896,126.9012665),//금천구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 8: //노원구  
		mapOption = {
			center: new kakao.maps.LatLng(37.6541956,127.0769692),//노원구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 9: //도봉구  
		mapOption = {
			center: new kakao.maps.LatLng(37.6662325,127.0298724),//도봉구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 10: //동대문구  
		mapOption = {
			center: new kakao.maps.LatLng(37.5835755,127.0505528),//동대문구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 11: //동작구  
		mapOption = {
			center: new kakao.maps.LatLng(37.4971121,126.944378),//동작구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 12: //마포구  
		mapOption = {
			center: new kakao.maps.LatLng(37.5615964,126.9086431),//마포구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 13: //서대문구  
		mapOption = {
			center: new kakao.maps.LatLng(37.583312,126.9356601),//서대문구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 14: //서초구  
		mapOption = {
			center: new kakao.maps.LatLng(37.483574,127.032661),//서초구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 15: //성동구  
		mapOption = {
			center: new kakao.maps.LatLng(37.5508768,127.0408952),//성동구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 16: //성북구  
		mapOption = {
			center: new kakao.maps.LatLng(37.6023295,127.025236),//성북구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 17: //송파구 
		mapOption = {
			center: new kakao.maps.LatLng(37.504741,127.1144649),//송파구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 18: //양천구 
		mapOption = {
			center: new kakao.maps.LatLng(37.527432,126.8558783),//양천구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 19: //영등포구 
		mapOption = {
			center: new kakao.maps.LatLng(37.525423,126.896395),//영등포구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 20: //용산구 
		mapOption = {
			center: new kakao.maps.LatLng(37.5305208,126.9809672),//용산구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 21: //은평구 
		mapOption = {
			center: new kakao.maps.LatLng(37.6175107,126.9249166),//은평구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 22: //종로구 
		mapOption = {
			center: new kakao.maps.LatLng(37.6009106,126.9835817),//종로구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 23: //중구 
		mapOption = {
			center: new kakao.maps.LatLng(37.5576747,126.9941653),//중구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
	case 24: //중랑구 
		mapOption = {
			center: new kakao.maps.LatLng(37.5950497,127.0957062),//중랑구 좌표 지정
			level: 7 // 지도의 확대 레벨
			};
		break;
		
	}//switch
	
	//지도를 표시할 div와 지도 옵션으로 지도 생성
	map = new kakao.maps.Map(mapContainer, mapOption);

    // 지도 확대 축소를 제어할 수 있는 줌 컨트롤 생성
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
	
	kakao.maps.event.addListener(map, 'dragend', function() {
		handleRefresh(); //지도의 중심이 이동될때도 마커 다시 표시
	});
	
	handleRefresh(); //검색버튼을 클릭할 때 마커 표시
} //find

function addBound(radius) {
    var bound = new kakao.maps.Circle({
        center: map.getCenter(),  // 지도 중심을 원의 중심으로 설정
        radius: radius,           // 반경 설정
        strokeWeight: 5,
        strokeColor: '#F7D358',
        strokeOpacity: 0.5,
        strokeStyle: 'solid',
        fillColor: '#F7FE2E',
        fillOpacity: 0.3,
        zIndex: 1
    });
    bound.setMap(map);

    var center = map.getCenter();  // 지도의 중심
    var position = {  // 지도 중심 좌표
        latitude: center.getLat(),
        longitude: center.getLng()
    };

    // 처음 한 번만 원 안에 있는 도서관 마커를 표시
    fetchLibraries(position, radius);

    // 주어진 좌표와 반경 내에 있는 도서관만 필터링하여 마커 표시
    function fetchLibraries(centerCoords, radius) {
        fetch(url + "1/1000") // 예시로 처음 1000개의 도서관 정보 가져오기
            .then(response => response.json())
            .then(data => {
                const libraries = data.SeoulPublicLibraryInfo.row;
                libraries.forEach(lib => {
                    var loc = { // 도서관의 위치
                        latitude: lib.XCNTS,
                        longitude: lib.YDNTS
                    };

                    // 원 안에 포함되는지 확인
                    if (isWithinBound(centerCoords, loc, radius)) {
                        addMarker(
                            "images/marker1.png",
                            new kakao.maps.Size(27, 40),
                            { offset: new kakao.maps.Point(14, 28) },
                            lib.XCNTS,
                            lib.YDNTS,
                            lib.LBRRY_NAME,
                            lib.ADRES,
                            lib.TEL_NO,
                            lib.FDRM_CLOSE_DATE
                        );
                    }
                });
            });
    }

    // 주어진 좌표가 원의 범위 안에 있는지 확인하는 함수
    function isWithinBound(center, location, radius) {
        var dist = computeDistance(center, location);  // 거리 계산
        return dist <= radius / 1000;  // radius는 미터로 입력되므로 km로 비교
    }
}

function updateLibrary(libraries) {//16번 호출
    var libraries = libraries.SeoulPublicLibraryInfo.row;
    var addr = "";
    var center = map.getCenter(); // 중심 가져오기
    var position = {
            latitude : center.getLat(),
            longitude: center.getLng()
        };			
    for (var i = 0; i < libraries.length; i++) {
        var lib = libraries[i];
        var imageSrc = "images/marker1.png",
          imageSize = new kakao.maps.Size(27, 40),// 마커의 크기 
          imageOption = {offset: new kakao.maps.Point(14, 28)}; // 포인터 객체 생성 
        var loc = { //open API의 값들 위도와 경도
          latitude : lib.XCNTS,
          longitude: lib.YDNTS
        };      
        var km = computeDistance (position, loc); // 거리 계산, position 지도의 중심좌표이고 loc는 각 도서관 좌표 
        if(addr != lib.ADRES && km <= 3){ // 주소가 중복되지 않고, 거리가 3km이내의 것들을 가져온다.
            addr = lib. ADRES;
            addMarker (imageSrc, imageSize, imageOption, lib.XCNTS, lib.YDNTS, lib.LBRRY_NAME, lib.ADRES, lib.TEL_NO, lib.FDRM_CLOSE_DATE);
        }
    }

    if(libraries.length > 0){
    lastReportTime = libraries[libraries.length-1].time;
    }
} //updateLibrary

function addMarker(imageSrc, imageSize, imageOption, latitude, longitude, name, address, tel, closeday) {
    // 마커 이미지 생성
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
    var markerPosition = new kakao.maps.LatLng(latitude, longitude);

    // 마커 생성 및 지도에 추가
    var marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
        clickable: true, // 클릭 가능하도록 설정
        zIndex: 7
    });
    marker.setMap(map);

    // 인포윈도우 내용 정의
	var content = `	
	<div class="card text-bg-primary" style='width:200px; padding:10px; font-size:12px;'>
		<div class="card-body">
			<b>도서관: ${name}</b><br>
			주소: ${address}<br>
			전화번호: ${tel}<br>
			휴관일: <span style="color:red;">${closeday}</span>
		</div>
	  </div>`;

    // 인포윈도우 생성
    var infowindow = new kakao.maps.InfoWindow({
        content: content,
        zIndex: 10
    });

    // 마커 클릭 이벤트
    kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });

    // 지도 드래그 시작 시 마커 제거
    kakao.maps.event.addListener(map, 'dragstart', function () {
        marker.setMap(null);
    });
}

function computeDistance (startCoords,destCoords){
    var startLatRads = degreesToRadians(startCoords.latitude);
    var startLongRads = degreesToRadians(startCoords.longitude);
    var destLatRads = degreesToRadians(destCoords.latitude);
    var destLongRads = degreesToRadians(destCoords.longitude);
    var Radius = 6371;
    var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads ) +
                             Math.cos(startLatRads) * Math.cos(destLatRads ) *
                             Math.cos(startLongRads - destLongRads )) * Radius;
    return distance;                          
}

function degreesToRadians(degrees) {
    var radians = (degrees * Math.PI)/180;
    return radians;
}