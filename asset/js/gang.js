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
            $('#gangplayernumber').html(data[0].members.length);

            for (var i = 0; i < data[0].members.length; i++) {

                var membersid = data[0].members[i];
                var counter = i + 1;
                var owner = data[0].owner;

                getGangMembersName(membersid, owner);

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

function getGangMembersName(playerid, owner) {

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
                $('#gangName' + playerid).html("Utente non trovato").attr('style', 'color: red');
            }
        }

    );

}