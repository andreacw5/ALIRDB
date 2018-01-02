/**
 *  Navigation js
 *  @author: Andreacw
 */

var searchType = "";
var searchId = "";
var searchData;

// Indirizzi ip per query GET

var playerDatabase = "http://37.59.102.107:5100/players";

// Abilito i tooltip ovunque
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

/**
 *  Funzioni per la navigazione tra le sezioni
 */

function goToHome() {
    searchType = "";
    hideOpenWindow();
    $('#mainsearchpage').removeAttr('hidden');
    $('#appendgangmembers').empty();

}

function hideOpenWindow() {
    $('#playersearchview').attr('hidden', true);
    $('#playermultyresult').attr('hidden', true);
    $('#gangsearchview').attr('hidden', true);
    $('#gangmultyresult').attr('hidden', true);
    $('#noresult').attr('hidden', true);
    $('#viewfactionlist').attr('hidden', true);
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

