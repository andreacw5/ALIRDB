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
 *  Effettuo la ricerca tra gli utenti in base al playerid fornito
 *  @param: playerid
 *  @return: data[i]
 */

function searchByPlayer(type, playerid) {

    $('#userFinderButton').attr('disabled',true);
    $('#gangFinderButton').attr('disabled',true);
    $('#copFinderButton').attr('disabled',true);
    $('#medFinderButton').attr('disabled',true);

    var inputval = playerid;

    // Solo in caso non viene passato l'id uso il campo input per la ricerca
    if(!playerid){
        inputval = $('#searchinput').val();
    }

    var ajaxurl = "";

    if(type === "name"){
        ajaxurl = playerDatabase + "/name/" + inputval;
    }else{
        ajaxurl = playerDatabase + "/" + inputval;
    }

    $('#mainsearchpage').attr('hidden',true);

    $.ajax({
        url: ajaxurl,
        type: 'GET',
        timeout: 6000,
        contentType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", authLogin);
        }
    }).done(function (data) {

        if(data.length > 1){
            showUserList(data);
        }else if(data.length === 1){
            $('#playermultyresult, #gangsearchview, #gangmultyresult, #viewfactionlist, #mainsearchpage, #noresult, #wantedlist').attr('hidden', true);
            showUser(data);
        }else{
            $('#playersearchview, #playermultyresult, #gangsearchview, #gangmultyresult, #viewfactionlist, #mainsearchpage, #wantedlist').attr('hidden', true);
            $('#noresult').removeAttr('hidden');
        }

    })/*.fail(function () {
        $('#playersearchview, #playermultyresult, #gangsearchview, #gangmultyresult, #viewfactionlist, #mainsearchpage, #wantedlist').attr('hidden', true);
        $('#errorServer').removeAttr('hidden');
        $('#modulename').html("player");
    })*/;


}

/**
 *  In caso di numerosi risultati visualizzo la lista utenti trovati
 *  @param: data
 *  @return: playermultyresult
 */

function showUserList(data) {

    $('#playermultyresult').removeAttr('hidden');

    var searchN;

    if(data.length > searchLimiter){
        searchN = searchLimiter;
        $('#resultsize').html(searchLimiter);
    }else{
        searchN = data.length;
        $('#resultsize').html(data.length);
    }

    for (var i = 0; i < searchN; i++) {

        var userName = data[i].name;
        var playerId = data[i].playerid;
        var playerAlias = data[i].aliases;

        var listElement = $('<a style="cursor:pointer;" id="' + playerId + '" data-id="' + playerId + '" class="list-group-item list-group-item-action flex-column align-items-start">' +
            '    <div class="d-flex w-100 justify-content-between">' +
            '      <h5 class="mb-1">' + userName + '</h5>' +
            '      <small><i class="fas fa-external-link-alt"></i></small>' +
            '    </div>' +
            '    <small>Playerid: ' + playerId + ' - Alias: ' + playerAlias + '</small>' +
            '  </a>');

        $('#listUserAppendElement').append(listElement);

    }

    for (var x = 0; x < searchN; x++) {

        var playerId2 = data[x].playerid;

        $('#' + playerId2).on('click', function () {
            loadingScreen();
           searchByPlayer('playerid', $(this).data("id"));
        });
    }

}

/**
 *  In caso di un solo risultato compongo la visualizzazione del giocatore.
 *  @param: data
 *  @return: visualizzazione dell'utente
 */

