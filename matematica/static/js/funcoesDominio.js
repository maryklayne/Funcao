var mensagem = ''
var reques = ''

function esconder(){
	//esconder botões
	for (var i = 3; i <= 12; i++) {
	    var variavel = '#ajuda'+ i;
		var resp = i-2;
	    $(variavel).toggle();
	    $('#botao'+resp).toggle();
	    $('#desistir'+resp).toggle();
	}
}
	
function esconderAlerts(id){
	$(id).prop('style',"visibility: hidden; display:none;");
}

$(document).ready(function(){
	var id = '';
//	esconder();



	//$("#alert1").prop('style',"visibility: none; display:block;");

    $('#botaoEnviarFuncao').click(function(){
		//reset();
    	var url = $(this).data('url')
    	var token = $(this).data('token')
    	enviarDado('#funcao','#intervalo',url, token);
    });
    
    //x**3-3*x**2-9*x+7
//	IntersecX (1 + (-1/2 - sqrt(3)*I/2)*(2 + 2*sqrt(15)*I)**(1/3) + 4/((-1/2 - sqrt(3)*I/2)*(2 + 2*sqrt(15)*I)**(1/3)), 1 + 4/((-1/2 + sqrt(3)*I/2)*(2 + 2*sqrt(15)*I)**(1/3)) + (-1/2 + sqrt(3)*I/2)*(2 + 2*sqrt(15)*I)**(1/3), 1 + 4/(2 + 2*sqrt(15)*I)**(1/3) + (2 + 2*sqrt(15)*I)**(1/3))
//IntersecY (0.0, 7.0)
//Pontos criticos (-1, 12), (3, -20)
//Ponto max (-1, -12)
//Ponto min (3, 12)
//Ponto infl (1, -4)



    $('.btn-func').click(function(){
    	var id = $(this).attr('id');

    	if (id == 'botao20'){

			if ($('#campo20').val()==$.parseJSON(mensagem).delta) {
				$('#div20').removeClass('has-error').addClass('has-success');
				$('#campo20').attr("disabled", true);
				$(this).toggle();
				$(this).next().toggle();
				$(this).prev().prev().toggle();
				//proximo
				$('#ajuda21').show();
				$('#botao21').next().show();
				$('#botao21').show();
				$('#campo21').attr('disabled',false);
				$("#alert20").prop('style', "visibility: none; display:none;");
			}else{
				$("#div20").removeClass('has-sucess').addClass('has-error');
				$("#alert20").prop('style', "visibility: none; display:block;");
			}

    	}else if(id = 'botao21'){

    		if ($('#campo21').val()==$.parseJSON(mensagem).delta) {
				$('#div21').removeClass('has-error').addClass('has-success');
				$('#campo21').attr("disabled", true);
				$(this).toggle();
				$(this).next().toggle();
				$(this).prev().prev().toggle();
				//proximo
				$('#ajuda22').show();
				$('#botao22').next().show();
				$('#botao22').show();
				$('#campo22').attr('disabled',false);
				$("#alert21").prop('style', "visibility: none; display:none;");
			}else{
				$("#div21").removeClass('has-sucess').addClass('has-error');
				$("#alert21").prop('style', "visibility: none; display:block;");
			}

    	}
		alert(id);



//    	if (id == 'botao1'){
//			if ($('#campo3').val()==$.parseJSON(mensagem).IntersecX) {
//				$('#div3').removeClass('has-error').addClass('has-success');
//				$('#campo3').attr("disabled", true);
//				$(this).toggle();
//				$(this).next().toggle();
//				$(this).prev().prev().toggle();
//				//proximo
//				$('#ajuda4').show();
//				$('#botao2').next().show();
//				$('#botao2').show();
//				$('#campo4').attr('disabled',false);
//			}else{
//				$('#div3').addClass('has-error');
//				$("#alert3").prop('style', "visibility: none; display:block;");
//			}
//    	}else if (id == 'botao2'){
//			if ($('#campo4').val() ==$.parseJSON(mensagem).IntersecY) {
//				$('#div4').removeClass('has-error').addClass('has-success');
//				$('#campo4').attr("disabled", true);
//
//				$(this).toggle();
//				$(this).next().toggle();
//				$(this).prev().prev().toggle();
//
//				//proximo
//				$('#ajuda5').show();
//				$('#botao3').next().show();
//				$('#botao3').show();
//				$('#campo5').attr('disabled',false);
//			}else{
//				$('#div4').addClass('has-error');
//				$("#alert4").prop('style', "visibility: none; display:block;");
//			}
//    	}else if (id == 'botao3') {
//			if ($('#campo5').val() == $.parseJSON(mensagem).ptnCritico) {
//				$('#div5').removeClass('has-error').addClass('has-success');
//				$('#campo5').attr("disabled", true);
//
//				$(this).toggle();
//				$(this).next().toggle();
//				$(this).prev().prev().toggle();
//
//				//proximo
//				$('#ajuda6').show();
//				$('#botao4').next().show();
//				$('#botao4').show();
//				$('#campo6').attr('disabled',false);
//			}else{
//				$('#div5').addClass('has-error');
//				$("#alert5").prop('style', "visibility: none; display:block;");
//			}
//		}else if (id == 'botao4') {
//			if ($('#campo6').val() == $.parseJSON(mensagem).max) {
//				$('#div6').removeClass('has-error').addClass('has-success');
//				$('#campo6').attr("disabled", true);
//
//				$(this).toggle();
//				$(this).next().toggle();
//				$(this).prev().prev().toggle();
//
//				//proximo
//				$('#ajuda7').show();
//				$('#botao5').next().show();
//				$('#botao5').show();
//				$('#campo7').attr('disabled',false);
//			}else{
//				$('#div6').addClass('has-error');
//				$("#alert6").prop('style', "visibility: none; display:block;");
//			}
//		}else if (id == 'botao5') {
//			if ($('#campo7').val() == $.parseJSON(mensagem).min) {
//				$('#div7').removeClass('has-error').addClass('has-success');
//				$('#campo7').attr("disabled", true);
//
//				$(this).toggle();
//				$(this).next().toggle();
//				$(this).prev().prev().toggle();
//
//				//proximo
//				$('#ajuda8').show();
//				$('#botao6').next().show();
//				$('#botao6').show();
//				$('#campo8').attr('disabled', false);
//			}else{
//				$('#div7').addClass('has-error');
//				$("#alert7").prop('style', "visibility: none; display:block;");
//			}
//		}else if (id == 'botao6') {
//			if ($('#campo8').val() == $.parseJSON(mensagem).pontInfl) {
//				$('#div8').removeClass('has-error').addClass('has-success');
//				$('#campo8').attr("disabled", true);
//
//				$(this).toggle();
//				$(this).next().toggle();
//				$(this).prev().prev().toggle();
//
//				//proximo
//				$('#ajuda9').show();
//				$('#botao7').next().show();
//				$('#botao7').show();
//				$('#botao9').attr('disabled', false);
//			}else{
//				$('#div8').addClass('has-error');
//				$("#alert8").prop('style', "visibility: none; display:block;");
//			}
//		}







    });





    $('.btn-des').click(function(){
    	var resp = '';
    	id = $(this).attr('id');
    	var anterior = $(this).prev().prev().val();
		var cAnterior = '';
    	var cProx = '';
    	var num = 0;
		var div = '';
		var ativar = '';

    	if (id == 'desistir20'){
    		ativar = '#campo21'
    		resp = reques.delta
			cAnterior = '#campo20';
    		cProx = '#botao21';
			div = '#div20';
    		num = 21;

    	}else if (id == 'desistir21'){
    		ativar = '#campo22'
    		resp = reques.raizes
			cAnterior = '#campo21';
    		cProx = '#botao22';
			div = '#div21';
    		num = 22;

    	}


//    	if (id == 'desistir1'){
//			ativar = '#campo4';
//    		resp = $.parseJSON(mensagem).IntersecX;
//    		cProx = '#botao2';
//			cAnterior = '#campo3';
//			div = '#div3';
//    		num = 4;
//
//    	}else if (id == 'desistir2'){
//			ativar = '#campo5';
//    		resp = $.parseJSON(mensagem).IntersecY;
//    		cProx = '#botao3';
//			cAnterior = '#campo4';
//			div = '#div4';
//    		num = 5;
//
//    	}else if (id == 'desistir3') {
//			ativar = '#campo6';
//			resp = $.parseJSON(mensagem).ptnCritico;
//			cProx = '#botao4';
//			cAnterior = '#campo5';
//			div = '#div5';
//			num = 6;
//
//    	}else if (id == 'desistir4') {
//			ativar = '#campo7';
//			resp = $.parseJSON(mensagem).max;
//			cProx = '#botao5';
//			cAnterior = '#campo6';
//			div = '#div6';
//			num = 7;
//
//    	}else if (id == 'desistir5'){
//			ativar = '#campo8';
//    		resp = $.parseJSON(mensagem).min;
//    		cProx = '#botao6';
//			cAnterior = '#campo7';
//			div = '#div7';
//    		num = 8;
//
//    	}else if (id == 'desistir6'){
//			ativar = '#campo9';
//    		resp = $.parseJSON(mensagem).pontInfl;
//    		cProx = '#botao7';
//			cAnterior = '#campo8';
//			div = '#div8';
//    		num = 9;
//
//    	}else if (id == 'desistir7'){
//			ativar = '#campo10';
//    		resp = $.parseJSON(mensagem).pontInfl;
//    		cProx = '#botao8';
//			cAnterior = '#campo9';
//			div = '#div9';
//    		num = 10;
//
//    	}else if (id == 'desistir8'){
//			ativar=='';
//    		resp = $.parseJSON(mensagem).pontInfl;
//    		cProx = '#botao9';
//			cAnterior = '#campo10';
//			div = '#div10';
//    		num = 11;
//
//    	}
//
    	ant = num-1;
		$("#alert"+ant).prop('style', "visibility: none; display:none;");
		$(ativar).attr('disabled',false);
    	$('#ajuda'+ant).toggle();
        $('#ajuda'+num).show();
        $(cAnterior).val(resp).attr('disabled',true);
		$(this).toggle().prev().toggle();
		$(cProx).show();
		$(cProx).next().show();
		$(div).removeClass('has-error').addClass('has-success');
    });

    
});

