var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌ß표
        level: 3 // 지도의 확대 레벨
    };

// 지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);

// 지도타입 컨트롤의 지도 또는 스카이뷰 버튼을 클릭하면 호출되어 지도타입을 바꾸는 함수입니다
function setMapType(maptype) {
    if (maptype === 'roadmap') {
        map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
    } else {
        map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
    }
}

// 지도 확대, 축소 컨트롤에서 확대 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
function zoomIn() {
    map.setLevel(map.getLevel() - 1);
}

// 지도 확대, 축소 컨트롤에서 축소 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
function zoomOut() {
    map.setLevel(map.getLevel() + 1);
}

// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();

// 주소로 좌표를 검색합니다
geocoder.addressSearch('', function(result, status) {

    // 정상적으로 검색이 완료됐으면
    if (status === kakao.maps.services.Status.OK) {

        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 결과값으로 받은 위치를 마커로 표시합니다
        var marker = new kakao.maps.Marker({
            map: map,
            position: coords
        });

        // 인포윈도우로 장소에 대한 설명을 표시합니다
        var infowindow = new kakao.maps.InfoWindow({
            content: '<div style="width:150px;text-align:center;padding:6px 0;">location</div>'
        });
        infowindow.open(map, marker);

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
    }
});

function search() {
    if($('#address').val() === '') {
        alert("주소를 입력하세요");
        return;
    }

    geocoder.addressSearch($('#address').val(), function(result, status) {
        var lat = result[0].y;
        var lng = result[0].x;
        var aJsonArray = new Array();
        var aJson = {
            "count": 14,
            "stores": [{
                "addr": "인천광역시 계양구 병방로 17, 제일빌딩 (병방동)",
                "code": "31869653",
                "created_at": "2020/03/07 19:40:00",
                "lat": 37.5467101,
                "lng": 126.7424679,
                "name": "test::중앙약국",
                "remain_cnt": 0,
                "sold_cnt": 440,
                "sold_out": true,
                "stock_cnt": 440,
                "stock_t": "14:51",
                "type": "01"
            }, {
                "addr": "인천광역시 계양구 장제로 907, 1층 (병방동)",
                "code": "41814835",
                "created_at": "2020/03/07 19:40:00",
                "lat": 37.5476577,
                "lng": 126.7405077,
                "name": "test::하늘약국",
                "remain_cnt": 6,
                "sold_cnt": 444,
                "sold_out": false,
                "stock_cnt": 450,
                "stock_t": "09:50",
                "type": "01"
            }, {
                "addr": "인천광역시 계양구 장제로 911 (병방동)",
                "code": "31804969",
                "created_at": "2020/03/07 19:40:00",
                "lat": 37.5478606,
                "lng": 126.7406685,
                "name": "test::세기약국",
                "remain_cnt": 198,
                "sold_cnt": 252,
                "sold_out": false,
                "stock_cnt": 450,
                "stock_t": "15:14",
                "type": "01"
            }, {
                "addr": "인천광역시 계양구 장제로 910 (병방동)",
                "code": "41849990",
                "created_at": "2020/03/07 19:40:00",
                "lat": 37.5476716,
                "lng": 126.7411471,
                "name": "test::도담약국",
                "remain_cnt": 2,
                "sold_cnt": 198,
                "sold_out": false,
                "stock_cnt": 200,
                "stock_t": "13:02",
                "type": "01"
            }, {
                "addr": "인천광역시 계양구 장제로 912 (병방동)",
                "code": "31844171",
                "created_at": "2020/03/07 19:40:00",
                "lat": 37.5477902,
                "lng": 126.741241,
                "name": "test::굿모닝약국",
                "remain_cnt": 30,
                "sold_cnt": 420,
                "sold_out": false,
                "stock_cnt": 450,
                "stock_t": "10:06",
                "type": "01"
            }, {
                "addr": "인천광역시 계양구 장제로 916, 1층 (병방동, 계양병원)",
                "code": "41839854",
                "created_at": "2020/03/07 19:40:00",
                "lat": 37.5481617,
                "lng": 126.7414689,
                "name": "test::참메디칼약국",
                "remain_cnt": 32,
                "sold_cnt": 418,
                "sold_out": false,
                "stock_cnt": 450,
                "stock_t": "09:07",
                "type": "01"
            }, {
                "addr": "인천광역시 계양구 장제로 929, 101호 (병방동, 돌샘프라자)",
                "code": "41826124",
                "created_at": "2020/03/07 19:40:00",
                "lat": 37.5494651,
                "lng": 126.741656,
                "name": "test::메디팜우리약국",
                "remain_cnt": 0,
                "sold_cnt": 362,
                "sold_out": true,
                "stock_cnt": 362,
                "stock_t": "09:21",
                "type": "01"
            }, {
                "addr": "인천광역시 계양구 장제로 1004, 107호 (박촌동, 계양한양수자인)",
                "code": "41823559",
                "created_at": "2020/03/07 19:40:00",
                "lat": 37.5547854,
                "lng": 126.7463043,
                "name": "test::웰니스선약국",
                "remain_cnt": 4,
                "sold_cnt": 448,
                "sold_out": false,
                "stock_cnt": 452,
                "stock_t": "09:30",
                "type": "01"
            }, {
                "addr": "인천광역시 계양구 장제로1009번길 2 (박촌동)",
                "code": "31805043",
                "created_at": "2020/03/07 19:40:00",
                "lat": 37.5558354,
                "lng": 126.745366,
                "name": "test::성모당약국",
                "remain_cnt": 0,
                "sold_cnt": 450,
                "sold_out": true,
                "stock_cnt": 450,
                "stock_t": "08:24",
                "type": "01"
            }, {
                "addr": "인천광역시 계양구 임학동로9번길 2 (임학동)",
                "code": "31807038",
                "created_at": "2020/03/07 19:40:00",
                "lat": 37.5441219,
                "lng": 126.7345762,
                "name": "test::늘푸른약국",
                "remain_cnt": 0,
                "sold_cnt": 450,
                "sold_out": true,
                "stock_cnt": 450,
                "stock_t": "09:56",
                "type": "01"
            }, {
                "addr": "인천광역시 계양구 장제로 859 (임학동)",
                "code": "31885594",
                "created_at": "2020/03/07 19:40:00",
                "lat": 37.5440494,
                "lng": 126.7374792,
                "name": "test::보현약국",
                "remain_cnt": 0,
                "sold_cnt": 450,
                "sold_out": true,
                "stock_cnt": 450,
                "stock_t": "09:37",
                "type": "01"
            }, {
                "addr": "인천광역시 계양구 장제로 867 (임학동)",
                "code": "41826523",
                "created_at": "2020/03/07 19:40:00",
                "lat": 37.5447518,
                "lng": 126.738057,
                "name": "test::365건강약국",
                "remain_cnt": 260,
                "sold_cnt": 190,
                "sold_out": false,
                "stock_cnt": 450,
                "stock_t": "09:53",
                "type": "01"
            }, {
                "addr": "인천광역시 계양구 임학동로 47, 대경빌딩 (임학동)",
                "code": "31892043",
                "created_at": "2020/03/07 19:40:00",
                "lat": 37.5461342,
                "lng": 126.7371264,
                "name": "test::새생명약국",
                "remain_cnt": 0,
                "sold_cnt": 450,
                "sold_out": true,
                "stock_cnt": 450,
                "stock_t": "09:44",
                "type": "01"
            }, {
                "addr": "인천광역시 계양구 계양산로 191 (임학동)",
                "code": "31829848",
                "created_at": "2020/03/07 19:40:00",
                "lat": 37.54767,
                "lng": 126.7371586,
                "name": "test::나라약국",
                "remain_cnt": 20,
                "sold_cnt": 430,
                "sold_out": false,
                "stock_cnt": 450,
                "stock_t": "09:42",
                "type": "01"
            }]};

        aJsonArray = aJson.stores;

        // $.ajax({
        //     url: "https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json",
        //     data: {
        //             "lat": lat,
        //             "lng": lng,
        //             "m": 1000
        //         },
        //     type: "get",
        //     async: false,
        //     dataType: "json",
        //     success: function (data) {
        //         $(data.stores).each(function (index, store) {
        //             var aJson = new Object();
        //             aJson.title = store.name;
        //             aJson.qty = store.remain_cnt;
        //             aJson.soldqty = store.sold_cnt;
        //             aJson.issoldout = store.sold_out;
        //             aJson.stockqty = store.stock_cnt;
        //             aJson.stocktime = store.stock_t;
        //             aJson.address = store.addr;
        //             aJson.latlng = new kakao.maps.LatLng(store.lat, store.lng);
        //             aJsonArray.push(aJson);
        //         });
        //     },
        //     error: function (xhr, status, error) {
        //         console.log("error ocurred");
        //     }
        // });

        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            // 결과값으로 받은 위치를 마커로 표시합니다
            var marker = new kakao.maps.Marker({
                map: map,
                position: coords
            });

            //재고있는 약국 이미지 마커
            var imageSrc = "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

            for(var i=0; i<aJsonArray.length; i++) {
                //if(aJsonArray[i].issoldout) {
                if(aJsonArray[i].sold_out) {
                    var markerd = new kakao.maps.Marker({
                        map: map,
                        // position: aJsonArray[i].latlng,
                        // title: aJsonArray[i].title
                        position: new kakao.maps.LatLng(aJsonArray[i].lat, aJsonArray[i].lng),
                        title: aJsonArray[i].name
                    });

                    // 커스텀 오버레이에 표시할 내용입니다
                    // HTML 문자열 또는 Dom Element 입니다
                    var content = '<p class="btn btn-default btn-sm" onclick="noshopinfo()" role="button">재고 : '+aJsonArray[i].remain_cnt+'</p>';

                    // 커스텀 오버레이가 표시될 위치입니다
                    var position = new kakao.maps.LatLng(aJsonArray[i].lat, aJsonArray[i].lng);

                    // 커스텀 오버레이를 생성합니다
                    var customOverlay = new kakao.maps.CustomOverlay({
                        position: position,
                        content: content,
                        yAnchor: 1.5
                    });

                    // 커스텀 오버레이를 지도에 표시합니다
                    customOverlay.setMap(map);
                } else {
                    // 마커 이미지의 이미지 크기 입니다
                    var imageSize = new kakao.maps.Size(24, 35);
                    // 마커 이미지를 생성합니다
                    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

                    var markerd = new kakao.maps.Marker({
                        map: map,
                        // position: aJsonArray[i].latlng,
                        // title: aJsonArray[i].title,
                        position: new kakao.maps.LatLng(aJsonArray[i].lat, aJsonArray[i].lng),
                        title: aJsonArray[i].name,
                        image: markerImage
                    });

                    // 인포윈도우로 장소에 대한 설명을 표시합니다
                    // var infowindow = new kakao.maps.InfoWindow({
                    //     //content: '<div style="width:150px;text-align:left;padding:6px 0;"><small>* '+aJsonArray[i].title+'</small><br><small>* 재고량: <mark>'+aJsonArray[i].qty+'</mark></small></div>'
                    //     content: '<div style="width:150px;text-align:left;padding:6px 0;"><small>* '+aJsonArray[i].name+'</small><br><small>* 재고량: <strong>'+aJsonArray[i].remain_cnt+'</strong></small></div>'
                    // });
                    // infowindow.open(map, markerd);

                    // 커스텀 오버레이에 표시할 내용입니다
                    // HTML 문자열 또는 Dom Element 입니다
                    if(aJsonArray[i].remain_cnt >= 100) {
                        var content = '<Button id="stock" class="btn btn-success btn-sm" ';
                    } else if(aJsonArray[i].remain_cnt >= 30 && aJsonArray[i].remain_cnt <= 99) {
                        var content = '<Button id="stock" class="btn btn-warning btn-sm" ';
                    } else if(aJsonArray[i].remain_cnt >= 2 && aJsonArray[i].remain_cnt <= 29) {
                        var content = '<Button id="stock" class="btn btn-danger btn-sm" ';
                    } else if(aJsonArray[i].remain_cnt >= 0 && aJsonArray[i].remain_cnt <= 1) {
                        var content = '<Button id="stock" class="btn btn-default btn-sm" ';
                    }
                    content += '             onclick="shopinfo(\''+aJsonArray[i].name+'\',\''
                        +aJsonArray[i].addr+'\',\''
                        +aJsonArray[i].stock_t+'\',\''
                        +aJsonArray[i].stock_cnt+'\',\''
                        +aJsonArray[i].sold_cnt+'\',\''
                        +aJsonArray[i].remain_cnt+'\',\''
                        +aJsonArray[i].lat+'\',\''
                        +aJsonArray[i].lng+'\',\''
                        +'\')" role="button"\>'+'재고 : '+aJsonArray[i].remain_cnt+'</Button>';

                    /*var content = '<a href="#" class="btn btn-success btn-sm" ' +
                        '             onclick="shopinfo(\''+aJsonArray[i]+'\')" role="button"\>'+'재고 : '+aJsonArray[i].remain_cnt+'</a>';*/

                    // 커스텀 오버레이가 표시될 위치입니다
                    var position = new kakao.maps.LatLng(aJsonArray[i].lat, aJsonArray[i].lng);

                    // 커스텀 오버레이를 생성합니다
                    var customOverlay = new kakao.maps.CustomOverlay({
                        position: position,
                        content: content,
                        yAnchor: 1.5
                    });

                    // 커스텀 오버레이를 지도에 표시합니다
                    customOverlay.setMap(map);
                }
            }
            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
        }
    });
}
function shopinfo(name, addr, stock_t, stock_cnt, sold_cnt, remain_cnt, lat, lng){
    console.log(name + "/" + addr + "/" + stock_t + "/" + stock_cnt + "/" + sold_cnt + "/" + remain_cnt + "/" + lat + "/" + lng);
}
function noshopinfo(){
    console.log("재고가 없는 매장입니다.");
}

function currentposition() {
    // Geolocation 객체를 사용
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {

            var lat = position.coords.latitude; // 위도
            var lon = position.coords.longitude; // 경도

            console.log(lat);
            console.log(lon);


            var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다

            // 마커와 인포윈도우를 표시합니다
            displayMarker(locPosition, message);

        }, function(error) {
            // 위치를 가져오는데 실패한 경우
            consol.log(error.message);
        });
    } else {
        consol.log("Geolocation을 지원하지 않는 브라우저 입니다.");
    }
}

// 지도에 마커와 인포윈도우를 표시하는 함수입니다
function displayMarker(locPosition, message) {

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        map: map,
        position: locPosition
    });

    var iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

    // 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
        content : iwContent,
        removable : iwRemoveable
    });

    // 인포윈도우를 마커위에 표시합니다
    infowindow.open(map, marker);

    // 지도 중심좌표를 접속위치로 변경합니다
    map.setCenter(locPosition);
}
