var map;
var idInfoBoxAberto;
var infoBox = [];
var markers = [];

function initialize() {	
	var latlng = new google.maps.LatLng(-19.9351395,-43.9706464);
	
    var options = {
        zoom: 11,
		center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("mapa"), options);
}
initialize();


function abrirInfoBox(id, marker) {
	if (typeof(idInfoBoxAberto) == 'number' && typeof(infoBox[idInfoBoxAberto]) == 'object') {
		infoBox[idInfoBoxAberto].close();
	}

	infoBox[id].open(map, marker);
	idInfoBoxAberto = id;
}

function carregarPontos() {
	
	$.getJSON('js/pontos.json', function(pontos) {
		
		$.each(pontos, function(index, ponto) {
			

            if(ponto.status == 'perdido')
            {
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(ponto.Latitude, ponto.Longitude),
                    title: "PET PERDIDO !",
                    icon: 'img/pin1.png'
                });
            }else
            {
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(ponto.Latitude, ponto.Longitude),
                    title: "PET Achado !",
                    icon: 'img/pin2.png'
                });
            }


			var ContentInfo = '<div id=nomepet>'+ '<img src="img/dog1.jpg" class="img-rounded" alt="Foto do Pet" width="30%" height="35% ">'+'<br>'+"Nome: " + ponto.nome + "<br>"+ "Descrição: " + ponto.Descricao + "<br> Nome do Dono: " +ponto.nomedono + "<br> Telefone do Dono: " + ponto.teldono + "<br> Email do Dono: " + ponto.emaildono + "<br>"

            var myOptions = {
				content: ContentInfo,
				pixelOffset: new google.maps.Size(-150, 0)
        	};

			infoBox[ponto.Id] = new InfoBox(myOptions);
			infoBox[ponto.Id].marker = marker;
			
			infoBox[ponto.Id].listener = google.maps.event.addListener(marker, 'click', function (e) {
				abrirInfoBox(ponto.Id, marker);
			});
			
			markers.push(marker);

		});
		
		var markerCluster = new MarkerClusterer(map, markers);

	});
	
}
carregarPontos();