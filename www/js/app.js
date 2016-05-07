// Initialize your app
var myApp = new Framework7({
    material: true
});

// Export selectors engine
var $$ = Dom7;

var mainView = myApp.addView('.view-main');

$(document).on('click', '[name=btn-adicionar]', function(e) {

     formData = myApp.formToJSON('[name=formCR]');

     if(
        formData.inpCh != ""
        && formData.inpNota != ""
    ) {

        var card = '<div class="card">';
            card += '    <div class="card-content">';
            card += '        <div class="card-content-inner">';
            card += '            <div>';

            if(formData.inpNome != "")
                card += '                <h5 style="display: inline; margin:0px" name="DISCIPLINA">'+formData.inpNome+'</h5>';
            else
                card += '                <h5 style="display: inline; margin:0px" name="DISCIPLINA">Sem nome</h5>';

            card += '                <div style="float:right; font-weight: bold" onclick="$(this).closest(\'.card\').fadeOut(\'fast\', function() { $(this).remove(); $(\'[name=btn-resultado]\').trigger(\'click\'); })">';
            card += '                    X';
            card += '                </div>';
            card += '            </div>';
            card += '           <p class="color-gray" style="font-size:18px">';
            card += '                Cálculo: <span name="NOTA">'+formData.inpNota+'</span> * <span name="CH">'+formData.inpCh+'</span> = <span name="CR">'+ formData.inpNota * formData.inpCh +'</span>';
            card += '            </p>';
            card += '        </div>';
            card += '    </div>';
            card += '</div>';

        $('.cards').append(card);

        $("[name=inpNome]").val('').focus();
        $("[name=inpCh]").val('');
        $("[name=inpNota]").val('');

    } else {
        myApp.addNotification({
            message: 'Informe CH e Nota',
            button: {
                text: 'Fechar',
            }
        });
    }

});

$(document).on('click', '[name=btn-resultado]', function(e) {
    
    var SOMACR    = 0,
        SOMACH    = 0,
        NOTAFINAL = 0;

    cards = $('.card').not('.no');

    if($(".final").length > 0)
        $(".final").remove();

    if(cards.length > 0) {
        
        $.each(cards, function(index, value) {
            nota = parseFloat($(value).find('[name=NOTA]').text());
            ch   = parseFloat($(value).find('[name=CH]').text());

            SOMACR += nota * ch;
            SOMACH += ch;
        });

        NOTAFINAL = SOMACR/SOMACH;

        var result  = '<div class="card no final">';
            result += '    <div class="card-content">';
            result += '       <div class="card-content-inner">';
            result += '           Cálculo: '+SOMACR+'/'+SOMACH+' = '+NOTAFINAL.toFixed(2);
            result += '       </div>';
            result += '    </div>';
            result += '</div>';

        $('.no').before(result);
        
    } else {
        myApp.addNotification({
            message: 'Informe as disciplinas',
            button: {
                text: 'Fechar',
            }
        });
    }
    
});