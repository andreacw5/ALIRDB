/**
 *  Navigation js
 *  @author: Andreacw
 */

var searchType = "";
var searchId = "";

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
    $('#searchselection').attr('hidden',true).hide();
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
    $('#searchselection').attr('hidden',true);
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
    console.log(user)
}

function searchByGang(gang) {
    console.log(gang)
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

