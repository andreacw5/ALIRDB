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
 *  Player js
 *  @author: Andreacw
 */

function searchByPlayer(playerid) {

    // Solo in caso non viene passato l'id uso il campo input per la ricerca
    if(!playerid){
        playerid = $('#searchinput').val();
    }

    $('#mainsearchpage').attr('hidden',true);

    $.ajax({
        url: playerDatabase,
        type: 'GET',
        timeout: 5000,
        contentType: 'json',
        data: {
            q: playerid
        }
    }).done(function (data) {

        if(data.length > 1){
            showUserList(data);
        }else if(data.length === 1){
            $('#playermultyresult, #gangsearchview, #gangmultyresult, #viewfactionlist, #mainsearchpage, #noresult').attr('hidden', true);
            showUser(data);
        }else{
            $('#playersearchview, #playermultyresult, #gangsearchview, #gangmultyresult, #viewfactionlist, #mainsearchpage').attr('hidden', true);
            $('#noresult').removeAttr('hidden');
        }

    }).fail(function () {
        // TODO: Gestire a video l'eccezione
        console.log('fail');
    });


}

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
           searchByPlayer($(this).data("id"));
        });
    }

}

/**
 *  In caso di un solo risultato compongo la visualizzazione del giocatore.
 */

function showUser(data) {

    $('#playersearchview').removeAttr('hidden');

    showUserInfo();

    // Dati vari
    $('#usernameplace').html(data[0].name);
    $('#playeridplace').html(data[0].playerid);
    $('#userbankacc').html(data[0].bankacc);
    $('#usercash').html(data[0].cash);
    $('#useralias').html(data[0].aliases);

    var linkSteam = "http://steamcommunity.com/profiles/" + data[0].playerid + "/";

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

    getGangName(data[0].playerid);

    getUserVehicle(data[0].playerid);

}

/**
 *  Con il playerId dell'utente creo la lista dei mezzi
 *  @param: playerid
 *  @return: gangShow
 */

function getUserVehicle(playerid) {

    $.ajax({
        url: vehicleDatabase,
        type: 'GET',
        timeout: 5000,
        contentType: 'json',
        data: {
            q: playerid
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
                    case 'C_Van_02_transport_F':
                        vehicleName = 'Camioncino (Trasporto)';
                        break;
                    case 'C_Van_02_vehicle_F':
                        vehicleName = 'Camioncino (Cargo)';
                        break;
                    case 'C_Van_02_medevac_F':
                        vehicleName = 'Ambulanza';
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
                    case 'O_Heli_Transport_04_F':
                        vehicleName = 'Mi-290 Taru';
                        break;
                    case 'O_Heli_Transport_04_medevac_F':
                        vehicleName = 'Mi-290 Taru (Medico) ';
                        break;
                    case 'B_Heli_Transport_03_unarmed_F':
                        vehicleName = 'Huron';
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
                    case 'C_Boat_Civil_01_police_F':
                        vehicleName = 'Motoscafo (Polizia)';
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
                    '                                <h6 class="card-subtitle mb-2 text-muted">' + sideText + ', targato '+ vehiclePlate +' (colore '+vehicleColor+')</h6>' +
                    '                            </div>' +
                    '                        </div>' +
                    '                    </div>');
                

                $('#uservehicleappender').append(vehicle);

            }

        }else{
            $('#vehiclesize').html("Questo utente non possiede veicoli!");
        }

    }).fail(function () {

    });

}

/**
 *  Tramite il tipo ritorno la visualizzazione e l'elenco della fazione x
 *  @param: type
 *  @return: viewfactionlist
 */

function showFactionList(type) {

    // TODO: Richiesto Json esposto direttamente con la lista fazioni in modo da non esporre al client la ricerca ed i dati degli utenti.

    $.ajax({
        url: playerDatabase,
        type: 'GET',
        dataType: "json",
        timeout: 5000
    }).done(function (data) {

        var counterm = 1;
        var countotalm;

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

                    $('#playersearchview, #playermultyresult, #gangsearchview, #gangmultyresult, #mainsearchpage, #noresult').attr('hidden', true);
                    $('#viewfactionlist').removeAttr('hidden');
                    countotalm = counterm++;

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

                    var factionsMembers = $('<tr>' +
                        '    <th scope="row">' + countotalm + '</th>' +
                        '    <td> ' + name +'</td>' +
                        '    <td class="statsdiv" style="text-align: center !important;">' + division + '</td>' +
                        '    <td class="statsdiv" style="text-align: center !important;">' + side + '</td>' +
                        '    <td title="Visualizza dettagli utente"  data-toggle="tooltip" id="'+playerid+'" data-id="'+playerid+'" data-placement="top" style="color: #007BCC;cursor:pointer;"><i class="fas fa-external-link-alt"></i></td>' +
                        '</tr>');

                    $('#appendFactionsMembers').append(factionsMembers);


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
                        searchByPlayer($(this).data("id"));
                    });

                }
            }
        }

    });
}