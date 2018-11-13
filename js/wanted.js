const wantedDatabase = "https://cors-anywhere.herokuapp.com/http://37.59.102.107:8000/wanted";

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
