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
 *  Wanted js
 *  @author: Andreacw
 */

var chargesName;
var chargesFines;

function getUserCharges(playerid) {

    $.ajax({
        url: wantedDatabase,
        type: 'GET',
        data: {
            q: playerid
        },
        dataType: "json",
        timeout: 5000
    }).done(function (data) {

        setTimeout(function(){ $('#loadingwanted').fadeOut('slow',function(){$(this).hide()})}, 200);

        var charges = data[0][2];
        var fines = data[0][3];
        var chargesSet = data[0][4];

        console.log(charges, fines, chargesSet);

        // se è 1 chargesSet il giocatore è ricercato creo quindi l'allerta
        if(chargesSet === 1){

            $('#wantednav').removeAttr('hidden');

            var wantedYes = $('<div class="row">' +
                '                        <div class="col-12 padbot">' +
                '                            <div class="card">' +
                '                                <div class="card-body">' +
                '                                    <h4 class="card-title" style="color: #C43235">RICERCATO!</h4>' +
                '                                    <h6 class="card-subtitle mb-2 text-muted">Attualmente ricercato con '+ charges.length +' imputazioni a carico, con una taglia totale di '+ fines + '€ </h6>' +
                '                                </div>' +
                '                                <ul class="list-group list-group-flush" id="appendinputationlist">' +
                '                                </ul>' +
                '                            </div>' +
                '                        </div>' +
                '                    </div>');

            $('#wantedresultappend').append(wantedYes).removeAttr('hidden');

            for (var i = 0; i < charges.length; i++) {

                getChargesHumanName(data[0][2][i]);

                var wantedChargesList = $('<li class="list-group-item">' + chargesName + ' ('  + chargesFines  +  ' €)</li>');

                $('#appendinputationlist').append(wantedChargesList);
            }

        }

    }).fail(function () {
        // TODO: Gestire il fallimento
    });

}


function getChargesHumanName(chargesCode) {

    switch (chargesCode) {
        // Codice della strada
        case '1':
            chargesName = 'Competizioni illegali';
            chargesFines = 1000;
            break;
        case '2':
            chargesName = 'Guida senza patente';
            chargesFines = 300;
            break;
        case '3':
            chargesName = 'Guida pericolosa';
            chargesFines = 400;
            break;
        case '4':
            chargesName = 'Oltre i 10 km/h';
            chargesFines = 1000;
            break;
        case '5':
            chargesName = 'Oltre i 20 km/h';
            chargesFines = 2000;
            break;
        case '6':
            chargesName = 'Oltre i 30 km/h';
            chargesFines = 3000;
            break;
        case '7':
            chargesName = 'Oltre i 40 km/h';
            chargesFines = 5000;
            break;
        case '8':
            chargesName = 'Oltre i 60 km/h';
            chargesFines = 90;
            break;
        case '9':
            chargesName = 'Guida a fari spenti';
            chargesFines = 120;
            break;
        case '10':
            chargesName = 'Veicolo in divieto di sosta';
            chargesFines = 'Veicolo in divieto di sosta';
            break;
        // Codice penale
        case '11':
            chargesName = 'Disturbo alla quiete pubblica';
            chargesFines = 220;
            break;
        case '12':
            chargesName = 'Procurato allarme';
            chargesFines = 500;
            break;
        case '13':
            chargesName = 'Molestie ad un agente';
            chargesFines = 500;
            break;
        case '14':
            chargesName = 'Tentato suicidio';
            chargesFines = 1000;
            break;
        case '15':
            chargesName = 'Istigazione al suicidio';
            chargesFines = 1500;
            break;
        case '16':
            chargesName = 'Istigazione al delinquere';
            chargesFines = 2000;
            break;
        case '17':
            chargesName = 'Offese al pudore';
            chargesFines = 50;
            break;
        case '18':
            chargesName = 'Bracconaggio';
            chargesFines = 10000;
            break;
        case '19':
            chargesName = 'Evasione';
            chargesFines = 10000;
            break;
        case '20':
            chargesName = 'Complicità in evasione';
            chargesFines = 5000;
            break;
        case '21':
            chargesName = 'Tentato furto di un veicolo';
            chargesFines = 2500;
            break;
        case '22':
            chargesName = 'Utilizzo/Possesso di esplosivi';
            chargesFines = 2000;
            break;
        case '23':
            chargesName = 'Rapina';
            chargesFines = 4000;
            break;
        case '24':
            chargesName = 'Sequestro';
            chargesFines = 8000;
            break;
        case '25':
            chargesName = 'Tentato sequestro';
            chargesFines = 5000;
            break;
        case '26':
            chargesName = 'Possesso di droga';
            chargesFines = 7500;
            break;
        case '27':
            chargesName = 'Traffico di droga';
            chargesFines = 10000;
            break;
        case '28':
            chargesName = 'Furto di beni personali';
            chargesFines = 4000;
            break;
        case '29':
            chargesName = 'Ricettazione';
            chargesFines = 4000;
            break;
        case '30':
            chargesName = 'Tentato furto di veicolo civile';
            chargesFines = 2500;
            break;
        case '31':
            chargesName = 'Furto di veicolo civile';
            chargesFines = 5000;
            break;
        case '32':
            chargesName = 'Tentato furto di veicolo polizia';
            chargesFines = 3500;
            break;
        case '33':
            chargesName = 'Furto di veicolo polizia';
            chargesFines = 6000;
            break;
        case '34':
            chargesName = 'Possesso di arma illegale';
            chargesFines = 5000;
            break;
        case '35':
            chargesName = 'Possesso di arma illegale aggravato';
            chargesFines = 7500;
            break;
        case '36':
            chargesName = 'Possesso di equipaggiamento illegale';
            chargesFines = 2500;
            break;
        case '37':
            chargesName = 'Fuga dalla polizia';
            chargesFines = 2000;
            break;
        case '38':
            chargesName = 'Omicidio';
            chargesFines = 2000;
            break;
        case '39':
            chargesName = 'Vendita illegale di armi';
            chargesFines = 10000;
            break;
        case '40':
            chargesName = 'Uso di armi in citta';
            chargesFines = 2500;
            break;
        case '41':
            chargesName = 'Estorsione';
            chargesFines = 4000;
            break;
        case '42':
            chargesName = 'Tentata rapina';
            chargesFines = 2500;
            break;
        case '43':
            chargesName = 'Complicità in rapina';
            chargesFines = 1500;
            break;
        case '44':
            chargesName = 'Possesso di droga';
            chargesFines = 7500;
            break;
        case '45':
            chargesName = 'Uso di stupefacenti';
            chargesFines = 1000;
            break;
        case '46':
            chargesName = 'Terrorismo';
            chargesFines = 5000;
            break;
        case '47':
            chargesName = 'Violazione spazio aereo urbano';
            chargesFines = 1000;
            break;
        case '48':
            chargesName = 'Atterraggio senza autorizzazione';
            chargesFines = 750;
            break;
        case '49':
            chargesName = 'Prostituzione';
            chargesFines = 1500;
            break;
        case '50':
            chargesName = 'Tentata evasione';
            chargesFines = 50000;
            break;
        case '51':
            chargesName = 'Complicità in rapina';
            chargesFines = 2500;
            break;
        case '52':
            chargesName = 'Guida di mezzo non autorizzato';
            chargesFines = 700;
            break;
        case '53':
            chargesName = 'Mancanza di documenti identificativi';
            chargesFines = 500;
            break;
        default:
            chargesName = 'Nome imputazione assente nel database, errore 404';
            chargesFines = null;
            break;


    }

}