function showUser(data) {

    $('#uservehicleappender').empty();

    var playerid = data[0].playerid;
    var adminlv = data[0].adminlevel;

    // Controllo se l'utente è un membro dello staff
    if(adminlv === "1" || adminlv === "2" || adminlv === "3" || adminlv === "4" || adminlv === "5"){
        $('#thisuserisadmin').removeAttr('hidden');
    }else{

        for (var x = 0; x < supportTeamList.length; x++) {

            if(supportTeamList[x].pid === playerid){
                $('#thisuserissupporter').removeAttr('hidden');
                break;
            }
        }

    }

    $('#playersearchview').removeAttr('hidden');

    // Dati vari
    $('#usernameplace').html(data[0].name);
    $('#playeridplace').html(playerid);
    $('#userbankacc').html(data[0].bankacc);
    $('#usercash').html(data[0].cash);
    $('#useralias').html(data[0].aliases);

    var linkSteam = steamProfileUrl + playerid;

    $('#steamLink').attr('href', linkSteam);

    // In base al livello donatore inserisco le stelle
    var donorlevel;

    switch(data[0].donorlevel) {
        case "1":
            donorlevel = $('<i class="fa fa-star"></i>');
            break;
        case "2":
            donorlevel = $('<i class="fa fa-star"></i><i class="fa fa-star"></i>');
            break;
        case "3":
            donorlevel = $('<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>');
            break;
        case "4":
            donorlevel = $('<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>');
            break;
        case "5":
            donorlevel = $('<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>');
            break;
        case "6":
            donorlevel = $('<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>');
            break;
        default:
            donorlevel = " Nessuno";
    }

    $('#userdonorlevel').html(donorlevel);

    // In base al livello cop del giocatore metto il nome del grado
    var copnamelevel;

    switch(data[0].coplevel){
        case "1":
            copnamelevel = " Agente - Livello 1";
            break;
        case "2":
            copnamelevel = " Agente Scelto - Livello 2";
            break;
        case "3":
            copnamelevel = " Assistente - Livello 3";
            break;
        case "4":
            copnamelevel = " Assistente Capo - Livello 4";
            break;
        case "5":
            copnamelevel = " Sovrintendente - Livello 5";
            break;
        case "6":
            copnamelevel = " Sovrintendente Capo - Livello 6";
            break;
        case "7":
            copnamelevel = " Ispettore - Livello 7";
            break;
        case "8":
            copnamelevel = " Ispettore Capo - Livello 8";
            break;
        case "9":
            copnamelevel = " Commissario - Livello 9";
            break;
        case "10":
            copnamelevel = " Questore - Livello 10";
            break;
        default:
            copnamelevel = " Non è un'agente!";
    }

    $('#usercoplevel').html(copnamelevel);

    // In base al livello med del giocatore metto il nome del grado
    var mediclevelname;

    switch(data[0].mediclevel){
        case "1":
            mediclevelname = " Medico - Livello 1";
            break;
        case "2":
            mediclevelname = " Medico - Livello 2";
            break;
        case "3":
            mediclevelname = " Medico - Livello 3";
            break;
        case "4":
            mediclevelname = " Medico - Livello 4";
            break;
        case "5":
            mediclevelname = " Medico - Livello 5";
            break;
        default:
            mediclevelname = " Non è un medico!";
    }

    $('#usermedlevel').html(mediclevelname);

    getGangName(playerid);

    getUserVehicle(playerid);

    getUserCharges(playerid);

    showUserInfo();

}

/**
 *  Tramite il tipo ritorno la visualizzazione e l'elenco della fazione x
 *  @param: type
 *  @return: viewfactionlist
 */

