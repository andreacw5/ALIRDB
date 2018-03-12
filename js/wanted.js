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
 *  Con il playerid genero la lista delle accuse solo se l'utente è ricercato
 *  @param: playerid
 */

function getUserCharges(playerid) {

    $.ajax({
        url: wantedDatabase,
        type: 'GET',
        data: {
            q: playerid
        },
        dataType: "json",
        timeout: 5000,
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", authLogin);
        }
    }).done(function (data) {

        // Controllo che l'utente sia ricercato
        if(data[0] !== undefined){

            var charges = data[0][2];
            var fines = data[0][3];
            var chargesSet = data[0][4];

            // controllo che l'utente sia ricercato attivamente
            if(chargesSet === 1){

                $('#wantednav').removeAttr('hidden');

                var wantedYes = $('<div class="row">' +
                    '                        <div class="col-12 padbot">' +
                    '                            <div class="card">' +
                    '                                <div class="card-body">' +
                    '                                    <h4 class="card-title" style="color: #8B1A1A">RICERCATO!</h4>' +
                    '                                    <h6 class="card-subtitle mb-2 text-muted">Attualmente ricercato con '+ charges.length +' imputazioni a carico, con una taglia totale di '+ fines + '€ </h6>' +
                    '                                </div>' +
                    '                                <ul class="list-group list-group-flush" id="appendinputationlist">' +
                    '                                </ul>' +
                    '                            </div>' +
                    '                        </div>' +
                    '                    </div>');

                $('#wantedresultappend').append(wantedYes).removeAttr('hidden');

                for (var i = 0; i < charges.length; i++) {

                    var chargesName;
                    var chargesFines;

                    for (var y = 0; y < chargesArray.length; y++) {
                        chargesName = chargesArray[data[0][2][i] + 1].name;
                        chargesFines = chargesArray[data[0][2][i] + 1].fines;
                    }

                    var wantedChargesList = $('<li class="list-group-item">' + chargesName + ' ('  + chargesFines  +  ' €)</li>');

                    $('#appendinputationlist').append(wantedChargesList);
                }

            }

        }

    }).fail(function () {
        // TODO: Gestire il fallimento
    });

}

/**
 *  Creo una tabella con tutte le accuse nell'array da visualizzare con le taglie per capo
 *  @param: chargesArray
 */

function createWantedChargesTable() {
    // TODO
}