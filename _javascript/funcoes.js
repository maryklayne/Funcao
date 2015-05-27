vari="";

function enviarFuncao(valor){
	if (valor=="botaoDominio"){
		$("#itr_X").prop('readOnly',false);
		$("#botaoItrX").prop('disabled',false);
	}else if(valor=="botaoItrX"){
		$("#itr_Y").prop('readOnly',false);
		$("#botaoItrY").prop('disabled',false);
	}else if(valor=="botaoItrY"){
		$("#pontos_criticos").prop('readOnly',false);
		$("#botaoPontoCritico").prop('disabled',false);
	}else if(valor=="botaoPontoCritico"){
		$("#maximo").prop('readOnly',false);
		$("#botaoMaximo").prop('disabled',false);
	}else if(valor=="botaoMaximo"){
		$("#minimo").prop('readOnly',false);
		$("#botaoMinimo").prop('disabled',false);
	}else if(valor=="botaoMinimo"){
		$("#pontos_de_inflexao").prop('readOnly',false);
		$("#botaoPtInflexao").prop('disabled',false);
	}else{
		$("#concavidade").prop('readOnly',false);
		$("#botaoConcavidade").prop('disabled',false);
	}
}


$(document).ready(function(){
    $('.btn-func').click(function(){
        enviarFuncao($(this).attr('id'));
        if (($(this).attr('id')!="botaoDominio")
        ){
        	$(this).hide(1000);
    	}
    });
});

//function enviarFuncao(valor){
//	var campo = document.getElementById(valor.id).value;
//	if (valor.id=="funcao"){
//		ativar("dominio_funcao");
//	}else if(valor.id=="dominio_funcao"){			
//		alert("entrou no 2");
//		ativar("itr_X");
//	}else if(valor.id=="itr_X"){		
//		//alert("entrou no 3");
//		ativar("itr_Y");
//	}else if(valor.id=="itr_Y"){		
//		alert("entrou no 4");
//		ativar("pontos_criticos");
//	}else if(valor.id=="pontos_criticos"){		
//	//	alert("entrou no 4");
//	//	ativar("pontos_criticos");
//	}
//}
//
//
//function ativar(valor){
//	document.getElementById(valor).readOnly=false;
//	if(valor=="dominio_funcao"){		
//		document.getElementById("botaoDominio").disabled=false;
//	}else if(valor=="itr_X"){
//		document.getElementById("botaoItrX").disabled=false;
//	}else if(valor=="itr_Y"){
//		document.getElementById("botaoItrY").disabled=false;
//	}
//}
