
function criarTabelaAula() {

  var body = document.getElementsByTagName('body')[0];
  var tbl = document.createElement('table');
  tbl.style.width = '80%';
  tbl.setAttribute('border', '1');
  var tbdy = document.createElement('tbody');

  for (var i = 0; i < 31; i++) {

    var tr = document.createElement('tr');

    if (i == 0) {
      var th = document.createElement('th');
      th.appendChild(document.createTextNode("Data"));
      tr.appendChild(th);

      th = document.createElement('th');
      th.appendChild(document.createTextNode("Aulas"));
      tr.appendChild(th);

    } else {
      for (var j = 0; j < 3; j++) {

        var td = document.createElement('td');
        if (j == 0) {
          td.appendChild(document.createTextNode("data "+i));
        }

        if (j == 1) {
          td.appendChild(document.createTextNode("aula: "+i));
        }
        if (j == 2) {
            td.appendChild(document.createTextNode("botao"));
          }
        tr.appendChild(td);

      }
     
    }
    tbdy.appendChild(tr);
  }

  tbl.appendChild(tbdy);
  body.appendChild(tbl);

}


