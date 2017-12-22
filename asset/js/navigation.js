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

function searchGangBar(){
    $('.searchselection').attr('hidden',true);
    $('#mainsearchbar').removeAttr('hidden');
    $('#inputsearch')
        .attr('placeholder','Ricerca per gang')
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

    $.ajax({
        url: "http://37.59.102.107:5100/players?q="+ user +"&format=json",
        type: 'GET',
        timeout: 1500
    }).done(function (data) {

        if(data.length > 1){

            console.log(data.length);
            console.log(data);

        }else if(data.length === 1){

            console.log(data);

        }else{

            console.log("no result");

        }

    }).fail(function () {

    });


}

function searchByGang(gang) {

    $.ajax({
        url: "http://37.59.102.107:5200/gangs?q="+ gang +"&format=json",
        type: 'GET',
        timeout: 1500
    }).done(function (data) {

        if(data.length > 1){

            console.log(data.length);
            console.log(data);

        }else if(data.length === 1){

            console.log(data);

        }else{

            console.log("no result");

        }

    }).fail(function () {

    });

}




function goToFactionSelection() {

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

