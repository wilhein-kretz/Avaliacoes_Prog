$(function() {

  function showAgropecuarias() {
      $.ajax({
          url: "http://localhost:5000/agropecuarias",
          method: "GET",
          dataType: "json", 
          success: listAgropecuarias, 
          error: function() {
              alert("Erro, verifique o backend");
          },
      });

      function listAgropecuarias(agropecuarias) {
          $("#tableBody").empty();
          showContent("tabela_agropecuaria");
          for (agropecuaria of agropecuarias) {
              var newRow = `<tr id="line_${agropecuaria.id}"> 
                              <td>${agropecuaria.nome}</td> 
                              <td>${agropecuaria.endereco}</td> 
                              <td>${agropecuaria.telefone}</td> 
                              <td>
                                  <a href="#" id="delete_${agropecuaria.id}" class="deletar_agropecuaria" title="Excluir Agropecuária">
                                          deletar
                                  </a>
                              </td>
                            </tr>`;
              $("#tableBody").append(newRow);
          }
      }
  }

  function showContent(nextPage) {
      $("#inicio").addClass("d-none");
      $("#tabela_agropecuaria").addClass("d-none");
      $("#tabela_clientes").addClass("d-none");
      $("#tabela_produtos").addClass("d-none");
      $(`#${nextPage}`).removeClass("d-none");
  }

  $("#link-listar").click(function() {
      showAgropecuarias();
  });

  $("#link-inicial").click(function() {
      showContent("inicio");
  });

  $("#nav-brand").click(function() {
      showContent("inicio");
  });

  $(document).on("click", "#btn-incluir", function() {
      const nome = $("#campo-nome").val();
      const endereco = $("#campo-endereco").val();
      const telefone = $("#campo-telefone").val();

      const agropecuariaData = JSON.stringify({
          nome: nome,
          endereco: endereco,
          telefone: telefone,
      });

      $.ajax({
          url: "http://localhost:5000/criar_agropecuaria",
          type: "POST",
          dataType: "json",
          contentType: "application/json",
          data: agropecuariaData,
          success: createdAgropecuaria,
          error: createdAgropecuariaError,
      });

      function createdAgropecuaria(resposta) {
          if (resposta.result == "ok") {
              $("#campo-nome").val("");
              $("#campo-endereco").val("");
              $("#campo-telefone").val("");
              showAgropecuarias();
              alert("Agro adicionada com sucesso");
              $(".close").click();

          } else {
              alert(resposta.result + ':' + resposta.details);
          }
      }

      function createdAgropecuariaError(resposta) {
          alert("Erro na chamada do back-end");
      }
  });

  $('#modal-incluir').on('hidden.bs.modal', function(e) {
      if (!$('#tabela_agropecuaria').hasClass('invisible')) {
          showAgropecuarias();
      }
  });

  showContent("inicio");

  $(document).on("click", ".deletar_agropecuaria", function() {
      var component = $(this).attr("id");

      var icon_name = "delete_";
      var agropecuaria_id = component.substring(icon_name.length);

      $.ajax({
          url: 'http://localhost:5000/deletar_agropecuaria/' + agropecuaria_id,
          type: "DELETE",
          dataType: "json",
          success: deletedAgropecuaria,
          error: deletedAgropecuariaError
      });

      function deletedAgropecuaria(retorno) {
          if (retorno.result == "ok") {
              $('#line_' + agropecuaria_id).fadeOut(1000, function() {
                  alert("Agro Removida com Sucesso!");
                  showAgropecuarias();
              });
          } else {
              alert(`${retorno.result}: ${retorno.details}`);
          }
      }

      function deletedAgropecuariaError(response) {
          alert("Erro ao excluir, verifique o Backend!");
      }
  });

  function listar_clientes() {
    $.ajax({
        url: 'http://localhost:5000//listar_clientes',
        method: 'GET',
        dataType: 'json',
        success: listar, 
        error: function(problema) {
            alert("Erro ao ler dados, verifique o backend: ");
    }

    });
        function listar (clientes_cadastrados) {
            $('#corpoTabelaClientesCadastrados').empty();
            showContent("tabela_clientes");       
            for (var i in clientes_cadastrados) { 
                lin = '<tr id="linha_cliente_'+clientes_cadastrados[i].id+'">' + 
                '<td>' + clientes_cadastrados[i].agropecuaria.nome + '</td>' + 
                '<td>' + clientes_cadastrados[i].nome + '</td>' +    
                '</tr>';
                $('#corpoTabelaClientesCadastrados').append(lin);
            }
        }
    }

    $(document).on("click", "#ListarClientesCadastrados", function() {
        listar_clientes();
    });

    function listar_produtos() {
        $.ajax({
            url: 'http://localhost:5000//listar_produtos',
            method: 'GET',
            dataType: 'json',
            success: listar, 
            error: function(problema) {
                alert("erro ao ler dados, verifique o backend: ");
            }

    }); 
        function listar (produtos_cadastrados) {
            $('#corpoTabelaProdutosCadastrados').empty();
            showContent("tabela_produtos");       
            for (var i in produtos_cadastrados) { 
                lin = '<tr id="linha_produto_'+produtos_cadastrados[i].id+'">' + 
                '<td>' + produtos_cadastrados[i].agropecuaria.nome + '</td>' + 
                '<td>' + produtos_cadastrados[i].nome + '</td>' +   
                '</tr>';
                $('#corpoTabelaProdutosCadastrados').append(lin);
            }
        }
    }

    $(document).on("click", "#ListarProdutosCadastrados", function() {
        listar_produtos();
    });

});