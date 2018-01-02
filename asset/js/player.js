/**
 *  Player js
 *  @author: Andreacw
 */

function searchByPlayer() {

    $('#mainsearchpage').attr('hidden',true);

    var user = $('#searchinput').val();

    $.ajax({
        url: playerDatabase,
        type: 'GET',
        timeout: 1500,
        contentType: 'json',
        data: {
            q: user
        }
    }).done(function (data) {

        if(data.length > 1){

            console.log(data);
            $('#playermultyresult').removeAttr('hidden');

        }else if(data.length === 1){

            console.log(data);
            showUser(data);

        }else{

            console.log("no result");

            $('#noresult').removeAttr('hidden');
        }

    }).fail(function () {

    });


}

/**
 *  In caso di un solo risultato compongo la visualizzazione del giocatore.
 */

function showUser(data) {

    $('#playersearchview').removeAttr('hidden');

    // Dati vari
    $('#usernameplace').html(data[0].name);
    $('#playeridplace').html(data[0].playerid);
    $('#userbankacc').html(data[0].bankacc);
    $('#usercash').html(data[0].cash);
    $('#useralias').html(data[0].aliases);

    // In base al livello donatore inserisco le stelle
    var donorlevel;

    switch(data[0].donorlevel) {
        case "1":
            donorlevel = $('<i class="fa fa-star"></i>');
            break;
        case "2":
            donorlevel = $('<i class="fa fa-star"></i><i class="fa fa-star"></i>');
            break;
        case "3":
            donorlevel = $('<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>');
            break;
        case "4":
            donorlevel = $('<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>');
            break;
        case "5":
            donorlevel = $('<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>');
            break;
        case "6":
            donorlevel = $('<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>');
            break;
        default:
            donorlevel = "Nessuno";
    }

    $('#userdonorlevel').html(donorlevel);

    // In base al livello cop del giocatore metto il nome del grado
    var copnamelevel;

    switch(data[0].coplevel){
        case "1":
            copnamelevel = " Agente - Livello 1";
            break;
        case "2":
            copnamelevel = " Agente Scelto - Livello 2";
            break;
        case "3":
            copnamelevel = " Assistente - Livello 3";
            break;
        case "4":
            copnamelevel = " Assistente Capo - Livello 4";
            break;
        case "5":
            copnamelevel = " Sovrintendente - Livello 5";
            break;
        case "6":
            copnamelevel = " Sovrintendente Capo - Livello 6";
            break;
        case "7":
            copnamelevel = " Ispettore - Livello 7";
            break;
        case "8":
            copnamelevel = " Ispettore Capo - Livello 8";
            break;
        case "9":
            copnamelevel = " Commissario - Livello 9";
            break;
        case "10":
            copnamelevel = " Questore - Livello 10";
            break;
        default:
            copnamelevel = " Nessuno";
    }

    $('#usercoplevel').html(copnamelevel);

    // In base al livello med del giocatore metto il nome del grado
    var mediclevelname;

    switch(data[0].mediclevel){
        case "1":
            mediclevelname = " Medico - Livello 1";
            break;
        case "2":
            mediclevelname = " Medico - Livello 2";
            break;
        case "3":
            mediclevelname = " Medico - Livello 3";
            break;
        case "4":
            mediclevelname = " Medico - Livello 4";
            break;
        case "5":
            mediclevelname = " Medico - Livello 5";
            break;
        default:
            mediclevelname = " Nessuno";
    }

    $('#usermedlevel').html(mediclevelname);

}