/*
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
 *  Compongo la tabella membri della gang avendo il nome della stessa
 *  @param: gang
 *  @return: formatted table appended on appendgangmembers
 */

function searchByGang(gang) {

    $('#userFinderButton').attr('disabled',true);
    $('#gangFinderButton').attr('disabled',true);
    $('#copFinderButton').attr('disabled',true);
    $('#medFinderButton').attr('disabled',true);

    if (!gang) {
        gang = $('#searchinput').val();
    }

    $('#playersearchview, #playermultyresult, #gangmultyresult, #noresult, #viewfactionlist, #wantedlist').attr('hidden', true);

    $.ajax({
        url: gangDatabase + "/" + gang,
        type: 'GET',
        dataType: "json",
        timeout: 5000,
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", authLogin);
        }
    }).done(function (data) {
        if (data.length > 1) {
            $('#mainsearchpage').attr('hidden', true);
            showGangList(data);
        } else if (data.length === 1) {
            $('#gangmultyresult').attr('hidden', true);
            showGang(data);
        } else {
            $('#playersearchview, #playermultyresult, #gangsearchview, #gangmultyresult, #viewfactionlist, #mainsearchpage, #wantedlist').attr('hidden', true);
            $('#noresult').removeAttr('hidden');
        }

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

    if (gangmemberlength > 12) {
        $('#gangplayernumber')
            .html(gangmemberlength)
            .attr('style', 'color:red');
        $('#limitwarning').removeAttr('hidden');
    } else if (gangmemberlength >= 10) {
        $('#gangplayernumber')
            .html(gangmemberlength)
            .attr('style', 'color:yellow');
        $('#limitwarning').attr('hidden',true);
    } else {
        $('#gangplayernumber')
            .html(gangmemberlength);
        $('#limitwarning').attr('hidden',true);
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
            loadingScreen();
            searchByPlayer('playerid',$(this).data("id"));
        });
    }
}

/**
 *  Con l'id del giocatore cerco il nome della gang in cui si trova
 *  @param: playerid
 *  @return: gangName
 */

function getGangName(playerid) {

    $.ajax({
        url: gangDatabase + "/id/" + playerid,
        type: 'GET',
        dataType: "json",
        timeout: 5000,
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", authLogin);
        }
    }).done(function (data) {

        if (data.length === 1 ) {
            $('#usergangname').html(data[0].name).attr('style','color: #007BCC;cursor:pointer;').on('click', function () {
                loadingScreen();
                searchByGang($(this).html());
            });
        } else {
            $('#usergangname').html(" Nessuna").removeAttr('style').off('click').attr('title','Questo utente non è in nessuna gang');
        }

    })/*.fail(function () {
        $('#playersearchview, #playermultyresult, #gangsearchview, #gangmultyresult, #viewfactionlist, #mainsearchpage, #wantedlist').attr('hidden', true);
        $('#errorServer').removeAttr('hidden');
        $('#modulename').html("gang");
    })*/;

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

        var gangColor;

        if(memberSize >= 10){
            gangColor = '#FFE17E';
        }else if(memberSize > 12){
            gangColor = '#FF3333';
        }else{
            gangColor = '#FFF';
        }

        var listElement = $('<a style="cursor:pointer;" id="' + ownerId + '" data-id="' + ownerId + '" class="list-group-item list-group-item-action flex-column align-items-start">' +
            '    <div class="d-flex w-100 justify-content-between">' +
            '      <h5 class="mb-1">' + gangName + '</h5>' +
            '      <small><i class="fas fa-external-link-alt"></i></small>' +
            '    </div>' +
            '    <small>Dimensioni: <span style="color: ' + gangColor + '">' + memberSize + '/12 </span> - Proprietario: ' + ownerId + '</small>' +
            '  </a>');

        $('#listGangAppendElement').append(listElement);

    }

    for (var x = 0; x < data.length; x++) {

        var ownerId2 = data[x].owner;

        $('#' + ownerId2).on('click', function () {
            loadingScreen();
            searchByGang($(this).data("id"));
        });
    }

}