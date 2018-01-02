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
 *
 *  Ricerca la gang e ne visualizza i membri in tabella
 *
 *  @author: Andreacw
 */

/**
 *  Compongo la tabella membri della gang avendo il nome della stessa
 *  @param: gang
 *  @return: formatted table appended on appendgangmembers
 */

function searchByGang(gang) {

    cleanSearchValue();

    $.ajax({
        url: "http://37.59.102.107:5200/gangs",
        type: 'GET',
        data: {
          q: gang
        },
        dataType: "json",
        timeout: 1500
    }).done(function (data) {

        if(data.length > 1){

            searchMultyResultView(data, data.length, "gang");
            console.log(data);

        }else if(data.length === 1){
            console.log(data);
            console.log(data[0].members.length);

            $('#gangview').removeAttr('hidden');

            $('#singlegangname').html(data[0].name);

            var gangmemberlength = data[0].members.length;

            if(gangmemberlength > 20){
                $('#gangplayernumber')
                    .html(gangmemberlength)
                    .attr('style',  'color:red');
            }else if(gangmemberlength >= 17){
                $('#gangplayernumber')
                    .html(gangmemberlength)
                    .attr('style',  'color:yellow');
            }else{
                $('#gangplayernumber')
                    .html(gangmemberlength);
            }



            for (var i = 0; i < data[0].members.length; i++) {

                var membersid = data[0].members[i];
                var counter = i + 1;
                var owner = data[0].owner;

                getGangMembersName(membersid);

                var gangmembers = $('<tr>' +
                    '    <th scope="row">'+ counter +'</th>' +
                    '    <td id="gangName'+ membersid +'" ></td>' +
                    '    <td>'+ membersid +'</td>' +
                    '    <td><i class="fas fa-external-link-alt"></i></td>' +
                    '</tr>');

                $('#appendgangmembers').append(gangmembers);

            }

        }else{
            console.log("Nessun risultato");
        }

    }).fail(function () {
        console.log('fail');
    });

}

/**
 *  Sulla base dell'id dell'utente cerco sulla 5100 il nome dello stesso corrispondente
 *  @param: playerid
 *  @return: text on gangNamePlayerID
 */

function getGangMembersName(playerid) {

    $.ajax({
        url: "http://37.59.102.107:5100/players",
        type: 'GET',
        data: {
            q: playerid
        },
        dataType: "json",
        timeout: 1500
    }).done(function (data) {

            if(data[0].name){
                $('#gangName' + playerid).html(data[0].name);

            }else{
                //TODO: Errore in caso non trovo il nome utente
                $('#gangName' + playerid).html("Utente non trovato").attr('style', 'color: red');
            }
        }

    );

}