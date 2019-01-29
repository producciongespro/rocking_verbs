var pantalla = 0;
var a,b,c,ulLetra,ulLetra2;
function Controlador(ruta) {
  Controlador.vista = new Vista();
  Controlador.listaEtiquetas=[];
  Controlador.listaVerbos=[];
  Controlador.tiemposVerbales=[];
  Controlador.listaCanciones=[];
  Controlador.completar=[];
  Controlador.seleccionar=[];
  Controlador.nivel;
  Controlador.verbo;
  Controlador.cancion;
    audio = new Audio();

  // Controlador.objetoSeleccionado;
  Controlador.objetoObjetivo;
  $.getJSON( ruta, function( data ) {
      Controlador.mainArray = data;
      Controlador.prototype.cargarEtiquetas();
    });
}

Controlador.prototype.cargarEtiquetas = function () {
maxEtiquetas = Controlador.mainArray.webApp[1].iconos.length;
  for (var i = 0; i < maxEtiquetas; i++) {
    Controlador.listaEtiquetas[i]=Controlador.mainArray.webApp["1"].iconos[i];
      }
  pantalla = 1;
};

Controlador.prototype.cargarVerbos = function () {
maxVerbos = Controlador.mainArray.webApp["0"].niveles[Controlador.nivel].verbos.length;
  for (var i = 0; i < maxVerbos; i++) {
    Controlador.listaVerbos[i]=Controlador.mainArray.webApp["0"].niveles[Controlador.nivel].verbos[i].verbo[0];
  }
};

Controlador.prototype.verDetalle = function () {
          for (var i = 0; i < 4; i++) {
          Controlador.tiemposVerbales[i]=Controlador.mainArray.webApp["0"].niveles[Controlador.nivel].verbos[Controlador.verbo].verbo[i];
          }
    };

Controlador.prototype.cPortada = function (img) {
  this.img = img;
  Controlador.vista.vPortada(this.img, "img-portada");
};

Controlador.prototype.cMenu = function () {
  aciertos=0;
  Controlador.vista.vEncabezado("img/logo.png","<img style='margin-left:20%; margin-top:-15px; width:10%' src='img/icons/configurar.png' onClick='Controlador.prototype.cModal()'>","img/icons/Info.png");
  Controlador.vista.vBotones("Levels",Controlador.listaEtiquetas, "botones-menu");
  this.cManejadorEventoClic("botones-menu",this.cPantallas);
};


Controlador.prototype.cMenuKaraoke = function () {
  pantalla = 3;
  Controlador.vista.vEncabezado("img/logo.png","","img/icons/Info.png");
  Controlador.vista.vMenuKaraoke("Karaoke","botones-karaoke","Sing and Practice Verbs within these songs");
  this.cManejadorEventoClic("botones-karaoke",this.cPantallas);
  Controlador.vista.vPiePantalla("","img/icons/home.PNG","");

};

Controlador.prototype.cDetalleKaraoke = function () {
  icono = "<img src=>"
  tituloCancion = Controlador.mainArray.webApp["2"].canciones[Controlador.cancion-1].titulo;
  interpreteCancion = Controlador.mainArray.webApp["2"].canciones[Controlador.cancion-1].artista;
  detalleCancion = Controlador.mainArray.webApp["2"].canciones[Controlador.cancion-1].descripcion;
  enlace1 = Controlador.mainArray.webApp["2"].canciones[Controlador.cancion-1].url1;
  enlace2 = Controlador.mainArray.webApp["2"].canciones[Controlador.cancion-1].url2;
  Controlador.vista.vEncabezado("img/logo.png","","img/icons/Info.png");
  Controlador.vista.vDetalleKaraoke("Karaoke",tituloCancion,interpreteCancion,detalleCancion,enlace1,enlace2,"explicaciones");
  pantalla = 5;
  this.cManejadorEventoClic("botones-karaoke",this.cPantallas);
  Controlador.vista.vPiePantalla("img/icons/Izquierda-T.png","img/icons/home.PNG","");
};

