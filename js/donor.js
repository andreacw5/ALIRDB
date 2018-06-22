function loadDonorStat() {

    $.ajax({
        url: donorDatabase + "/stats",
        type: 'GET',
        dataType: "json",
        timeout: 5000,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", authLogin);
        }
    }).done(function (data) {

        $('#donorl1counter').html(data.onelev);
        $('#donorl2counter').html(data.twolev);

        console.log(data.onelev);

    });

}

loadDonorStat();

function showDonorList(level) {

    $.ajax({
        url: listDatabase + "/donor/" + level,
        type: 'GET',
        dataType: "json",
        timeout: 5000,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", authLogin);
        }
    }).done(function (data) {

        $('#tableName').html('Elenco donatori - Liv. ' + level);

        for (var i = 0; i < data.length; i++) {

            if (data[i].adminlevel === '0') {

                var playerid = data[i].playerid;
                var name = data[i].name;
                var donorlevel = data[i].donorlevel;

                $('#mainsearchpage').attr('hidden', true);
                $('#viewDonorList').removeAttr('hidden');

                var donorMemberList = $('<tr> ' +
                    '<td>' + name + '</td>' + ' <td> ' + playerid + ' </td>' + ' <td> ' + donorlevel + ' </td>' +
                    '</tr>');

                $('#appendDonorList').append(donorMemberList);

            }

        }

    });

}

function returnToDonor() {
    $('#viewDonorList').attr('hidden', true);
    $('#mainsearchpage').removeAttr('hidden');
}