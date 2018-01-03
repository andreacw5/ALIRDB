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
 *  Navigation js
 *  @author: Andreacw
 */

var searchType = "";
var searchId = "";
var searchData;
var searchLimiter = 100;

// Indirizzi ip per query GET

var playerDatabase = "http://37.59.102.107:5100/players";
var gangDatabase = "http://37.59.102.107:5200/gangs";
var vehicleDatabase = "http://37.59.102.107:5300/vehicles";
var wantedDatabase = "http://37.59.102.107:5400/wanted";
var userDatabase = "http://37.59.102.107:5500/users";

// Abilito i tooltip ovunque
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

/**
 *  Lenght dei db esterni
 */

function statisticOnLoad() {

    $.ajax({
        url: playerDatabase,
        type: 'GET',
        dataType: "json",
        timeout: 1500
    }).done(function (data) {
        $('#playerCounter').html(data.length)
    });

    $.ajax({
        url: gangDatabase,
        type: 'GET',
        dataType: "json",
        timeout: 1500
    }).done(function (data) {
        $('#gangCounter').html(data.length)
    });

    $.ajax({
        url: vehicleDatabase,
        type: 'GET',
        dataType: "json",
        timeout: 1500
    }).done(function (data) {
        $('#vehicleCounter').html(data.length)
    });

    $.ajax({
        url: wantedDatabase,
        type: 'GET',
        dataType: "json",
        timeout: 1500
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
    searchType = "";
    hideOpenWindow();
    $('#mainsearchpage').removeAttr('hidden');
    $('#listUserAppendElement').empty();
    $('#appendgangmembers').empty();
    $('#uservehicleappender').empty();
    $('#listGangAppendElement').empty();
    console.clear();

}

function hideOpenWindow() {
    $('#playersearchview, #playermultyresult, #gangsearchview, #gangmultyresult, #noresult, #viewfactionlist').attr('hidden', true);
}

/**
 *  Funzioni per il cambio tab nel pannello utente
 */

function hideAllInfoPanel() {
    $('#userinfopanel, #userlicensepanel, #uservehiclepanel').hide().attr('hidden', true);
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

