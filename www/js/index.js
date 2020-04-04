

var mes_text = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

var dia_text = ["Dom", "Lun", "Mar", "Mie", "Juv", "Vie", "Sab"];

var userToken=null;
var v_evemts3=null;
function loginUser(){
   $.ajax({
      type: 'POST',
      url: "https://apiams2root.herokuapp.com/users/login",
      data: JSON.stringify({
        "email": document.getElementById('user').value,
        "password": document.getElementById('pass').value
    }),
      dataType: "json",
      contentType: "application/json",
      success : function(response){
    //alert("funciona bien");
    userToken=response.token;
    $.ajax({
        url: 'https://apiams2root.herokuapp.com/users/me',
        type: 'GET',
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer '+ userToken
        },
        success: function (result) {
            console.log( "DESDE TOKEN: "+result.name);
            document.getElementById("h1Hola").innerHTML = "Usuario: "+result.name+ " "+result.surname;
        },
        error: function (error) {
            console.log( "DESDE TOKEN: error");
        }
    })

    $.ajax({
        type: 'GET',
        url: "https://apiams2root.herokuapp.com/events/available",
        headers: {
            'Authorization': 'Bearer '+ userToken
        },
        contentType: "application/json",
        success : function(response){
    //alert("funciona bien");
    v_evemts3=response;
    console.log( "La solicitud se ha completado correctamente."+ userToken+ "----"+ document.getElementById('user').value );
    document.getElementById("btnLogin").innerHTML = "Logout";
    document.getElementById("btnPerfil").style.display = "block";
    
    $('.clase_pagina').remove();
    $('.linkDia').remove();
    numerar();
    window.location.href = "#";

},
error: function(error){
            //alert("No funciona");
            console.log( "Error EVENTS" );
        }
    }) 
    

},
error: function(error){
    //alert("No funciona");
    console.log( "Error" );
}
})
}

function LoginPage(){
    if(userToken==null){
     window.location.href = "#login_page";
 }else{
    document.getElementById("btnLogin").innerHTML = "Login";
    $.ajax({
      type: 'POST',
      url: "https://apiams2root.herokuapp.com/users/me/logout",
      headers: {
        'Authorization': 'Bearer '+ userToken
    },
    contentType: "application/json",
    success : function(response){
    //alert("funciona bien");
    
    console.log( "logout correcto" );
    userToken=null;
    document.getElementById("btnLogin").innerHTML = "Login";
    document.getElementById("h1Hola").innerHTML = "";
    document.getElementById("btnPerfil").style.display = "none";
},
error: function(error){
    //alert("No funciona");
    console.log( "Error" );
}
})


}
}

function ProfilePage(){
 $.ajax({
    url: 'https://apiams2root.herokuapp.com/users/me',
    type: 'GET',
    contentType: 'application/json',
    headers: {
        'Authorization': 'Bearer '+ userToken
    },
    success: function (result) {
        console.log( "DESDE TOKEN PROFILE: "+result.name);
        var ul = document.getElementById("listaProfileSpecs");
        var items = ul.getElementsByTagName("li");
        items[0].innerHTML = "<a class='ui-btn ui-btn-icon-right ui-icon-carat-r' onclick='EditarPanelProfileText(0)'>Nombre: "+result.name+"</a></li>";
        items[1].innerHTML = "<a class='ui-btn ui-btn-icon-right ui-icon-carat-r' onclick='EditarPanelProfileText(1)'>Apellido: "+result.surname+"</a></li>";
        items[2].innerHTML = "<a class='ui-btn ui-btn-icon-right ui-icon-carat-r' onclick='EditarPanelProfileText(2)'>Email: "+result.email+"</a></li>";
        items[3].innerHTML = "<a class='ui-btn ui-btn-icon-right ui-icon-carat-r' onclick='EditarPanelProfileText(3)'>Provincia: "+result.province+"</a></li>";
        items[4].innerHTML = "<a class='ui-btn ui-btn-icon-right ui-icon-carat-r' onclick='EditarPanelProfileText(4)'>Direccion: "+result.address+"</a></li>";
        items[5].innerHTML = "<a class='ui-btn ui-btn-icon-right ui-icon-carat-r' onclick='EditarPanelProfileText(5)'>CP: "+result.cp+"</a></li>";
        items[6].innerHTML = "<a class='ui-btn ui-btn-icon-right ui-icon-carat-r' onclick='EditarPanelProfileText(6)'>DNI: "+result.dni+"</a></li>";
        items[7].innerHTML = "<a class='ui-btn ui-btn-icon-right ui-icon-carat-r' onclick='EditarPanelProfileText(7)'>Fecha nacimiento: "+result.birthday+"</a></li>";
        items[8].innerHTML = "<a class='ui-btn ui-btn-icon-right ui-icon-carat-r' onclick='EditarPanelProfileText(8)'>Telefono: "+result.phonenumber+"</a></li>";
        items[9].innerHTML = "<a class='ui-btn ui-btn-icon-right ui-icon-carat-r' onclick='EditarPanelProfileText(9)'>Idioma: "+result.language+"</a></li>";
        window.location.href = "#perfil_page";
    },
    error: function (error) {
        console.log( "DESDE TOKEN: error");
    }
})
}

