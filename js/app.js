// Configuração do aplicativo Facebook
const FB_APP_ID = "9813854598694394"; // Substitua pelo seu App ID do Facebook

// Inicializar o SDK do Facebook
window.fbAsyncInit = function () {
  FB.init({
    appId: 9813854598694394,
    cookie: true,
    xfbml: true,
    version: "v18.0", // Use a versão mais recente disponível
  });

  // Verificar status de login
  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });
};

// Callback quando o status de login muda
function statusChangeCallback(response) {
  if (response.status === "connected") {
    // Usuário está logado no Facebook e autenticou o aplicativo
    document.getElementById("fb-login-button").style.display = "none";
    document.getElementById("extraction-form").style.display = "block";
    console.log("Conectado ao Facebook!");
  } else {
    // Usuário não está logado ou não autenticou o aplicativo
    document.getElementById("fb-login-button").style.display = "block";
    document.getElementById("extraction-form").style.display = "none";
    console.log("Não conectado ao Facebook.");
  }
}

// Função para realizar login no Facebook
function loginWithFacebook() {
  FB.login(
    function (response) {
      statusChangeCallback(response);
    },
    { scope: "public_profile,email,user_friends" }
  );
}

// Função para iniciar a extração de contatos
function startExtraction() {
  const groupUrl = document.getElementById("groupUrl").value;
  const dataType = document.getElementById("dataType").value;

  if (!groupUrl) {
    alert("Por favor, insira a URL do grupo ou página.");
    return;
  }

  document.getElementById("statusMessage").textContent =
    "Extraindo dados... Por favor, aguarde.";
  document.getElementById("results").style.display = "block";

  // Extrair ID do grupo/página da URL
  const id = extractIdFromUrl(groupUrl);

  if (dataType === "members" || dataType === "admins") {
    // Explicação sobre limitações atuais da API
    document.getElementById("statusMessage").textContent =
      "Devido às limitações da API do Facebook, não é possível extrair membros de grupos diretamente. " +
      "O aplicativo apenas pode acessar informações públicas e amigos que também usam este aplicativo.";

    // Demonstração com dados simulados
    simulateGroupDataExtraction(id, dataType);
  } else if (dataType === "followers") {
    // Demonstração com dados simulados para seguidores da página
    simulatePageDataExtraction(id);
  }
}

// Função para extrair ID da URL (simplificada)
function extractIdFromUrl(url) {
  // Esta é uma implementação simplificada
  // Na prática, seria necessário um regex mais robusto
  const matches = url.match(/facebook\.com\/(groups|pages)\/([^/?]+)/);
  return matches ? matches[2] : url;
}

// Função para simular extração de dados de grupos (para demonstração)
function simulateGroupDataExtraction(groupId, dataType) {
  // Em um aplicativo real, isso seria substituído por chamadas à API
  setTimeout(() => {
    const simulatedData = generateSimulatedContacts(15);
    displayResults(simulatedData);
    document.getElementById("statusMessage").textContent +=
      "\n\nNota: Estes são dados simulados para demonstração. " +
      "Para uma implementação completa, seriam necessárias permissões avançadas do Facebook.";
  }, 2000);
}

// Função para simular extração de dados de página (para demonstração)
function simulatePageDataExtraction(pageId) {
  // Em um aplicativo real, isso seria substituído por chamadas à API
  setTimeout(() => {
    const simulatedData = generateSimulatedContacts(20);
    displayResults(simulatedData);
    document.getElementById("statusMessage").textContent +=
      "\n\nNota: Estes são dados simulados para demonstração. " +
      "Para uma implementação completa, seriam necessárias permissões avançadas do Facebook.";
  }, 2000);
}

// Função para gerar contatos simulados
function generateSimulatedContacts(count) {
  const names = [
    "João Silva",
    "Maria Oliveira",
    "Pedro Santos",
    "Ana Costa",
    "Carlos Souza",
    "Lúcia Pereira",
    "Roberto Almeida",
    "Fernanda Lima",
    "Antônio Gomes",
    "Juliana Martins",
  ];

  const contacts = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * names.length);
    const id = "1000" + Math.floor(Math.random() * 10000000);
    contacts.push({
      id: id,
      name: names[randomIndex],
      profile: `https://facebook.com/${id}`,
      email:
        names[randomIndex].toLowerCase().replace(" ", ".") + "@exemplo.com",
    });
  }
  return contacts;
}

// Função para exibir resultados
function displayResults(contacts) {
  const contactsCount = document.getElementById("contactsCount");
  const contactsData = document.getElementById("contactsData");

  contactsCount.textContent = `Total de contatos: ${contacts.length}`;

  let dataText = "Nome,ID,Perfil,Email\n";
  contacts.forEach((contact) => {
    dataText += `${contact.name},${contact.id},${contact.profile},${contact.email}\n`;
  });

  contactsData.value = dataText;
}

// Função para baixar os dados como CSV
function downloadCSV() {
  const contactsData = document.getElementById("contactsData").value;
  if (!contactsData) {
    alert("Nenhum dado para baixar.");
    return;
  }

  const blob = new Blob([contactsData], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "contatos_facebook.csv");
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Função para copiar dados para a área de transferência
function copyToClipboard() {
  const contactsData = document.getElementById("contactsData");
  if (!contactsData.value) {
    alert("Nenhum dado para copiar.");
    return;
  }

  contactsData.select();
  document.execCommand("copy");
  alert("Dados copiados para a área de transferência!");
}
