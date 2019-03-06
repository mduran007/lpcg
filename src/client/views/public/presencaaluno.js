var arrayAlunos = ["Zoé", "Liz", "Ayla", "Maitê", "Olívia", "Pérola", "Agnes", "Lis", "Lia", "Aisha", "Jade", "Elisa", "Helena", "Cecília", "Agatha"];

function criarTabelaAluno() {

  var body = document.getElementsByTagName('body')[0];
  var tbl = document.createElement('table');
  tbl.style.width = '80%';
  tbl.setAttribute('border', '1');
  var tbdy = document.createElement('tbody');

  for (var i = 0; i < 31; i++) {

    var tr = document.createElement('tr');

    if (i == 0) {
      var th = document.createElement('th');
      th.appendChild(document.createTextNode("N"));
      tr.appendChild(th);

      th = document.createElement('th');
      th.appendChild(document.createTextNode("Nome do aluno"));
      tr.appendChild(th);

      th = document.createElement('th');
      th.appendChild(document.createTextNode("Presenca"));
      tr.appendChild(th);

    } else {
      for (var j = 0; j < 3; j++) {

        var td = document.createElement('td');
        if (j == 0) {
          td.appendChild(document.createTextNode(i));
        }

        if (j == 1) {
          td.appendChild(document.createTextNode(arrayAlunos[i-1]));
        }

        if (j == 2) {

          var input = document.createElement("INPUT");
          input.setAttribute('type', 'checkbox');
          td.appendChild(input);

        }
        tr.appendChild(td);

      }
     
    }
    tbdy.appendChild(tr);
  }

  tbl.appendChild(tbdy);
  body.appendChild(tbl);

}


