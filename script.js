let windowsEscolhido = "";
let arquiteturaEscolhida = "";


function selecionarWindows(windows){

    windowsEscolhido = windows;

    document.getElementById("inicio").style.display = "none";

    document.getElementById("arquitetura").style.display = "block";

}



function selecionarArquitetura(tipo){

    arquiteturaEscolhida = tipo;

    document.getElementById("arquitetura").style.display = "none";

    carregarProgramas();

}



async function carregarProgramas(){

    const resposta = await fetch("./database/apps.json");

    const programas = await resposta.json();


    let lista = "";


    programas.forEach(programa => {

        lista += `
        
        <div class="card">
        ✅ ${programa.nome}
        <br>
        <small>${programa.categoria}</small>
        </div>

        `;

    });



    document.getElementById("resultado").style.display="block";


    document.getElementById("config").innerHTML = `

    Windows:
    <b>${windowsEscolhido}</b>

    <br>

    Arquitetura:
    <b>${arquiteturaEscolhida}</b>

    <hr>

    ${lista}

    `;


}



function gerarPacote(){

alert("Pacote criado!");

}
