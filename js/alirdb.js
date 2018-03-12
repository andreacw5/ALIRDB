/*
*
*                          ALIRDB v1.4 del 05/02/2018
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

// auth
var requestUser = "alirgoggles";
var requestPass = "apritisesamo";
var authLogin = "Basic " + btoa(requestUser + ":" + requestPass);

/**
 *  Inizializzo le variabili globali
 */

// Limitatore di ricerca configurabile
var searchLimiter = 100;

// Variabili connessione api
var playerDatabase = "https://cors-anywhere.herokuapp.com/http://37.59.102.107:8000/players";
var gangDatabase = "https://cors-anywhere.herokuapp.com/http://37.59.102.107:8000/gangs";
var vehicleDatabase = "https://cors-anywhere.herokuapp.com/http://37.59.102.107:8000/vehicles";
var wantedDatabase = "https://cors-anywhere.herokuapp.com/http://37.59.102.107:8000/wanted";
var userDatabase = "https://cors-anywhere.herokuapp.com/http://37.59.102.107:8000/users";
var listDatabase = "https://cors-anywhere.herokuapp.com/http://37.59.102.107:22400/lists";
var donorDatabase = "https://cors-anywhere.herokuapp.com/http://37.59.102.107:22400/donor";
var steamProfileUrl = "https://steamcommunity.com/profiles/";

// Array ricercati

var chargesArray = [
    { name:"Competizioni illegali", fines:1000},
    { name:"Guida senza patente", fines:300},
    { name:"Guida pericolosa", fines:400},
    { name:"Oltre i 10 km/h", fines:1000},
    { name:"Oltre i 20 km/h", fines:2000},
    { name:"Oltre i 30 km/h", fines:3000},
    { name:"Oltre i 40 km/h", fines:5000},
    { name:"Oltre i 60 km/h", fines:9000},
    { name:"Guida a fari spenti", fines:120},
    { name:"Veicolo in divieto di sosta", fines:75}, // TODO: Controllare valore
    { name:"Disturbo alla quiete pubblica", fines:220},
    { name:"Procurato allarme", fines:500},
    { name:"Molestie ad un agente", fines:500},
    { name:"Tentato suicidio", fines:1000},
    { name:"Istigazione al suicidio", fines:1500},
    { name:"Istigazione al delinquere", fines:2000},
    { name:"Offese al pudore", fines:50},
    { name:"Bracconaggio", fines:10000},
    { name:"Evasione", fines:10000},
    { name:"Complicità in evasione", fines:5000},
    { name:"Tentato furto di un veicolo", fines:2500},
    { name:"Utilizzo/Possesso di esplosivi", fines:2000},
    { name:"Rapina", fines:4000},
    { name:"Sequestro", fines:8000},
    { name:"Tentato sequestro", fines:5000},
    { name:"Possesso di droga", fines:7500},
    { name:"Traffico di droga", fines:10000},
    { name:"Furto di beni personali", fines:4000},
    { name:"Ricettazione", fines:4000},
    { name:"Tentato furto di veicolo civile", fines:2500},
    { name:"Furto di veicolo civile", fines:5000},
    { name:"Tentato furto di veicolo polizia", fines:3500},
    { name:"Furto di veicolo polizia", fines:6000},
    { name:"Possesso di arma illegale", fines:5000},
    { name:"Possesso di arma illegale aggravato", fines:7500},
    { name:"Possesso di equipaggiamento illegale", fines:2500},
    { name:"Fuga dalla polizia", fines:2000},
    { name:"Omicidio", fines:2000},
    { name:"Vendita illegale di armi", fines:10000},
    { name:"Uso di armi in citta", fines:2500},
    { name:"Estorsione", fines:4000},
    { name:"Tentata rapina", fines:2500},
    { name:"Complicità in rapina", fines:1500},
    { name:"Possesso di droga", fines:7500},
    { name:"Uso di stupefacenti", fines:1000},
    { name:"Terrorismo", fines:5000},
    { name:"Violazione spazio aereo urbano", fines:1000},
    { name:"Atterraggio senza autorizzazione", fines:750},
    { name:"Prostituzione", fines:1500},
    { name:"Tentata evasione", fines:50000},
    { name:"Complicità in rapina", fines:2500},
    { name:"Guida di mezzo non autorizzato", fines:700},
    { name:"Mancanza di documenti identificativi", fines:500}
];

// Array supporter

var supportTeamList = [
    {name: "Johnny", pid: "76561198140659293"},
    {name: "Sartox",pid: "76561198093943497"},
    {name: "Bowen",pid: "76561198036665850"},
    {name: "Phil",pid: "76561197970281561"},
    {name: "Bonden",pid: "76561198080431444"}
];

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
        url: playerDatabase + "/lenght/",
        type: 'GET',
        dataType: "json",
        timeout: 5000,
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", authLogin);
        }
    }).done(function (data) {
        $('#playerCounter').html(data.size)
    })/*.fail(function () {
        $('#playersearchview, #playermultyresult, #gangsearchview, #gangmultyresult, #viewfactionlist, #mainsearchpage, #wantedlist').attr('hidden', true);
        $('#connectionLost').removeAttr('hidden');
    })*/;

    $.ajax({
        url: gangDatabase + "/lenght/",
        type: 'GET',
        dataType: "json",
        timeout: 5000,
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", authLogin);
        }
    }).done(function (data) {
        $('#gangCounter').html(data.size)
    });

    $.ajax({
        url: vehicleDatabase + "/lenght/",
        type: 'GET',
        dataType: "json",
        timeout: 5000,
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", authLogin);
        }
    }).done(function (data) {
        $('#vehicleCounter').html(data.size)
    });

    $.ajax({
        url: wantedDatabase + "/lenght/",
        type: 'GET',
        dataType: "json",
        timeout: 5000,
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", authLogin);
        }
    }).done(function (data) {
        $('#wantedCounter').html(data.size)
    });

    $('#adminCounter').html("10");

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