Controlador.prototype.cCreditos = function () {
  textoCreditos= "<strong>Author:</strong> "+Controlador.mainArray.webApp["3"].creditos[0].Author+"<br>";
  textoCreditos+= "<strong>Developers:</strong> "+Controlador.mainArray.webApp["3"].creditos[0].Developers+"<br>";
  textoCreditos+= "<strong>Graphic Designer:</strong> "+Controlador.mainArray.webApp["3"].creditos[0].Graphic_Designer+"<br>";
  textoCreditos+= "<strong>Audio recording:</strong> "+Controlador.mainArray.webApp["3"].creditos[0].Audio_recording+"<br>";
  textoCreditos+= "<strong>Voice:</strong> "+Controlador.mainArray.webApp["3"].creditos[0].Voice+"<br>";
  Controlador.vista.vCreditos("Credits",textoCreditos);
  Controlador.vista.vPiePantalla("","img/icons/home.PNG","");

  pantalla=6;
};


Controlador.prototype.cSubMenu = function () {
  this.cargarVerbos();
  Controlador.vista.vEncabezado("","Level "+(Controlador.nivel/2+1),"");
  Controlador.vista.vPiePantalla("","img/icons/home.PNG","img/icons/practicaBloqueada.png");
  Controlador.vista.vSubMenu(Controlador.listaVerbos, "botones-verbos");
  pantalla = 2;
  this.cManejadorEventoClic("botones-verbos",this.cPantallas);

};


Controlador.prototype.cAudios = function() {
  var cual = $(this).attr('id').charAt($(this).attr('id').length-1);
  if (cual < 3) {

    textoASonar = minusculaPrimera(comprueba(Controlador.mainArray.webApp["0"].niveles[Controlador.nivel].verbos[Controlador.verbo].verbo[cual]));
    if (textoASonar=="read" && cual == 0) {Audio.prototype.vAudios("audios/readp.mp3");}
else {
  Audio.prototype.vAudios("audios/"+textoASonar+'.mp3');
  }  }
  else {
    var nuevo = '#verbo'+cual;
    $(nuevo).text(Controlador.mainArray.webApp["0"].niveles[Controlador.nivel].verbos[Controlador.verbo].verbo[cual]);
    setTimeout(function() {
        $(nuevo).text("Meaning");
}, 2000);
    }
};

Controlador.prototype.cDetalleVerbo = function () {
  Controlador.vista.vEncabezado("","Level "+(Controlador.nivel/2+1),"img/icons/On-T.png");
  Controlador.prototype.verDetalle();
  Controlador.vista.vDetalleVerbo(Controlador.tiemposVerbales, "detalle-verbos");
  $("#verbo0").click(Controlador.prototype.cAudios);
  $("#verbo1").click(Controlador.prototype.cAudios);
  $("#verbo2").click(Controlador.prototype.cAudios);
  $("#verbo3").click(Controlador.prototype.cAudios);
  Controlador.vista.vPiePantalla("img/icons/Izquierda-T.png","img/icons/home.PNG","");
};


Controlador.prototype.cModal = function () {
    Controlador.vista.vModal("Configuración");
};

Controlador.prototype.cEliminarPantalla = function () {
    $("#contenedor").remove();
    var objContenedor = $("<div></div>");
    $(objContenedor).attr("id","contenedor");
    $(objContenedor).css("display","none");
    $("#cuerpo").append(objContenedor);
    $("#contenedor").fadeIn(500);
};



