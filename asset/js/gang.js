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
 *  Gang.js
 *  @author: Andreacw
 */

/**
 *  Compongo la tabella membri della gang avendo il nome della stessa
 *  @param: gang
 *  @return: formatted table appended on appendgangmembers
 */

function searchByGang(gang) {

    if (!gang) {
        gang = $('#searchinput').val();
    }

    $('#playersearchview, #playermultyresult, #gangmultyresult, #noresult, #viewfactionlist').attr('hidden', true);

    $.ajax({
        url: gangDatabase,
        type: 'GET',
        data: {
            q: gang
        },
        dataType: "json",
        timeout: 5000
    }).done(function (data) {

        if (data.length > 1) {
            $('#mainsearchpage').attr('hidden', true);
            showGangList(data);
        } else if (data.length === 1) {
            $('#gangmultyresult').attr('hidden', true);
            showGang(data);
        } else {
            $('#playersearchview, #playermultyresult, #gangsearchview, #gangmultyresult, #viewfactionlist, #mainsearchpage').attr('hidden', true);
            $('#noresult').removeAttr('hidden');
        }

    }).fail(function () {
        $('#playersearchview, #playermultyresult, #gangsearchview, #gangmultyresult, #viewfactionlist, #mainsearchpage').attr('hidden', true);
        $('#errorServer').removeAttr('hidden');
        $('#modulename').html("gang");
    });

}

/**
 *  Con i dati della gang creo la visualizzazione a tabella della stessa
 *  @param: data
 *  @return: gangShow
 */

function showGang(data) {

    $('#appendgangmembers').empty();

    $('#mainsearchpage').attr('hidden', true);
    $('#gangsearchview').removeAttr('hidden');

    $('#gangview').removeAttr('hidden');

    $('#singlegangname').html(data[0].name);

    var gangmemberlength = data[0].members.length;

    if (gangmemberlength > 20) {
        $('#gangplayernumber')
            .html(gangmemberlength)
            .attr('style', 'color:red');
    } else if (gangmemberlength >= 17) {
        $('#gangplayernumber')
            .html(gangmemberlength)
            .attr('style', 'color:yellow');
    } else {
        $('#gangplayernumber')
            .html(gangmemberlength);
    }


    for (var i = 0; i < data[0].members.length; i++) {

        var membersid = data[0].members[i];
        var counter = i + 1;
        var owner = data[0].owner;

        getGangMembersName(membersid, owner);

        var gangmembers = $('<tr>' +
            '    <th scope="row">' + counter + '</th>' +
            '    <td id="user' + membersid + '" ></td>' +
            '    <td class="statsdiv">' + membersid + '</td>' +
            '    <td title="Visualizza dettagli utente"  data-toggle="tooltip" id="'+data[0].members[i]+'" data-id="'+data[0].members[i]+'" data-placement="top" style="color: #007BCC;cursor:pointer;"><i class="fas fa-external-link-alt"></i></td>' +
            '</tr>');

        $('#appendgangmembers').append(gangmembers);

    }

    for (var x = 0; x < data[0].members.length; x++) {

        var membersid2 = data[0].members[x];

        $('#' + membersid2).on('click', function () {
            searchByPlayer($(this).data("id"));
        });
    }
}

/**
 *  Sulla base dell'id dell'utente cerco sulla 5100 il nome dello stesso corrispondente
 *  @param: playerid
 *  @return: text on gangNamePlayerID
 */

function getGangMembersName(playerid, owner) {

    $.ajax({
        url: playerDatabase,
        type: 'GET',
        data: {
            q: playerid
        },
        dataType: "json",
        timeout: 5000
    }).done(function (data) {
            if (data[0].name) {
                if (data[0].playerid === owner) {
                    $('#user' + playerid).html(data[0].name + "  (Leader)").css("color", "orange").attr('title', 'Questo utente è il capo della gang');
                } else {
                    $('#user' + playerid).html(data[0].name);
                }

            } else {
                //TODO: Errore in caso non trovo il nome utente
                $('#gangName' + playerid).html("Utente non trovato").attr('style', 'color: red');
            }
        }
    ).fail(function () {
        $('#playersearchview, #playermultyresult, #gangsearchview, #gangmultyresult, #viewfactionlist, #mainsearchpage').attr('hidden', true);
        $('#errorServer').removeAttr('hidden');
        $('#modulename').html("player");
    });

}

/**
 *  Avendo l'id del giocatore cerco il nome della gang in cui si trova
 *  @param: playerid
 *  @return: gangName
 */

function getGangName(playerid) {

    $.ajax({
        url: gangDatabase,
        type: 'GET',
        data: {
            q: playerid
        },
        dataType: "json",
        timeout: 5000
    }).done(function (data) {

        if (data.length === 1 ) {
            $('#usergangname').html(data[0].name).attr('style','color: #007BCC;cursor:pointer;').on('click', function () {
                searchByGang($(this).html());
            });
        } else {
            $('#usergangname').html(" Nessuna").removeAttr('style').off('click').attr('title','Questo utente non è in nessuna gang');
        }

    }).fail(function () {
        $('#playersearchview, #playermultyresult, #gangsearchview, #gangmultyresult, #viewfactionlist, #mainsearchpage').attr('hidden', true);
        $('#errorServer').removeAttr('hidden');
        $('#modulename').html("gang");
    });

}

/**
 *  Compongo la lista delle gang trovate
 *  @param: data (Array)
 *  @return: Gang List page
 */

function showGangList(data) {

    $('#gangmultyresult').removeAttr('hidden');

    $('#gangresultsize').html(data.length);

    for (var i = 0; i < data.length; i++) {

        var gangName = data[i].name;
        var ownerId = data[i].owner;
        var memberSize = data[i].members.length;

        var listElement = $('<a style="cursor:pointer;" id="' + ownerId + '" data-id="' + ownerId + '" class="list-group-item list-group-item-action flex-column align-items-start">' +
            '    <div class="d-flex w-100 justify-content-between">' +
            '      <h5 class="mb-1">' + gangName + '</h5>' +
            '      <small><i class="fas fa-external-link-alt"></i></small>' +
            '    </div>' +
            '    <small>Dimensioni: ' + memberSize + '/20 - Proprietario: ' + ownerId + '</small>' +
            '  </a>');

        $('#listGangAppendElement').append(listElement);

    }

    for (var x = 0; x < data.length; x++) {

        var ownerId2 = data[x].owner;

        $('#' + ownerId2).on('click', function () {
            searchByGang($(this).data("id"));
        });
    }

}