function showFactionList(type) {

    $('#userFinderButton').attr('disabled',true);
    $('#gangFinderButton').attr('disabled',true);
    $('#copFinderButton').attr('disabled',true);
    $('#medFinderButton').attr('disabled',true);

    /**
     *  Type accettati:
     *  cop - Lista agenti
     *  med - Lista medici
     */

    $.ajax({
        url: listDatabase + "/" + type,
        type: 'GET',
        dataType: "json",
        timeout: 5000,
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", authLogin);
        }
    }).done(function (data) {

        for (var i = 0; i < data.length; i++) {

            var side;

            var sideCop = data[i].coplevel;
            var sideMed = data[i].mediclevel;

            if(type === "cop"){
                $('#factionName').html("Elenco agenti in servizio");
                side = sideCop;
            }else if(type === "med"){
                $('#factionName').html("Elenco medici in servizio");
                side = sideMed;
            }else{
                console.log("Type necessario");
            }

            if (!(side === '0' || side === undefined)) {

                if (data[i].adminlevel === '0') {

                    $('#playersearchview, #playermultyresult, #gangsearchview, #gangmultyresult, #mainsearchpage, #noresult, #wantedlist').attr('hidden', true);
                    $('#viewfactionlist').removeAttr('hidden');

                    var plkPat = new RegExp('\[PLK\]', 'gi');
                    var name = data[i].name;
                    var playerid = data[i].playerid;
                    var division;

                    // cerco i membri della plk dalla tag (sperando ci sia)
                    var cir = name.search(plkPat);

                    if(cir === 1 && type === "cop"){
                        division = '<i style="color: #759bc9" title="Polizia Locale" class="fas fa-building"></i>';
                    }else if(type === "cop"){
                        division = '<i style="color: #3D6594" title="Polizia di Stato" class="fas fa-balance-scale"></i>';
                    }else{
                        division = '<i style="color: #f18e38" title="Medico" class="fas fa-medkit"></i>';
                    }

                    var factionsMembers = $('<tr id="row'+playerid+'">' +
                        '    <td> ' + name +'</td>' +
                        '    <td class="statsdiv" style="text-align: center !important;">' + division + '</td>' +
                        '    <td class="statsdiv" style="text-align: center !important;">' + side + '</td>' +
                        '    <td title="Visualizza dettagli utente"  data-toggle="tooltip" id="'+playerid+'" data-id="'+playerid+'" data-placement="top" style="color: #007BCC;cursor:pointer;"><i class="fas fa-external-link-alt"></i></td>' +
                        '</tr>');

                    $('#appendFactionsMembers').append(factionsMembers);

                    if(type === "med") {
                        for (var y = 0; y < supportTeamList.length; y++) {

                            if (supportTeamList[y].pid === playerid) {
                                $('#row' + playerid).remove();
                            }
                        }
                    }


                }

            }

        }

        $('#factionCounter').html($('#appendFactionsMembers tr').length);

        for (var x = 0; x < data.length; x++) {

            if(type === "cop"){
                side = data[x].coplevel;
            }else{
                side = data[x].mediclevel;
            }


            if (!(side === '0' || side === undefined)) {

                if (data[x].adminlevel === '0') {

                    var membersid2 = data[x].playerid;

                    $('#' + membersid2).on('click', function () {
                        loadingScreen();
                        searchByPlayer('playerid', $(this).data("id"));
                    });

                }
            }
        }

    })/*.fail(function () {
        $('#playersearchview, #playermultyresult, #gangsearchview, #gangmultyresult, #viewfactionlist, #mainsearchpage, #wantedlist').attr('hidden', true);
        $('#errorServer').removeAttr('hidden');
        $('#modulename').html("player");
    })*/;
}

/**
 *  Sulla base dell'id dell'utente cerco sulla 5100 il nome dello stesso corrispondente
 *  @param: playerid
 *  @return: text on gangNamePlayerID
 */

function getGangMembersName(playerid, owner) {

    $.ajax({
        url: playerDatabase + "/" + playerid,
        type: 'GET',
        dataType: "json",
        timeout: 5000,
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", authLogin);
        }
    }).done(function (data) {

        if(data.length === 0){
            $('#user' + playerid).html("Utente non trovato").attr('style', 'color: red');
        }else{
            if (data[0].playerid === owner) {
                $('#user' + playerid).html(data[0].name + "  (Leader)").css("color", "orange").attr('title', 'Questo utente è il capo della gang');
            } else {
                $('#user' + playerid).html(data[0].name);
            }
        }

    })/*.fail(function () {
        $('#playersearchview, #playermultyresult, #gangsearchview, #gangmultyresult, #viewfactionlist, #mainsearchpage, #wantedlist').attr('hidden', true);
        $('#errorServer').removeAttr('hidden');
        $('#modulename').html("player");
    })*/;

}

/**
 *  Con il playerId dell'utente creo la lista dei mezzi
 *  @param: playerid
 *  @return: gangShow
 */