function EditarPanelProfileText(v_numero){
    if (v_numero == 2 || v_numero == 6 || v_numero== 7) {
        document.getElementById("div_editar_profile").style.display = "none";
    }else{
        document.getElementById("div_editar_profile").style.display = "block";
        var CamposHtml = ["Nombre", "Apellido", "Email", "Provincia", "Direccion", "CP", "DNI", "Fecha nacimiento", "Telefono", "Idioma"];
        var ul = document.getElementById("capoEditarProfileText");
        ul.innerText = "Editar "+CamposHtml[v_numero];
    }
    
}

function estructurar() {
 //nou_elem = $(" <a href='#login_page'  title='Go back' class='ui-link ui-btn-left ui-btn ui-icon-back ui-btn-icon-left ui-shadow ui-corner-all' data-role='button' role='button'>Login</a>");
 //$('#homePage').append(nou_elem);
 for (m = 0; m <= 11; m++) {
    //Mes
    let mes = document.createElement("DIV");
    
    mes.className = "mes";    
    let HomePageHorario = document.getElementById('homePageHeader');

    HomePageHorario.appendChild(mes);
    //Tabla
    let tabla_mes = document.createElement("TABLE");
    tabla_mes.className = "tabla_mes";
    mes.appendChild(tabla_mes);
    //Título
    let titulo = document.createElement("CAPTION");
    titulo.className = "titulo";
    titulo.innerText = mes_text[m];
    tabla_mes.appendChild(titulo);
    //Cabecera
    let cabecera = document.createElement("THEAD");
    tabla_mes.appendChild(cabecera);
    let fila = document.createElement("TR");
    cabecera.appendChild(fila);
    for (d = 0; d < 7; d++) {
      let dia = document.createElement("TH");
      dia.innerText = dia_text[d];
      fila.appendChild(dia);
  }
    //Cuerpo

    let cuerpo = document.createElement("TBODY");
    tabla_mes.appendChild(cuerpo);
    for (f = 0; f < 6; f++) {
      let fila = document.createElement("TR");
      cuerpo.appendChild(fila);
      for (d = 0; d < 7; d++) {
        let dia = document.createElement("TD");
        dia.innerText = "";
        fila.appendChild(dia);
    }     
}
    //HomePageHorario.appendChild(cuerpo);
}
}

function RecogerEvento(v_numero) {
    console.log(  v_numero );
}

