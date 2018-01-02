/*
*
*                                 MIT License
*
*    Copyright (c) 2017 Andrea Zago
*
*    Permission is hereby granted, free of charge, to any person obtaining a copy
*    of this software and associated documentation files (the "Software"), to deal
*    in the Software without restriction, including without limitation the rights
*    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*    copies of the Software, and to permit persons to whom the Software is
*    furnished to do so, subject to the following conditions:
*
*    The above copyright notice and this permission notice shall be included in all
*    copies or substantial portions of the Software.
*
*    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
*    SOFTWARE.
*
*/

/**
 *  Player js
 *  @author: Andreacw
 */

function searchByPlayer(playerid) {

    // Solo in caso non viene passato l'id uso il campo input per la ricerca
    if(!playerid){
        playerid = $('#searchinput').val();
    }

    $('#mainsearchpage').attr('hidden',true);

    $.ajax({
        url: playerDatabase,
        type: 'GET',
        timeout: 1500,
        contentType: 'json',
        data: {
            q: playerid
        }
    }).done(function (data) {

        if(data.length > 1){
            showUserList(data);
        }else if(data.length === 1){
            $('#playermultyresult').attr('hidden', true);
            showUser(data);
        }else{
            $('#noresult').removeAttr('hidden');
        }

    }).fail(function () {

    });


}

function showUserList(data) {

    $('#playermultyresult').removeAttr('hidden');
    $('#resultsize').html(data.length);

    for (var i = 0; i < data.length; i++) {

        var userName = data[i].name;
        var playerId = data[i].playerid;
        var playerAlias = data[i].aliases;

        var listElement = $('<a style="cursor:pointer;" id="' + playerId + '" data-id="' + playerId + '" class="list-group-item list-group-item-action flex-column align-items-start">' +
            '    <div class="d-flex w-100 justify-content-between">' +
            '      <h5 class="mb-1">' + userName + '</h5>' +
            '      <small><i class="fas fa-external-link-alt"></i></small>' +
            '    </div>' +
            '    <small>Playerid: ' + playerId + ' - Alias: ' + playerAlias + '</small>' +
            '  </a>');

        $('#listUserAppendElement').append(listElement);

    }

    for (var x = 0; x < data.length; x++) {

        var playerId2 = data[x].playerid;

        $('#' + playerId2).on('click', function () {
           searchByPlayer($(this).data("id"));
        });
    }

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
            donorlevel = " Nessuno";
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
            copnamelevel = " Non è un'agente!";
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
            mediclevelname = " Non è un medico!";
    }

    $('#usermedlevel').html(mediclevelname);

}