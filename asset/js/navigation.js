/**
 *  Navigation js
 *  @author: Andreacw
 */

var searchType = "";
var searchId = "";
var searchData;

// Abilito i tooltip ovunque
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

/**
 *  Funzioni per la navigazione tra le sezioni
 */

function goToHome() {
    searchType = "";
    $('#multiresult').attr('hidden', true);

}

function searchPlayerBar(){
    $('.searchselection').attr('hidden',true).hide();
    $('#mainsearchbar').removeAttr('hidden').show();
    $('#inputsearch')
        .attr('placeholder','Ricerca per giocatore o GUID')
        .val('');
    searchType = "player";
    $('#searchbutton').click(function () {
        searchId = $('#inputsearch').val();
        searchByPlayer(searchId);
    });
}

function searchGangBar() {
    $('.searchselection').attr('hidden', true);
    $('#mainsearchbar').removeAttr('hidden');
    $('#inputsearch')
        .attr('placeholder', 'Ricerca per gang')
        .val('');
    searchType = "gang";
    $('#searchbutton').click(function () {
        searchId = $('#inputsearch').val();
        searchByGang(searchId);
    });
}

/**
 *  Eseguo la ricerca per utente
 */

function searchByPlayer(user) {

    cleanSearchValue();

    $.ajax({
        url: "http://37.59.102.107:5100/players?q="+ user +"&format=json",
        type: 'GET',
        timeout: 1500
    }).done(function (data) {

        if(data.length > 1){

            searchMultyResultView(data, data.length, "giocatori");

        }else if(data.length === 1){

            findPlayerByid(data.playerid, data);

        }else{

            console.log("no result");

        }

    }).fail(function () {

    });


}

function searchByGang(gang) {

    cleanSearchValue();

    $.ajax({
        url: "http://37.59.102.107:5200/gangs?q="+ gang +"&format=json",
        type: 'GET',
        timeout: 1500
    }).done(function (data) {

        if(data.length > 1){

            searchMultyResultView(data, data.length, "gang");

        }else if(data.length === 1){


        }else{

            console.log("no result");

        }

    }).fail(function () {

    });

}


function cleanSearchValue() {
    $('#searchtitle').text('').attr('hidden', true);
}

function searchMultyResultView(searchResult, numbers, searchFor) {

    for (var i = 0; i < numbers; i++) {

        $('#searchtitle').removeAttr('hidden').text('Ho trovato ' + numbers + ' ' + searchFor);

        $('#multiresult').removeAttr('hidden');

        var playerid = searchResult[i].playerid;
        var playerinfo = searchResult[i];

        var element = $('<a href="#" data-id="'+ playerid +'" id="element'+ playerid +'" class="list-group-item list-group-item-action flex-column align-items-start">\n' +
            '                            <div class="d-flex w-100 justify-content-between">\n' +
            '                                <h5 class="mb-1">'+ searchResult[i].name +'</h5>\n' +
            '                                <small><i class="fas fa-external-link-alt"></i></small>\n' +
            '                            </div>\n' +
            '                            <p class="mb-1">Alias noti: '+ searchResult[i].aliases +' - playerid: ' + searchResult[i].playerid + '</p>\n' +
            '                        </a>');

        $('#multiresultappendlist').append(element);

        $('#element' + playerid + '').click(function(){
            findPlayerByid($(this).data("id"), playerinfo);
        });

    }
}

function findPlayerByid(playerid, playerInfo) {
    console.log(playerid);
    console.log(playerInfo);
    $('#mainsection').attr('hidden',true);
    $('#userresultview').removeAttr('hidden').show();

    // Visualizzo le informazioni dell'utente
    $('#userbankacc').text(playerInfo.bankacc);
    $('#usercash').text(playerInfo.cash);
    $('#usercoplevel').text(playerInfo.coplevel);
    $('#usermedlevel').text(playerInfo.mediclevel);
    $('#useralias').text(playerInfo.aliases);

    // Personalizzo il nome associato al livello donatore visualizzato

    var stars = '<i class="fa fa-star" style="color: yellow"></i>';
    var donatorTitle = $('#userdonorlevel');

    if (playerInfo.donorlevel === '1') {
        $('#userdonorlevel').html(stars);
        donatorTitle.attr('title', 'Livello 1');
    } else if (playerInfo.donorlevel === '2') {
        $('#userdonorlevel').html(stars + ' ' + stars);
        donatorTitle.attr('title', 'Livello 2');
    } else if (playerInfo.donorlevel === '3') {
        $('#userdonorlevel').html(stars + ' ' + stars + ' ' + stars);
        donatorTitle.attr('title', 'Livello 3');
    } else if (playerInfo.donorlevel === '4') {
        $('#userdonorlevel').html(stars + ' ' + stars + ' ' + stars + ' ' + stars);
        donatorTitle.attr('title', 'Livello 4');
    } else if (playerInfo.donorlevel === '5') {
        $('#userdonorlevel').html(stars + ' ' + stars + ' ' + stars + ' ' + stars + ' ' + stars);
        donatorTitle.attr('title', 'Livello 5');
    } else {
        $('#userdonorlevel').text("No");
        donatorTitle.attr('title', '');
    }

}

/**
 *  Funzioni per il cambio tab nel pannello utente
 */

function hideAllInfoPanel() {
    $('#userinfopanel, #userlicensepanel, #uservehiclepanel').hide().attr('hidden', true);
    console.clear();
}

function showUserInfo() {
    hideAllInfoPanel();
    $('#userinfopanel').show(300).removeAttr('hidden');
    $('#infonav').addClass('active');
    $('#licensenav, #groupsnav, #vehiclenav').attr('class', 'nav-item nav-link');
}

function showUserLicense() {
    hideAllInfoPanel();
    $('#userlicensepanel').show(300).removeAttr('hidden');
    $('#licensenav').addClass('active');
    $('#infonav, #groupsnav, #vehiclenav').attr('class', 'nav-item nav-link');
}

function showUserVehicle() {
    hideAllInfoPanel();
    $('#uservehiclepanel').show(300).removeAttr('hidden');
    $('#vehiclenav').addClass('active');
    $('#infonav, #groupsnav, #licensenav').attr('class', 'nav-item nav-link');
}

function showUserGang() {
    hideAllInfoPanel();
    $('#infonav, #groupsnav, #licensenav, #vehiclenav').attr('class', 'nav-item nav-link');
}

