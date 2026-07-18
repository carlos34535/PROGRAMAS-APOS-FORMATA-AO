let windowsEscolhido = "";
let arquiteturaEscolhida = "";


// Escolha do Windows

function selecionarWindows(windows) {

    windowsEscolhido = windows;

    document.getElementById("telaWindows").style.display = "none";

    document.getElementById("telaArquitetura").style.display = "block";

}



// Escolha da arquitetura

function selecionarArquitetura(tipo) {

    arquiteturaEscolhida = tipo;

    document.getElementById("telaArquitetura").style.display = "none";

    carregarProgramas();

}



// Carregar programas do banco JSON

async function carregarProgramas() {


    try {


        const resposta = await fetch("./database/apps.json");


        const programas = await resposta.json();


        mostrarProgramas(programas);



    } catch (erro) {


        console.log(erro);


        document.getElementById("resultado").style.display = "block";


        document.getElementById("config").innerHTML =

        `
        <h3>Erro ao carregar banco de programas</h3>

        Verifique:
        <br><br>

        database/apps.json

        `;


    }


}




// Mostrar programas

function mostrarProgramas(programas) {


    document.getElementById("resultado").style.display = "block";


    let lista = "";



    programas.forEach(programa => {


        lista += `

        <div class="item">

        ✅ <b>${programa.nome}</b>

        <br>

        ${programa.categoria}

        </div>

        <br>

        `;


    });



    document.getElementById("config").innerHTML =


    `

    Windows:
    <b>${windowsEscolhido}</b>

    <br><br>

    Arquitetura:
    <b>${arquiteturaEscolhida}</b>


    <hr>


    <h3>Programas:</h3>


    ${lista}

    `;


}




// Botão gerar pacote

function gerarPacote() {


alert(

"Pacote criado!\n\n"+
windowsEscolhido+
"\n"+
arquiteturaEscolhida

);


}
