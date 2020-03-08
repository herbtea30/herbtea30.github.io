var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌ß표
        level: 3 // 지도의 확대 레벨
    };

// 지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);

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
            content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
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
        $.ajax({
            url: "https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json",
            data: {
                "lat": lat,
                "lng": lng,
                "m": 1000
            },
            type: "get",
            async: false,
            dataType: "json",
            success: function (data) {
                $(data.stores).each(function (index, store) {
                    var aJson = new Object();
                    aJson.title = store.name;
                    aJson.qty = store.remain_cnt;
                    aJson.soldqty = store.sold_cnt;
                    aJson.issoldout = store.sold_out;
                    aJson.stockqty = store.stock_cnt;
                    aJson.stocktime = store.stock_t;
                    aJson.address = store.addr;
                    aJson.latlng = new kakao.maps.LatLng(store.lat, store.lng);
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
                if(aJsonArray[i].issoldout) {
                    var markerd = new kakao.maps.Marker({
                        map: map,
                        position: aJsonArray[i].latlng,
                        title: aJsonArray[i].title
                    });
                } else {
                    // 마커 이미지의 이미지 크기 입니다
                    var imageSize = new kakao.maps.Size(24, 35);
                    // 마커 이미지를 생성합니다
                    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

                    var markerd = new kakao.maps.Marker({
                        map: map,
                        position: aJsonArray[i].latlng,
                        title: aJsonArray[i].title,
                        image: markerImage
                    });

                    // 인포윈도우로 장소에 대한 설명을 표시합니다
                    var infowindow = new kakao.maps.InfoWindow({
                        content: '<div style="width:150px;text-align:left;padding:6px 0;"><small>* '+aJsonArray[i].title+'</small><br><small>* 재고량: <mark>'+aJsonArray[i].qty+'</mark></small></div>'
                    });
                    infowindow.open(map, markerd);
                }
            }
            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
        }
    });
}
