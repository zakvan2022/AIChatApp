function sendRequest() {
    var user = "caesar"
    var entrypoint = "http://localhost:8000";
    // var query = entrypoint + "/conversations/" + user + "/respond?query=" + $("#btn-input").val();
    var query = $("#btn-input").val();
    var person_query_html = '<li class="right clearfix">'+
            '<span class="chat-img pull-right"><img src="http://placehold.it/50/FA6F57/fff&text=ME" alt="User Avatar" class="img-circle" /></span>'+   
            '<div class="chat-body clearfix">'+
            '<div class="header">'+
                '<small class=" text-muted"><span class="glyphicon glyphicon-time"></span>13 mins ago</small>'+
                '<strong class="pull-right primary-font">Isopooh</strong>'+
            '</div>'+
            '<p class="pull-right">'+
                query +
            '</p>' +
        '</div>'+
            '</li><li class="waiting left clearfix">'+
            '<span class="waiting-img pull-left">'+
                '<img src="http://localhost:8000/static/img/writing.gif" alt="Writing" class="img-writing" />'+
            '</span>'+
        '</li>'
    $(".chat").append(person_query_html);
    $('#btn-input').val("");
    var url = entrypoint + "/chatbotapi/respond?query=" + query;
    // /console.log(query)
    
    var bot_answer_html =  '<li class="left clearfix"><span class="chat-img pull-left">'+
                                '<img src="http://placehold.it/50/55C1E7/fff&text=U" alt="User Avatar" class="img-circle" />'+
                                '</span>'+
                                '<div class="chat-body clearfix">'+
                                '<div class="header">'+
                                    '<strong class="primary-font">AI Bot</strong> <small class="pull-right text-muted">'+
                                    '<span class="glyphicon glyphicon-time"></span>12 mins ago</small>'+
                                '</div>'+
                                '<p>';
    $.getJSON(url, function(result){
        console.log(result);
        var answers = result['answers'];
        if (answers.length>0){
            $.each(answers, function(i, answer){
                // alert(answer['text']);
                if (answer['text'])
                    bot_answer_html += answer['text'] + '<br/>';
                if (answer['image'])
                    bot_answer_html += '<img class="chat-answer-img" src="'+ answer['image'] + '">' + '<br/>';
            });
        }
        else{
            bot_answer_html += "I can't know what you mean" + '<br/>';
        }

        bot_answer_html += '</p></div></li>';
        $(".waiting").remove();
        $(".chat").append(bot_answer_html);
    });
}

$('#btn-input').keypress(function(event){
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
		sendRequest();
	}
});