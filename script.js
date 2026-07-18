let windowsEscolhido = "";
let arquiteturaEscolhida = "";
let programasDisponiveis = [];


// Escolhe Windows

function selecionarWindows(windows){

    windowsEscolhido = windows;


    document.getElementById("inicio")
    .classList.add("hidden");


    document.getElementById("arquitetura")
    .classList.remove("hidden");

}



// Escolhe 32 ou 64 bits

function selecionarArquitetura(tipo){


    arquiteturaEscolhida = tipo;


    carregarProgramas();


}



// Busca o banco de programas

async function carregarProgramas(){


    const resposta = await fetch("database/apps.json");


    programasDisponiveis = await resposta.json();


    mostrarPacote();


}



// Mostra programas encontrados

function mostrarPacote(){


    document.getElementById("arquitetura")
    .classList.add("hidden");


    document.getElementById("resultado")
    .classList.remove("hidden");



    let lista = "";



    programasDisponiveis.forEach(programa => {


        lista += `
        
        <p>
        ✅ ${programa.nome}
        <br>
        <small>${programa.categoria}</small>
        </p>

        `;


    });



    document.getElementById("config")
    .innerHTML = `

    Sistema:
    <b>${windowsEscolhido}</b>

    <br><br>

    Arquitetura:
    <b>${arquiteturaEscolhida}</b>

    <hr>

    ${lista}

    `;



}



// Botão gerar pacote

function gerarPacote(){


alert(

"Pacote criado!\n\n"+
windowsEscolhido+
"\n"+
arquiteturaEscolhida+
"\n\n"+
programasDisponiveis.length+
" programas encontrados."

);


}