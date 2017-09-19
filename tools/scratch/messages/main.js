var message_count;
var user_name;
var user;

$(function(){
  $('#user_form_submit').on('click',function(){
    user_name = $('#user_name').val();
    $('#user_name').prop('disabled',true);
    $('#user_form_submit').prop('disabled',true);
    $('#progress').show();
    $.ajax({
      url: "https://api.scratch.mit.edu/proxy/users/"+user_name+"/activity/count",
      success: function(e){
        message_count = e.msg_count;
        console.log(e);
        $.ajax({
          url: "https://api.scratch.mit.edu/users/"+user_name,
          success: function(e){
            user = e;
            $('#user_form').hide(100);
            $('.user_name').html('<a href="https://scratch.mit.edu/users/'+user_name+'/" target="_blank">@'+user_name+'</a>');
            $('.fread_messages').text(message_count);
            $('.user_icon').attr('src',user.profile.images["90x90"]);
            $('#messages').show(200);
          }
        });
      },
      error: function(e){
        $('#user_name').prop('disabled',false);
        $('#user_form_submit').prop('disabled',false);
        $('#progress').hide();
      }
    });
  });
});