function getUserVehicle(playerid) {

    $.ajax({
        url: vehicleDatabase + "/" + playerid,
        type: 'GET',
        timeout: 5000,
        contentType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", authLogin);
        }
    }).done(function (data) {

        if(data.length > 0){

            $('#vehiclesize').html("Possiede " + data.length + " veicoli:");

            for (var i = 0; i < data.length; i++) {

                var vehicleName;
                var vehicleType;
                var vehicleSide = data[i].side;
                var vehiclePlate = data[i].plate;
                var vehicleColor = data[i].color;

                switch (data[i].classname) {
                    // Auto
                    case 'B_Quadbike_01_F':
                        vehicleName = 'Quad';
                        break;
                    case 'C_Offroad_01_F':
                        vehicleName = 'Offroad';
                        break;
                    case 'C_Offroad_01_repair_F':
                        vehicleName = 'Offroad (Ripara)';
                        break;
                    case 'C_Offroad_02_unarmed_F':
                        vehicleName = 'Offroad (Mimetico)';
                        break;
                    case 'O_G_Offroad_01_F':
                        vehicleName = 'Offroad (Mimetico)';
                        break;
                    case 'C_SUV_01_F':
                        vehicleName = 'Suv';
                        break;
                    case 'C_Hatchback_01_F':
                        vehicleName = 'Hatchback';
                        break;
                    case 'C_Hatchback_01_sport_F':
                        vehicleName = 'Hatchback (Sport)';
                        break;
                    case 'O_MRAP_02_F':
                        vehicleName = 'Ifrit';
                        break;
                    case 'B_MRAP_01_F':
                        vehicleName = 'Hunter';
                        break;
                    case 'O_T_LSV_02_unarmed_black_F':
                        vehicleName = 'Quilin (Nero)';
                        break;
                    case 'B_LSV_01_unarmed_black_F':
                        vehicleName = 'Prowler (Nero)';
                        break;
                    case 'I_G_Van_01_transport_F':
                        vehicleName = 'Furgone (Cassone)';
                        break;
                    // Zamak
                    case 'O_Truck_02_transport_F':
                        vehicleName = 'Zamak (Trasporto)';
                        break;
                    case 'O_Truck_02_covered_F':
                        vehicleName = 'Zamak (Telonato)';
                        break;
                    case 'I_Truck_02_covered_F':
                        vehicleName = 'Zamak (Telonato)';
                        break;
                    case 'O_Truck_02_fuel_F':
                        vehicleName = 'Zamak (Carburante)';
                        break;
                    // HEMTT
                    case 'B_Truck_01_transport_F':
                        vehicleName = 'HEMTT (Trasporto)';
                        break;
                    case 'B_Truck_01_covered_F':
                        vehicleName = 'HEMTT (Telonato)';
                        break;
                    case 'B_Truck_01_box_F':
                        vehicleName = 'HEMTT (Cassone)';
                        break;
                    case 'B_Truck_01_fuel_F':
                        vehicleName = 'HEMTT (Carburante)';
                        break;
                    case 'B_Truck_01_mover_F':
                        vehicleName = 'HEMTT (Solo cabina)';
                        break;
                    // Camioncino
                    case 'C_Van_01_box_F':
                        vehicleName = 'Furgone (Cassone)';
                        break;
                    case 'C_Van_01_fuel_F':
                        vehicleName = 'Furgone (Carburante)';
                        break;
                    // Tempest
                    case 'O_T_Truck_03_covered_ghex_F':
                        vehicleName = 'Tempest Apex (Telonato)';
                        break;
                    case 'O_Truck_03_transport_F':
                        vehicleName = 'Tempest (Trasporto)';
                        break;
                    case 'O_Truck_03_fuel_F':
                        vehicleName = 'Tempest (Carburante)';
                        break;
                    case 'O_Truck_03_covered_F':
                        vehicleName = 'Tempest (Telonato)';
                        break;
                    // Altro
                    case 'C_Kart_01_Fuel_F':
                        vehicleName = 'Kart';
                        break;
                    case 'C_Kart_01_Red_F':
                        vehicleName = 'Kart';
                        break;
                    case 'C_Van_02_transport_F':
                        vehicleName = 'Camioncino (Trasporto)';
                        break;
                    case 'C_Van_02_vehicle_F':
                        vehicleName = 'Camioncino (Cargo)';
                        break;
                    // Elicotteri
                    case 'C_Heli_Light_01_civil_F':
                        vehicleName = 'MH-900';
                        break;
                    case 'B_Heli_Light_01_F':
                        vehicleName = 'Hummingbird';
                        break;
                    case 'B_Heli_Transport_01_F':
                        vehicleName = 'Ghosthawk';
                        break;
                    case 'B_Heli_Light_01_stripped_F':
                        vehicleName = 'Hummingbird (Ricettato)';
                        break;
                    case 'O_Heli_Light_02_unarmed_F':
                        vehicleName = 'PO-30 Orca (Disarmata)';
                        break;
                    case 'I_Heli_Transport_02_F':
                        vehicleName = 'AW101 Mohawk (Merlin)';
                        break;
                    case 'I_Heli_light_03_unarmed_F':
                        vehicleName = 'WY-55 Hellcat';
                        break;
                    case 'B_T_VTOL_01_infantry_F':
                        vehicleName = 'V-44 X Blackfish (Fanteria)';
                        break;
                    case 'B_T_VTOL_01_vehicle_F':
                        vehicleName = 'V-44 X Blackfish (Veicoli)';
                        break;
                    case 'B_T_VTOL_01_armed_F':
                        vehicleName = 'V-44 X Blackfish (Armato)';
                        break;
                    case 'C_Plane_Civil_01_racing_F':
                        vehicleName = 'Caesar BTT (Corsa)';
                        break;
                    case 'O_Heli_Transport_04_medevac_black_F':
                        vehicleName = 'Mi-290 Taru (Medico)';
                        break;
                    // Barche
                    case 'C_Rubberboat':
                        vehicleName = 'Gommone';
                        break;
                    case 'B_Boat_Transport_01_F':
                        vehicleName = 'Gommone';
                        break;
                    case 'O_Lifeboat':
                        vehicleName = 'Gommone da salvataggio';
                        break;
                    case 'O_T_Boat_Transport_01_F':
                        vehicleName = 'Gommone';
                        break;
                    case 'B_Boat_Armed_01_minigun_F':
                        vehicleName = 'Barca armata (Minigun)';
                        break;
                    case 'C_Boat_Civil_01_F':
                        vehicleName = 'Motoscafo';
                        break;
                    case 'C_Boat_Civil_01_rescue_F':
                        vehicleName = 'Motoscafo (Soccorso)';
                        break;
                    case 'B_SDV_01_F':
                        vehicleName = 'Sommergibile (SDV)';
                        break;
                    case 'O_SDV_01_F':
                        vehicleName = 'Sommergibile (SDV)';
                        break;
                    case 'C_Scooter_Transport_01_F':
                        vehicleName = "Moto d'acqua";
                        break;
                    default:
                        vehicleName = data[i].classname;
                }

                var iconcolor;
                var sideText;

                if(vehicleSide === "cop"){
                    iconcolor = "#4286f4";
                    sideText = "Veicolo della polizia";
                }else if(vehicleSide === "med"){
                    iconcolor = "#d8a011";
                    sideText = "Veicolo medico";
                }else{
                    iconcolor = "#ffffff";
                    sideText = "Veicolo civile"
                }

                if(data[i].type === "Car"){
                    vehicleType = '<i class="fas fa-car" style="color: ' + iconcolor + ';"></i>';
                }else if(data[i].type === "Air"){
                    vehicleType = '<i class="fas fa-plane" style="color: ' + iconcolor + ';"></i>';
                }else{
                    vehicleType = '<i class="fas fa-ship" style="color: ' + iconcolor + ';"></i>';
                }


                var vehicle = $('<div class="col-12 padbot">' +
                    '                        <div class="card">' +
                    '                            <div class="card-body">' +
                    '                                <h4 class="card-title">'+ vehicleType + ' ' + vehicleName +'</h4>' +
                    '                                <h6 class="card-subtitle mb-2 text-muted">Targato '+ vehiclePlate +' (colore '+vehicleColor+')</h6>' +
                    '                            </div>' +
                    '                        </div>' +
                    '                    </div>');


                $('#uservehicleappender').append(vehicle);

            }

        }else{
            $('#vehiclesize').html("Questo utente non possiede veicoli!");
        }

    })/*.fail(function () {
        $('#playersearchview, #playermultyresult, #gangsearchview, #gangmultyresult, #viewfactionlist, #mainsearchpage, #wantedlist').attr('hidden', true);
        $('#errorServer').removeAttr('hidden');
        $('#modulename').html("vehicle");
    })*/;

}
