var message_count;
var user_name;
var user;

$(function(){
  $('#user_form_submit').on('click',function(){
    user_name = $('#user_name').val();
    $('#user_name').prop('disabled',true);
    $('#user_form_submit').prop('disabled',true);
    $('#progress').show();
    output(user_name);
    $('#user_name').prop('disabled',false);
    $('#user_form_submit').prop('disabled',false);
    $('#progress').hide();
  });
});

function output(name){
  $('#messages').hide(200);
  $.ajax({
    url: "https://api.scratch.mit.edu/proxy/users/"+name+"/activity/count",
    success: function(e){
      message_count = e.msg_count;
      $.ajax({
        url: "https://api.scratch.mit.edu/users/"+name,
        success: function(e){
          user = e;
        //  $('#user_form').hide(100);
          $('.user_name').html('<a href="https://scratch.mit.edu/users/'+name+'/" target="_blank">@'+user.username+'</a>');
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
}
