// Inicialização do SDK do Facebook
window.fbAsyncInit = function() {
  FB.init({
    appId      : 9813854598694394, // Substitua pelo seu App ID real
    cookie     : true,
    xfbml      : true,
    version    : 'v18.0' // Use a versão mais recente do SDK
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
  console.log("Tentando login com Facebook...");
  FB.login(function(response) {
    console.log("Resposta do login:", response);
    statusChangeCallback(response);
  }, {scope: 'public_profile,email'});
}

// Função para obter informações do usuário
function getUserInfo() {
  FB.api('/me', {fields: 'name,email'}, function(response) {
    console.log("Informações do usuário recebidas:", response);
    document.getElementById('status').innerHTML = 'Olá, ' + response.name + '!';
  });
}
