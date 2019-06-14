$(function() {
    let submitBtn = $('#submit');
    let platformDropDownBtn = $('#platform a');
    let epicNickName = $('#epicNickName');
    let results = $('#results');

    // default values
    let dropDownValue = 'xbl';

    submitBtn.click(function() {
        let data = {};
        data.epicNickName = epicNickName.val().toLowerCase();
        data.dropDownValue = dropDownValue.toLowerCase();
        $.ajax({
            type: "POST",
            url: '/',
            dataType: 'json',
            data: data,
            success: function(data) {
                data = JSON.parse(data);
                displayData(data);
            }
        });
        resetResult();
    });

    platformDropDownBtn.click(function() {
        dropDownValue = $(this).text();
    });

    function resetResult() {
        results.html('');
        epicNickName.val('');
    }

    function displayData(data) {
        let epicUserHandle = data.epicUserHandle;
        let list =  `<ul class="list-group"> 
                        <li class="list-group-item">Solo:  ${data.stats.p2.top1.value} --- Kills: ${data.stats.p2.kills.value}</li>
                        <li class="list-group-item">Duos:  ${data.stats.p10.top1.value} --- Kills: ${data.stats.p10.kills.value}</li>
                        <li class="list-group-item">Teams:  ${data.stats.p9.top1.value} --- Kills: ${data.stats.p9.kills.value}</li>
                    </ul>`;

        let template = `<div class="card text-center"> 
                            <h5 class="card-header">${epicUserHandle}</h5>
                            <div class="card-body"> 
                                <h5 class="card-title">Wins</h5>
                                <p class="card-text">${list}</p>
                            </div>
                        </div>`;
        // let list =  '<ul class="list-group">' + 
        //                 '<li class="list-group-item">' + 'Solo: ' + data.stats.p2.top1.value + '</li>' +
        //                 '<li class="list-group-item">' + 'Duos: ' + data.stats.p10.top1.value + '</li>' +
        //                 '<li class="list-group-item">' + 'Teams: ' + data.stats.p9.top1.value + '</li>' +
        //             '</ul>';

        
        // let template = '<div class="card text-center">' + 
        //                     '<h5 class="card-header">' + epicUserHandle + '</h5>' +
        //                     '<div class="card-body">' + 
        //                     '<h5 class="card-title">' + 'Wins' + '</h5>' +
        //                     '<p class="card-text">' + list + '</p>' +
        //                     '</div>' +
        //                 '</div>';

        results.html(template);
    }
});