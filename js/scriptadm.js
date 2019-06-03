function check(form) {
  if (form.Login.value === "dev" && form.password === "1123") {
    window.open('www.google.com')
  } else {
    alert("errado")
  }
}

//Search
$(document).ready(function() {
  $("#Search").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#dataTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});
//Converte a data
function timeconvert(ds) {
  var D, dtime, T, tz, off,
    dobj = ds.match(/(\d+)|([+-])|(\d{4})/g);
  T = parseInt(dobj[0]);
  tz = dobj[1];
  off = dobj[2];
  if (off) {
    off = (parseInt(off.substring(0, 2), 10) * 3600000) +
      (parseInt(off.substring(2), 10) * 60000);
    if (tz == '-') off *= -1;
  } else off = 0;
  return new Date(T += off).toUTCString();
}

function exibirResultado(id, dados) {
  console.log(typeof dados === 'object')
  console.log(typeof dados === 'string')
  console.log(typeof dados === 'array')
  console.log(dados)

  //texto.forEach(function (o,index) {
  //console.log(o.CpfUsuario)
}

$(document).ready(function() {
  $.ajax({
    url: 'http://localhost:56795/BibliotecaService.svc/ListarAluguel',
    method: "GET",
    crossDomain: true,
    success: function(data) {
      exibirResultado('abc', data);
      $(data.ListarAluguelResult).each(function(index, value) {
        var record = "<tr><td>" + value.Id_Aluguel + "</td><td>" + value.Usuario.CpfUsuario + "</td><td>" + value.Livro.CodLivro + "</td><td>" +
          timeconvert(value.DtEmprestimo) + "</td><td>" + timeconvert(value.DtEntrega) + "</td><td>" + value.Valor + "</dt></tr>";
        $("Table").append(record);
      });
    },
    error: function(err) {
      alert(err);
      console.log('erro');

    }
  });
});


function confirmarDevolucao() {
  var id = document.getElementById("Confirmar").value;
  var myObj = {
    "Id_Aluguel": id
  };
  var jsondata = JSON.stringify(myObj);
  $.ajax({
    type: "POST",
    url: "http://localhost:56795/BibliotecaService.svc/ConfirmarEntrega",
    data: jsondata,
    dataType: "json",
    success: function() {
      alert('pop the champagne');
    }
  });
}
