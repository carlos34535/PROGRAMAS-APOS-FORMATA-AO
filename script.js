let windowsEscolhido = "";
let arquiteturaEscolhida = "";


// ===============================
// ESCOLHER WINDOWS
// ===============================

function selecionarWindows(windows) {

    windowsEscolhido = windows;


    document.getElementById("telaWindows").style.display = "none";


    document.getElementById("telaArquitetura").style.display = "block";

}




// ===============================
// ESCOLHER ARQUITETURA
// ===============================

function selecionarArquitetura(tipo) {


    arquiteturaEscolhida = tipo;


    document.getElementById("telaArquitetura").style.display = "none";


    carregarProgramas();

}





// ===============================
// CARREGAR BANCO DE PROGRAMAS
// ===============================


async function carregarProgramas() {


    try {


        const resposta = await fetch(
            "/PROGRAMAS-APOS-FORMATA-AO/database/apps.json"
        );



        if (!resposta.ok) {

            throw new Error("Arquivo apps.json não encontrado");

        }



        const programas = await resposta.json();



        mostrarProgramas(programas);



    } catch (erro) {


        console.log("ERRO:", erro);



        document.getElementById("resultado").style.display = "block";



        document.getElementById("config").innerHTML = `

        <h3>Erro ao carregar banco de programas</h3>

        <p>
        Verifique o arquivo:
        </p>

        <b>database/apps.json</b>

        `;


    }


}






// ===============================
// MOSTRAR PROGRAMAS NA TELA
// ===============================


function mostrarProgramas(programas) {



    document.getElementById("resultado").style.display = "block";



    let lista = "";



    programas.forEach(programa => {



        lista += `

        <div class="item">

        ✅ <b>${programa.nome}</b>

        <br>

        <small>${programa.categoria}</small>

        </div>


        `;


    });





    document.getElementById("config").innerHTML = `


    <p>
    Windows:
    <b>${windowsEscolhido}</b>
    </p>


    <p>
    Arquitetura:
    <b>${arquiteturaEscolhida}</b>
    </p>


    <hr>


    <h3>Programas disponíveis:</h3>


    ${lista}


    `;



}






// ===============================
// GERAR PACOTE
// ===============================


function gerarPacote() {


    alert(

    "Pacote criado!\n\n" +

    "Sistema: " + windowsEscolhido +

    "\nArquitetura: " + arquiteturaEscolhida

    );


}
