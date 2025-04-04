document.getElementById('buscar-endereco').addEventListener('click', function() {
    var cep = document.getElementById('cep').value;

    if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById('rua').value = data.logradouro;
                    document.getElementById('bairro').value = data.bairro;
                } else {
                    alert('CEP não encontrado!');
                }
            })
            .catch(error => alert('Erro ao buscar o endereço.'));
    } else {
        alert('Por favor, insira um CEP válido!');
    }
});

document.getElementById('calendario-icon').addEventListener('click', function() {
    document.getElementById('calendar').style.display = 'block';
});

document.getElementById('calendar-date').addEventListener('change', function() {
    var selectedDate = document.getElementById('calendar-date').value;
    if (selectedDate) {
        document.getElementById('data_agendamento').value = selectedDate;
        document.getElementById('calendar').style.display = 'none';
    }
});

document.getElementById('form-agendamento').addEventListener('submit', function(e) {
    var nome = document.getElementById('nome').value;
    var celular = document.getElementById('celular').value;
    var cep = document.getElementById('cep').value;
    var rua = document.getElementById('rua').value;
    var bairro = document.getElementById('bairro').value;
    var numero_logradouro = document.getElementById('numero_logradouro').value;
    var data_agendamento = document.getElementById('data_agendamento').value;

    if (!nome || !celular || !cep || !rua || !bairro || !numero_logradouro || !data_agendamento) {
        e.preventDefault();
        alert('Por favor, preencha todos os campos!');
    }
});

// Função para exibir mensagens no modal
function showAlert(message) {
    document.getElementById("alert-message").innerText = message;
    document.getElementById("alert-modal").style.display = "flex";
}

// Fechar o modal
function closeAlert() {
    document.getElementById("alert-modal").style.display = "none";
}

// Exibir alerta baseado na URL
window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get('msg');

    if (msg === 'sucesso') {
        showAlert('Agendamento realizado com sucesso! Na sequência será enviado a confirmação em seu whatsapp.');
    } else if (msg === 'erro') {
        showAlert('Já existe um agendamento para esse endereço na data selecionada. Tente outra data!');
    } else if (msg === 'falha') {
        showAlert('Ocorreu um erro ao tentar realizar o agendamento. Tente novamente.');
    }
};