Controlador.prototype.cManejadorEventoClic = function (clase, metodo) {
  this.clase = clase;
  this.metodo = metodo;
  if (pantalla == 1) {
  $("img").click(function(){
          Controlador.nivel = (this.id.charAt(5)-1)*2;});
      }
  if (pantalla == 2) {
    $("button").click(function(){
          Controlador.verbo = this.id.charAt(3);});
  }
  if (pantalla == 3) {
    $("img").click(function(){
    Controlador.cancion = this.id.charAt(7);});
    pantalla=4;
  }

  if (pantalla == 4) {
  }

  if (pantalla == 5) {
  }

  if (pantalla ==6) {

  }

  if (pantalla ==7) {
  }

  $("."+this.clase).click(this.metodo);

};

Controlador.prototype.cPantallas = function () {
    Controlador.prototype.cEliminarPantalla();
    document.addEventListener("deviceready", onDeviceReady, false);
        function onDeviceReady() {
            document.addEventListener("backbutton", function (e) {
                e.preventDefault();
            }, false );
    }

    var opcion = pantalla;
    switch (pantalla) {
      case 1:
        Controlador.prototype.irSubMenu();
      break;
      case 2:
        Controlador.prototype.irDetalle();
      break;
      case 3:
        Controlador.prototype.irMenuKaraoke();
      break;
      case 4:
        Controlador.prototype.irDetalleKaraoke();
      break;
      case 5:
        Controlador.prototype.irAModal();
      break;
      case 6:
        Controlador.prototype.irACreditos();
      break;
      case 7:

        Controlador.prototype.irAActividades();
      break;
          default:

    }

  };

Controlador.prototype.irMenu = function () {
    Controlador.prototype.cEliminarPantalla();
    Controlador.prototype.cMenu();
};

Controlador.prototype.irMenuKaraoke = function(){
  Controlador.prototype.cEliminarPantalla();
  Controlador.prototype.cMenuKaraoke();
};

Controlador.prototype.irDetalleKaraoke = function(){
  Controlador.prototype.cEliminarPantalla();
  Controlador.prototype.cDetalleKaraoke();
};

Controlador.prototype.irACreditos = function(){
  Controlador.prototype.cEliminarPantalla();
  Controlador.prototype.cCreditos();
};

Controlador.prototype.irSubMenu = function () {
    Controlador.prototype.cEliminarPantalla();
    Controlador.prototype.cSubMenu();
};

Controlador.prototype.irDetalle = function () {
    Controlador.prototype.cEliminarPantalla();
    Controlador.prototype.cDetalleVerbo();
};

Controlador.prototype.irAModal = function () {
    // Controlador.prototype.cEliminarPantalla();
    Controlador.prototype.cModal();
};

Controlador.prototype.irAActividades = function () {
      Controlador.prototype.cEliminarPantalla();
  Controlador.prototype.cActividades(Controlador.nivel);
};

Controlador.prototype.sonarAudios = function () {
  Controlador.prototype.cAudios = function () {
  };
};

Controlador.prototype.cComparar = function (elemento1,elemento2) {
  if (elemento1== elemento2)
  {

  } else {

  }
};

Controlador.prototype.cActividades = function (tipo) {
  switch (tipo) {
    case 1:
      {
        Controlador.prototype.actividadCompletar(1);
      }
      break;
    case 2:
      {
        Controlador.prototype.actividadSeleccionar(2);
      }
      break;
      case 3:
        {
          Controlador.prototype.arrastrar(5,"Drag the correct form of the verb to complete the sentence.")
        }
        break;

      case 4:
        {
          Controlador.prototype.arrastrar(7,"Choose the correct verb for the corresponding picture.")
        }
        break;

        case 5:
          {
            Controlador.prototype.actividadCompletar(5);
          }
          break;

        case 6:
          {
            Controlador.prototype.actividadSeleccionar(6);
          }
          break;

    default:

  }

  // })
  pantalla=7;
};

