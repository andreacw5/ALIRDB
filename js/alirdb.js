/*
*
*                          ALIRDB v1.2 del 05/01/2018
*
*                                 MIT License
*
*    Copyright (c) 2018 Andrea Zago
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
 *  Koala minifier combined file
 *  Questo file permette di minimizzare tutti i file js del progetto in un'unico file minimizzato.
 *  @author: Andreacw (This file)
 *  @author: Ethan Lai (http://koala-app.com/) (Creator of Koala Application)
 */

// @koala-append "player.js"
// @koala-append "gang.js"
// @koala-append "wanted.js"

// Limitatore di ricerca configurabile
var searchLimiter = 100;
// Variabili connessione api
var playerDatabase = "https://cors-anywhere.herokuapp.com/http://37.59.102.107:5100/players";
var gangDatabase = "https://cors-anywhere.herokuapp.com/http://37.59.102.107:5200/gangs";
var vehicleDatabase = "https://cors-anywhere.herokuapp.com/http://37.59.102.107:5300/vehicles";
var wantedDatabase = "https://cors-anywhere.herokuapp.com/http://37.59.102.107:5400/wanted";
var userDatabase = "https://cors-anywhere.herokuapp.com/http://37.59.102.107:5500/users";

var steamProfileUrl = "http://steamcommunity.com/profiles/";

// Abilito i tooltip ovunque
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

$.fn.extend({
    animateCss: function (animationName, callback) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
            if (callback) {
                callback();
            }
        });
        return this;
    }
});

/**
 *  Caricamento delle statistiche nella homepage
 */

function statisticOnLoad() {

    $.ajax({
        url: playerDatabase,
        type: 'GET',
        dataType: "json",
        timeout: 5000
    }).done(function (data) {
        $('#playerCounter').html(data.length)
    })/*.fail(function () {
        $('#playersearchview, #playermultyresult, #gangsearchview, #gangmultyresult, #viewfactionlist, #mainsearchpage, #wantedlist').attr('hidden', true);
        $('#connectionLost').removeAttr('hidden');
    })*/;

    $.ajax({
        url: gangDatabase,
        type: 'GET',
        dataType: "json",
        timeout: 5000
    }).done(function (data) {
        $('#gangCounter').html(data.length)
    });

    $.ajax({
        url: vehicleDatabase,
        type: 'GET',
        dataType: "json",
        timeout: 5000
    }).done(function (data) {
        $('#vehicleCounter').html(data.length)
    });

    $.ajax({
        url: wantedDatabase,
        type: 'GET',
        dataType: "json",
        timeout: 5000
    }).done(function (data) {
        $('#wantedCounter').html(data.length)
    });

    $('#adminCounter').html("11");

}

statisticOnLoad();

/**
 *  Funzioni per la navigazione tra le sezioni
 */

function goToHome() {
    // Vai alla pagina principale
    hideOpenWindow();
    $('#mainsearchpage').removeAttr('hidden');
    $('#listUserAppendElement, #appendgangmembers, #uservehicleappender, #listGangAppendElement, #appendFactionsMembers, #wantedresultappend, #appendinputationlist').empty();

    $('#userFinderButton').removeAttr('disabled');
    $('#gangFinderButton').removeAttr('disabled');
    $('#copFinderButton').removeAttr('disabled');
    $('#medFinderButton').removeAttr('disabled');

}

function hideOpenWindow() {
    // Chiudo tutte le finestre aperte
    $('#playersearchview, #playermultyresult, #gangsearchview, #gangmultyresult, #noresult, #viewfactionlist, #errorServer, #wantednav, #thisuserisadmin, #connectionLost, #thisuserissupporter').attr('hidden', true);
}

/**
 *  Funzioni per il cambio tab nel pannello utente
 */

function hideAllInfoPanel() {
    // Chiudo tutti i pannelli utente aperti
    $('#userinfopanel, #userlicensepanel, #uservehiclepanel, #userwantedpanel').hide().attr('hidden', true);
}

function showUserInfo() {
    // Visualizzo il tab informazioni nella visualizzazione utente
    hideAllInfoPanel();
    $('#userinfopanel').show(300).removeAttr('hidden');
    $('#infonav').addClass('active');
    $('#licensenav, #groupsnav, #vehiclenav, #wantednav').attr('class', 'nav-item nav-link');
    $('#userinfopanel').animateCss('bounceInRight');
}

/*function showUserLicense() {
    // Visualizzo il tab licenze nella visualizzazione utente
    hideAllInfoPanel();
    $('#userlicensepanel').show(300).removeAttr('hidden');
    $('#licensenav').addClass('active');
    $('#infonav, #groupsnav, #vehiclenav').attr('class', 'nav-item nav-link');
}*/

function showUserWanted() {
    // Visualizzo il tab dati giudiziari nella visualizzazione utente
    hideAllInfoPanel();
    $('#userwantedpanel').show(300).removeAttr('hidden');
    $('#wantednav').addClass('active');
    $('#licensenav, #groupsnav, #vehiclenav, #infonav').attr('class', 'nav-item nav-link');
    $('#wantedresultappend').animateCss('bounceInRight');
}

function showUserVehicle() {
    // Visualizzo il tab veicoli nella visualizzazione utente
    hideAllInfoPanel();
    $('#uservehiclepanel').show(300).removeAttr('hidden');
    $('#vehiclenav').addClass('active');
    $('#infonav, #groupsnav, #licensenav, #wantednav').attr('class', 'nav-item nav-link');
    $('#uservehicleappender').animateCss('bounceInRight');
}

/**
 *  Funzione per schermata di caricamento
 */

function loadingScreen() {
    $('[data-toggle="tooltip"]').tooltip("hide");
    $('#maindiv').attr('hidden',true);
    $('#loadingdiv').removeAttr('hidden');
    setTimeout(function(){
        $('#loadingdiv').attr('hidden',true);
        $('#maindiv').removeAttr('hidden')
    }, 6000);
}