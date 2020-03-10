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
    $('#storedetail').css("display", "none");
    if($('#address').val() === '') {
        alert("주소를 입력하세요");
        $('#address').focus();
        return;
    }

    geocoder.addressSearch($('#address').val(), function(result, status) {
        var lat = result[0].y;
        var lng = result[0].x;
        var aJsonArray = new Array();

        $.ajax({
            url: "https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json",
            data: {
                "lat": lat,
                "lng": lng,
                "m": 3000
            },
            type: "GET",
            async: false,
            dataType: "json",
            success: function (data) {
                $(data.stores).each(function (index, store) {
                    var aJson = new Object();
                    aJson.name = store.name;
                    aJson.remain_stat = store.remain_stat;
                    aJson.stock_at = store.stock_at;
                    aJson.addr = store.addr;
                    aJson.lat = store.lat;
                    aJson.lng = store.lng;
                    aJsonArray.push(aJson);
                });
            },
            error: function (xhr, status, error) {
                console.log("error ocurred");
            }
        });

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
                    // 마커 이미지의 이미지 크기 입니다
                    var imageSize = new kakao.maps.Size(24, 35);
                    // 마커 이미지를 생성합니다
                    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

                    var markerd = new kakao.maps.Marker({
                        map: map,
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
                    if(parseInt(aJsonArray[i].remain_stat) >= 100) {
                        var content = '<h4><span class="label label-success"\'';
                    } else if(parseInt(aJsonArray[i].remain_stat) >= 30 && parseInt(aJsonArray[i].remain_stat) <= 99) {
                        var content = '<h4><span class="label label-warning"\'';
                    } else if(parseInt(aJsonArray[i].remain_stat) >= 2 && (aJsonArray[i].remain_stat) <= 29) {
                        var content = '<h4><span class="label label-danger"\'';
                    } else if(parseInt(aJsonArray[i].remain_stat) >= 0 && parseInt(aJsonArray[i].remain_stat) <= 1) {
                        var content = '<h4><span class="label label-default"\'';
                    } else {
                        var content = '<h4><span class="label label-default"\'';
                    }
                    content += '             onclick="shopinfo(\''+aJsonArray[i].name+'\',\''
                        +aJsonArray[i].addr+'\',\''
                        +aJsonArray[i].stock_at+'\',\''
                        +aJsonArray[i].remain_stat+'\',\''
                        +aJsonArray[i].lat+'\',\''
                        +aJsonArray[i].lng+'\',\''
                        +'\')" role="button"\>'+aJsonArray[i].name+':\''+aJsonArray[i].remain_stat+'\'</span></h4>';

                    /*var content = '<a href="#" class="btn btn-success btn-sm" ' +
                        '             onclick="shopinfo(\''+aJsonArray[i]+'\')" role="button"\>'+'재고 : '+aJsonArray[i].remain_cnt+'</a>';*/

                    // 커스텀 오버레이가 표시될 위치입니다
                    var position = new kakao.maps.LatLng(aJsonArray[i].lat, aJsonArray[i].lng);

                    // 커스텀 오버레이를 생성합니다
                    var customOverlay = new kakao.maps.CustomOverlay({
                        position: position,
                        content: content,
                        yAnchor: 1.2
                    });

                    // 커스텀 오버레이를 지도에 표시합니다
                    customOverlay.setMap(map);
            }
            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
        }
    });
}
function shopinfo(name, addr, stock_at, remain_stat, lat, lng){
    console.log(name + "/" + addr + "/" + stock_at + "/" + remain_stat + "/" + lat + "/" + lng);
    $('#storedetail').css('display', "");
    $('#storenm').html('<strong>'+name+'</storng>');
    $('#addr').text(addr);
}

function currdisplay() {
    // Geolocation 객체를 사용
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {

            var lat = position.coords.latitude; // 위도
            var lon = position.coords.longitude; // 경도

            var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                message = '<div style="padding:5px;">현재위치</div>'; // 인포윈도우에 표시될 내용입니다

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