function numerar() { 

    for (i = 1; i < 366; i++) {
        let link = document.createElement("a");
        link.style.color = 'black';
        link.classList.add("linkDia");   
        link.id = "linkDia"+i;     
        let fecha = fechaPorDia(2020, i);        
        let mes = fecha.getMonth();
        let select_tabla = document.getElementsByClassName('tabla_mes')[mes];
        let dia = fecha.getDate();
        let dia_semana = fecha.getDay();
        link.onclick = function() {RecogerEvento((mes+1)+"-"+dia)};
        if (dia == 1) {var sem = 0;}
        link.innerText = dia;
    //crear link amb numero de dia

    //ajax eventos

    if (userToken!=null){

        //departure
        for (var j = v_evemts3.length - 1; j >= 0; j--) {
            var v_departrue = v_evemts3[j].departure[0].depdate;
            //console.log( "mes: "+ v_departrue.substr(5, 2) +"-"+parseInt(mes+1)+", dia: "+v_departrue.substr(8, 2)+"-"+ dia);
            if (v_departrue.substr(5, 2)==parseInt(mes+1) && v_departrue.substr(8, 2)==dia) {
                var numItems = $('.clase_pagina').length;
                nou_elem = $("<div data-role='page' id='page"+(numItems+1)+"' class='clase_pagina'><div data-role='header'><a href='#' data-icon='back'data-rel='back' title='Go back'>Back</a><h1>"+mes_text[mes]+"/"+dia_text[dia_semana]+", "+dia+"</h1></div><div class='ui-content'>"+
                    "<p></p><ul data-role='listview' id='listaBandas"+(numItems+1)+"'></ul></div><!-- end page "+(numItems+1)+" content --><div data-role='footer' data-position='fixed'><h1>"+mes_text[mes]+"/"+dia_text[dia_semana]+", "+dia+"</h1></div><!-- /footer --></div><!-- /page"+mes_text[mes]+"/"+dia_text[dia_semana]+", "+dia+" -->");
                $('#body').append(nou_elem);
                link.style.color = 'forestgreen';
                nou_elem = $("<li><a href='#pageDetalles"+(numItems+1)+"_"+j+"' class='ui-btn ui-btn-icon-right ui-icon-carat-r'>Event "+v_evemts3[j].name+" <button>Detalls</button></a></li>");
                $("#listaBandas"+(numItems+1)).append(nou_elem);
                link.setAttribute('href', '#page'+(numItems+1)); 

                 //pagina detalles
                 nou_elem = $("<div data-role='page' id='pageDetalles"+(numItems+1)+"_"+j+"' class='clase_pagina'><div data-role='header'><a href='#' data-icon='back'data-rel='back' title='Go back'>Back</a><h1>"+mes_text[mes]+"/"+dia_text[dia_semana]+", "+dia+"</h1></div><div class='ui-content'>"+
                    "<p></p><ul data-role='listview' id='listaBandasDetalles"+(numItems+1)+"'></ul></div><!-- end page "+(numItems+1)+" content --><div data-role='footer' data-position='fixed'><h1>"+mes_text[mes]+"/"+dia_text[dia_semana]+", "+dia+"</h1></div><!-- /footer --></div><!-- /page"+mes_text[mes]+"/"+dia_text[dia_semana]+", "+dia+" -->");
                 $('#body').append(nou_elem);
                //poner detalles
                nou_elem = $("<li>"+v_evemts3[j].name+" </li>");
                $("#listaBandasDetalles"+(numItems+1)).append(nou_elem);
                nou_elem = $("<li>Disponible: "+v_evemts3[j].available+" </li>");
                $("#listaBandasDetalles"+(numItems+1)).append(nou_elem);
                nou_elem = $("<li>Ciudad de salida: "+v_evemts3[j].departure[0].depcity+" </li>");
                $("#listaBandasDetalles"+(numItems+1)).append(nou_elem);
                nou_elem = $("<li>País de salida: "+v_evemts3[j].departure[0].depcountry+" </li>");
                $("#listaBandasDetalles"+(numItems+1)).append(nou_elem);
                nou_elem = $("<li>Fecha de salida: "+v_evemts3[j].departure[0].depdate+" </li>");
                $("#listaBandasDetalles"+(numItems+1)).append(nou_elem);
                nou_elem = $("<li>Ciudad de llegada: "+v_evemts3[j].arrive[0].acity+" </li>");
                $("#listaBandasDetalles"+(numItems+1)).append(nou_elem);
                nou_elem = $("<li>País de llegada: "+v_evemts3[j].arrive[0].acountry+" </li>");
                $("#listaBandasDetalles"+(numItems+1)).append(nou_elem);
                nou_elem = $("<li>Fecha de llegada: "+v_evemts3[j].arrive[0].adate+" </li>");
                $("#listaBandasDetalles"+(numItems+1)).append(nou_elem);
                nou_elem = $("<li>Idioma: "+v_evemts3[j].language+" </li>");
                $("#listaBandasDetalles"+(numItems+1)).append(nou_elem);
                nou_elem = $("<li>Personas necesitadas: "+v_evemts3[j].amountpeople+" </li>");
                $("#listaBandasDetalles"+(numItems+1)).append(nou_elem);
            }
        }


       //arrive

       for (var j = v_evemts3.length - 1; j >= 0; j--) {
        var v_departrue = v_evemts3[j].arrive[0].adate;
        //console.log( "mes: "+ v_departrue.substr(5, 2) +"-"+parseInt(mes+1)+", dia: "+v_departrue.substr(8, 2)+"-"+ dia);
        if (v_departrue.substr(5, 2)==parseInt(mes+1) && v_departrue.substr(8, 2)==dia) {
            var numItems = $('.clase_pagina').length;
            nou_elem = $("<div data-role='page' id='page"+(numItems+1)+"' class='clase_pagina'><div data-role='header'><a href='#' data-icon='back'data-rel='back' title='Go back'>Back</a><h1>"+mes_text[mes]+"/"+dia_text[dia_semana]+", "+dia+"</h1></div><div class='ui-content'>"+
                "<p></p><ul data-role='listview' id='listaBandas"+(numItems+1)+"'></ul></div><!-- end page "+(numItems+1)+" content --><div data-role='footer' data-position='fixed'><h1>"+mes_text[mes]+"/"+dia_text[dia_semana]+", "+dia+"</h1></div><!-- /footer --></div><!-- /page"+mes_text[mes]+"/"+dia_text[dia_semana]+", "+dia+" -->");
            $('#body').append(nou_elem);
            link.style.color = 'forestgreen';
            nou_elem = $("<li><a href='#pageDetalles"+(numItems+1)+"_"+j+"' class='ui-btn ui-btn-icon-right ui-icon-carat-r'>Event "+v_evemts3[j].name+" <button>Detalls</button></a></li>");
            $("#listaBandas"+(numItems+1)).append(nou_elem);
            link.setAttribute('href', '#page'+(numItems+1)); 

            //pagina detalles
            nou_elem = $("<div data-role='page' id='pageDetalles"+(numItems+1)+"_"+j+"' class='clase_pagina'><div data-role='header'><a href='#' data-icon='back'data-rel='back' title='Go back'>Back</a><h1>"+mes_text[mes]+"/"+dia_text[dia_semana]+", "+dia+"</h1></div><div class='ui-content'>"+
                "<p></p><ul data-role='listview' id='listaBandasDetalles"+(numItems+1)+"'></ul></div><!-- end page "+(numItems+1)+" content --><div data-role='footer' data-position='fixed'><h1>"+mes_text[mes]+"/"+dia_text[dia_semana]+", "+dia+"</h1></div><!-- /footer --></div><!-- /page"+mes_text[mes]+"/"+dia_text[dia_semana]+", "+dia+" -->");
            $('#body').append(nou_elem);
            //poner detalles
            nou_elem = $("<li>"+v_evemts3[j].name+" </li>");
            $("#listaBandasDetalles"+(numItems+1)).append(nou_elem);
            nou_elem = $("<li>Disponible: "+v_evemts3[j].available+" </li>");
            $("#listaBandasDetalles"+(numItems+1)).append(nou_elem);
            nou_elem = $("<li>Ciudad de salida: "+v_evemts3[j].departure[0].depcity+" </li>");
            $("#listaBandasDetalles"+(numItems+1)).append(nou_elem);
            nou_elem = $("<li>País de salida: "+v_evemts3[j].departure[0].depcountry+" </li>");
            $("#listaBandasDetalles"+(numItems+1)).append(nou_elem);
            nou_elem = $("<li>Fecha de salida: "+v_evemts3[j].departure[0].depdate+" </li>");
            $("#listaBandasDetalles"+(numItems+1)).append(nou_elem);
            nou_elem = $("<li>Ciudad de llegada: "+v_evemts3[j].arrive[0].acity+" </li>");
            $("#listaBandasDetalles"+(numItems+1)).append(nou_elem);
            nou_elem = $("<li>País de llegada: "+v_evemts3[j].arrive[0].acountry+" </li>");
            $("#listaBandasDetalles"+(numItems+1)).append(nou_elem);
            nou_elem = $("<li>Fecha de llegada: "+v_evemts3[j].arrive[0].adate+" </li>");
            $("#listaBandasDetalles"+(numItems+1)).append(nou_elem);
            nou_elem = $("<li>Idioma: "+v_evemts3[j].language+" </li>");
            $("#listaBandasDetalles"+(numItems+1)).append(nou_elem);
            nou_elem = $("<li>Personas necesitadas: "+v_evemts3[j].amountpeople+" </li>");
            $("#listaBandasDetalles"+(numItems+1)).append(nou_elem);
        }
    }

    select_tabla.children[2].children[sem].children[dia_semana].appendChild(link);

    if (dia_semana == 6) { sem = sem + 1; }
}else{

    //link.setAttribute('href', '#page'+(numItems+1)); 
    select_tabla.children[2].children[sem].children[dia_semana].appendChild(link);

    if (dia_semana == 6) { sem = sem + 1; }
}



}
}

function fechaPorDia(año, dia) {
  var date = new Date(año, 0);
  return new Date(date.setDate(dia));
}

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {    
        estructurar(); 
        numerar();
        this.receivedEvent('deviceready'); 
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();