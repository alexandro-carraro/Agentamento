<?php
include 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nome = $_POST['nome'];
    $celular = $_POST['celular'];
    $cep = $_POST['cep'];
    $rua = $_POST['rua'];
    $bairro = $_POST['bairro'];
    $numero_logradouro = $_POST['numero_logradouro'];
    $data_agendamento = $_POST['data_agendamento'];

    // Verifica se já existe agendamento para o mesmo endereço e data
    $sql = "SELECT id FROM agendamentos WHERE rua='$rua' AND numero_logradouro=$numero_logradouro AND data_agendamento='$data_agendamento'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        header('Location: ../index.html?msg=erro');
    } else {
        $sql = "INSERT INTO agendamentos (nome, celular, cep, rua, bairro, numero_logradouro, data_agendamento) 
                VALUES ('$nome', '$celular', '$cep', '$rua', '$bairro', $numero_logradouro, '$data_agendamento')";

        if ($conn->query($sql) === TRUE) {
            header('Location: ../index.html?msg=sucesso');
        } else {
            header('Location: ../index.html?msg=falha');
        }
    }
}

$conn->close();
?>
