    var socket = io("http://localhost:3000")

socket.on("server-send-registration-failed", function(){
    alert("This username already exist. Please choose another one!");
});

socket.on("server-send-registraction-successful", function(user){
    $("#currentUser").html(user);
    $("#loginForm").hide(2000);
    $("#chatForm").show(1000);
});

socket.on("server-send-list-users", function(usersArray){
    $("#boxContent").html("");
    usersArray.forEach(function(element) {
        $("#boxContent").append("<div class='user'>" + element + "</div");
    });
});

socket.on("server-send-messages", function(data){
    $("#listMessages").append("<div class='message'>" + data.user + ": " + data.content + "</div>");
});

socket.on("someone-is-typing", function(notificationMsg){
    $("#notification").html(notificationMsg);
});

socket.on("someone-loss-of-typing", function(notificationMsg){
    // $("#notification").html("");
});

$(document).ready(function(){
    $("#loginForm").show();
    $("#chatForm").hide();

    $("#btnRegister").click(function(){
        socket.emit("client-send-username", $("#txtUername").val());
    });

    $("#btnLogout").click(function(){
        socket.emit("logout");
        $("#loginForm").show(1000);
        $("#chatForm").hide(2000);
    });

    $("#btnSendMessage").click(function() {
        socket.emit("user-send-message", $("#txtMessage").val());
    })

    $("#txtMessage").focusin(function(){
        socket.emit("typing");
    });

    $("#txtMessage").focusin(function(){
        socket.emit("loss-of-focus");
    });
});