//function reset(){
//	for (var i = 3 ; i <= 8 ; i++){
//		$('#campo'+i).val('').prop('disabled',true);
//		$('#div'+i).removeClass('has-error');
//		$('#div'+i).removeClass('has-success');
//
//	}
//}

function enviarDado(id_txt, id_txt2, url, token){
      		var botao = $(this)
            var texto = $(id_txt).val();
            var texto2 = $(id_txt2).val();

            var $request=$.ajax({
                method: "POST",
                url: url,
                data: {csrfmiddlewaretoken:token,funcao:texto, intervalo:texto2},
                mimeType:"JSON"
			});



            $request.success(function (msg) {
            	grau = $.parseJSON(msg).grau
				reques = $.parseJSON(msg)
                $('#div1,#div2').remove('has-warning').addClass('has-success');

                if (grau=='segundo grau'){
                	for ( var i = 20 ; i < 23 ; i++){
                		$("#div"+i).prop('style',"visibility: none; display:block;");
                	}


                }

//                for (var i = 1 ; i < 10 ; i++){//apagar os alerts de erro
//                    $("#alert"+i).prop('style',"visibility: hidden; display:none;");
//				}


							mensagem = msg;
                           //alert('IntersecX '+ $.parseJSON(msg).IntersecX + '\nIntersecY '
							//       + $.parseJSON(msg).IntersecY
                        	//	   + '\nPontos criticos '+$.parseJSON(msg).ptnCritico
                        	//	   + '\nPonto max '+$.parseJSON(msg).max
                        	//	   + '\nPonto min '+$.parseJSON(msg).min
							//       + '\nPonto infl '+$.parseJSON(msg).pontInfl
                        	//	   );


                        	//imporante
//							reset();
//							$('#botao1,#desistir1,#ajuda3').show();
//							$('#campo3').attr('disabled',false);

            });

            $request.fail(function( jqXHR, textStatus ) {
          		alert(textStatus)
//				reset();

                if (jqXHR.responseText === 'intervalo invalido'){
                    $("#alert1").prop('style',"visibility: hidden; display:none;");
                    $("#alert2").prop('style',"visibility: hidden; display:none;");
                    $("#alert9").prop('style',"display:block;");
                }


				$('#div1,#div2').remove('has-success').addClass('has-warning');
				if (texto == '') {
					$("#alert1").prop('style', "visibility: none; display:block;");
					$("#alert2").prop('style',"visibility: hidden; display:none;");
					$("#alert9").prop('style',"visibility: hidden; display:none;");

				}else if (texto2 == '') {
					$("#alert2").prop('style', "visibility: none; display:block;");
					$("#alert1").prop('style',"visibility: hidden; display:none;");
					$("#alert9").prop('style',"visibility: hidden; display:none;");

				}
        });



 

}