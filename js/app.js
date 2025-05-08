// Inicialização do SDK do Facebook
window.fbAsyncInit = function() {
  FB.init({
    appId      : 9813854598694394, // Substitua pelo seu App ID real
    cookie     : true,
    xfbml      : true,
    version    : 'v18.0'
  });
    
  FB.AppEvents.logPageView();
  
  // Verificar status de login após inicialização
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};

// Carregamento assíncrono do SDK
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/pt_BR/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Função de callback para verificar status
function statusChangeCallback(response) {
  console.log('statusChangeCallback', response);
  if (response.status === 'connected') {
    console.log("Usuário já está logado e autenticado");
    getUserInfo();
  } else {
    document.getElementById('status').innerHTML = 'Por favor, faça login.';
  }
}

// Função para realizar o login
function loginWithFacebook() {
  FB.login(function(response) {
    statusChangeCallback(response);
  }, {scope: 'public_profile,email'}); // Remova user_friends
}

// Função para obter informações do usuário
function getUserInfo() {
  FB.api('/me', {fields: 'name,email'}, function(response) {
    console.log("Informações do usuário recebidas:", response);
    document.getElementById('status').innerHTML = 'Olá, ' + response.name + '!';
  });
}

// Função para obter lista de amigos (requer permissão user_friends)
function getFriendsList() {
  FB.api('/me/friends', function(response) {
    console.log("Resposta da lista de amigos:", response);
    var friendsList = document.getElementById('friends-list');
    
    if (response && response.data && response.data.length > 0) {
      var html = '<h2>Seus amigos que usam este aplicativo:</h2><ul>';
      
      for (var i = 0; i < response.data.length; i++) {
        html += '<li class="friend-item">' + response.data[i].name + '</li>';
      }
      
      html += '</ul>';
      friendsList.innerHTML = html;
    } else {
      friendsList.innerHTML = '<h2>Lista de amigos</h2><p>Nenhum de seus amigos está usando este aplicativo ainda.</p>';
    }
  });
}
