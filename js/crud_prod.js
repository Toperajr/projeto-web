$(function(){
    var operacao = "A"; //"A"=adicionar; "E"=editar
    var indice_selecionado = -1; //Índice do item selecionado na lista
    var tbClientes = localStorage.getItem("tbClientes");// Recupera os dados armazenados
    tbClientes = JSON.parse(tbClientes); // Converte string para objeto

		if(tbClientes == null){ // Caso não haja conteúdo, inicia-se um vetor vazio para o storage local
	    tbClientes = [];
		}

		$("#frmCadastro").on("submit",function(){
			if(operacao == "A"){
			    return Adicionar(tbClientes);
			}else{
			    return Editar(tbClientes,indice_selecionado);
			}
		});

		Listar(tbClientes);

        //função para editar
		$("#tblListar").on("click", "#btnEditar", function(){
	    operacao = "E";
	    indice_selecionado = parseInt($(this).attr("value"));
		var cli = JSON.parse(tbClientes[indice_selecionado]);
	    $("#txtCodigo").val(cli.Codigo);
	    $("#txtNome").val(cli.Nome);
	    $("#txtValor").val(cli.Valor);
	    $("#txtEmail").val(cli.Email);
		$("#txtCodigo").attr("readonly","readonly");
		$("#txtNome").focus();
		});

        //função para excluir
		$("#tblListar").on("click", "#btnExcluir",function(){
	    indice_selecionado = parseInt($(this).attr("alt"));
			Excluir(tbClientes, indice_selecionado);
	    Listar(tbClientes);
		});
});

function Adicionar(tbClientes){

		var cliente = JSON.stringify({
        Codigo   : $("#txtCodigo").val(),
        Nome     : $("#txtNome").val(),
        Valor    : $("#txtValor").val(),
        Email    : $("#txtEmail").val()
    });
    tbClientes.push(cliente);
		console.log("tbClientes - " + tbClientes);
    localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
    alert("Registro adicionado.");
    return true;
}

function Editar(tbClientes,indice_selecionado){
    tbClientes[indice_selecionado] = JSON.stringify({
            Codigo   : $("#txtCodigo").val(),
            Nome     : $("#txtNome").val(),
            Valor : $("#txtValor").val(),
            Email    : $("#txtEmail").val()
        });//Altera o item selecionado na tabela
    localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
    alert("Informações editadas.")
    operacao = "A"; //Volta ao padrão
    return true;
}

function Excluir(tbClientes, indice_selecionado){
    if (confirm('Deseja deletar este produto?')) {
    tbClientes.splice(indice_selecionado, 1);
    localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
    alert("Registro excluído.");
    }
}

function Listar(tbClientes){
    $("#tblListar").html("");
    $("#tblListar").html(
        "<thead class='thead-dark' >"+
        "   <tr>"+
        "   <th>ID</th>"+
        "   <th>Produto</th>"+
        "   <th>Valor</th>"+
        "   <th>Marca</th>"+
        "   <th style='max-width: 45px'>Opções</th>"+
        "   </tr>"+
        "</thead>"+
        "<tbody>"+
        "</tbody>"
        );
    for(var i in tbClientes){
        var cli = JSON.parse(tbClientes[i]);
        $("#tblListar tbody").append("<tr>");
        $("#tblListar tbody").append("<td id='centro'>"+cli.Codigo+"</td>");
        $("#tblListar tbody").append("<td align ='right'>"+cli.Nome+"</td>");
        $("#tblListar tbody").append("<td align ='right'>"+cli.Valor+"</td>");
        $("#tblListar tbody").append("<td align ='right'>"+cli.Email+"</td>");
        $("#tblListar tbody").append("<td align ='left'><button class='btn btn-outline-primary  btn-sm' id='btnEditar' value='"+i+"'>Editar</button> &nbsp"+
        "<button class='btn btn-outline-danger  btn-sm' id='btnExcluir' value='"+i+"'>Excluir</button></td>");
        $("#tblListar tbody").append("</tr>");
    }
}