Controlador.prototype.actividadCompletar = function (nivel) {
if (nivel == 1) {
    Controlador.completar = Controlador.mainArray.webApp["0"].niveles[nivel].actividades;
  }
  if (nivel == 5) {
      Controlador.completar = Controlador.mainArray.webApp["0"].niveles[nivel+4].actividades;
    }
    Vista.prototype.vEncabezado("img/icons/llave-M.png","Level "+(nivel),"");
      Controlador.vista.vPiePantalla("img/icons/Izquierda-T.png","img/icons/home.PNG","img/icons/llave-inactiva.png");
    Vista.prototype.vCompletar();

};


Controlador.prototype.actividadSeleccionar = function (nivel) {
  if (Controlador.nivel == 2) {
    Controlador.seleccionar = Controlador.mainArray.webApp["0"].niveles[nivel+1].actividades;
    }
  if (Controlador.nivel == 10) {
    Controlador.seleccionar = Controlador.mainArray.webApp["0"].niveles[nivel+5].actividades;
  }
    Vista.prototype.vEncabezado("img/icons/llave-M.png","Level "+(nivel),"");
    Vista.prototype.vSeleccionar();
    Controlador.vista.vPiePantalla("img/icons/Izquierda-T.png","img/icons/home.PNG","img/icons/llave-inactiva.png");
};

Controlador.prototype.arrastrar = function (actividad, indicaciones) {
  if (Controlador.nivel == 4) {
  Controlador.vista.vEncabezado("img/icons/llave-M.png","Level 3","");}
  if (Controlador.nivel == 6) {
    Controlador.vista.vEncabezado("img/icons/llave-M.png","Level 4","");}
    Controlador.vista.vPiePantalla("img/icons/Izquierda-T.png","img/icons/home.PNG","img/icons/llave-inactiva.png");
  Controlador.vista.vActividadDrag(Controlador.mainArray.webApp["0"].niveles[actividad].actividades,5,indicaciones);
  Controlador.vista.vActividadDrop(Controlador.mainArray.webApp["0"].niveles[actividad].actividades.imagen);
  Controlador.prototype.cActivarDrapDrop();


};

  Controlador.prototype.cActivarDrapDrop = function () {
    //Activa las propiedades Drag and Drop de los elementos respectivos

    $(".arrastrable").draggable({

          containment: '#espacioArrastrable', scroll: false, start: function (event, ui) {
            Controlador.objetoSeleccionado = event.target.id;
        }

        });


    $(".soltable").droppable({
          drop: function (event, ui ) {
              posible= event.target.id;
              if (Controlador.nivel == 4) {palabraAEvaluar = palabraCorrecta}
              if (Controlador.nivel == 6) {palabraAEvaluar = posible}
               if (Controlador.objetoSeleccionado== palabraAEvaluar) {
                 document.getElementById('vacio').style.color = 'green';
                 document.getElementById('vacio').innerHTML = palabraAEvaluar+" ";
                  document.getElementById('correct').play();
                 document.getElementById('vacio').innerHTML = palabraAEvaluar.bold()+" <span class='glyphicon glyphicon-ok'> ";
            }
            else{
                if (Controlador.nivel == 4) {
                document.getElementById('vacio').innerHTML = Controlador.objetoSeleccionado+" ";
                document.getElementById('vacio').style.color = 'red';
                document.getElementById('vacio').innerHTML = Controlador.objetoSeleccionado.bold()+"<span class='glyphicon glyphicon-remove'> ";}
                document.getElementById('wrong').play();
            }
              document.getElementById(Controlador.objetoSeleccionado).style.display = 'none';
              deshabilitar();
          }
        });
  }

function comprueba(palabra){
var contenido=""
for (var i = 0; i < palabra.length; i ++){
contenido += (palabra.charAt(i) == " " || palabra.charAt(i) == "/"  || palabra.charAt(i) == "'" ) ? "-" : palabra.charAt(i);

}//fin del for
return contenido;
}

function minusculaPrimera(string){
  return string.charAt(0).toLowerCase() + string.slice(1);
}

function pasarAMinuscula(string) {
  return string.toLowerCase();
}
