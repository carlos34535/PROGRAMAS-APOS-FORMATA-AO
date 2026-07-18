let windowsEscolhido = "";
let arquiteturaEscolhida = "";

let programasSelecionados = [];

let todosProgramas = [];




// ================================
// ESCOLHER WINDOWS
// ================================

function selecionarWindows(windows){

    windowsEscolhido = windows;


    document.getElementById("telaWindows").style.display = "none";


    document.getElementById("telaArquitetura").style.display = "block";


}





// ================================
// ESCOLHER ARQUITETURA
// ================================

function selecionarArquitetura(tipo){

    arquiteturaEscolhida = tipo;


    document.getElementById("telaArquitetura").style.display = "none";


    carregarProgramas();


}





// ================================
// CARREGAR PROGRAMAS
// ================================

async function carregarProgramas(){


    try{


        const resposta = await fetch("./database/apps.json");


        const programas = await resposta.json();


        todosProgramas = programas;



        document.getElementById("resultado").style.display = "block";



        document.getElementById("config").innerHTML = `


        Windows:
        <b>${windowsEscolhido}</b>


        <br><br>


        Arquitetura:
        <b>${arquiteturaEscolhida}</b>


        `;



        mostrarLista(todosProgramas);



    }


    catch(error){


        console.log(error);


        alert("Erro ao carregar aplicativos");


    }


}







// ================================
// MOSTRAR LISTA
// ================================

function mostrarLista(programas){



    let lista = "";



    programas.forEach((programa,index)=>{


        lista += `


        <div class="item">


        <input

        type="checkbox"

        id="prog${index}"

        onchange="selecionarPrograma('${programa.nome}')"

        >



        <label for="prog${index}">


        <b>${programa.nome}</b>


        <br>


        <small>${programa.categoria}</small>


        </label>


        </div>


        <br>


        `;


    });



    document.getElementById("listaProgramas")
    .innerHTML = lista;



}







// ================================
// BUSCAR APLICATIVO
// ================================

function buscarAplicativo(){



    let texto = document
    .getElementById("buscaApp")
    .value
    .toLowerCase();



    let filtrados = todosProgramas.filter(programa =>



        programa.nome
        .toLowerCase()
        .includes(texto)



    );



    mostrarLista(filtrados);



}








// ================================
// SELECIONAR PROGRAMAS
// ================================

function selecionarPrograma(nome){



    if(programasSelecionados.includes(nome)){


        programasSelecionados =
        programasSelecionados.filter(
            item => item !== nome
        );


    }

    else{


        programasSelecionados.push(nome);


    }



}








// ================================
// GERAR INSTALADOR BAT
// ================================

function gerarPacote(){



    if(programasSelecionados.length === 0){


        alert("Selecione pelo menos um aplicativo");


        return;


    }





let bat = `

@echo off

title PC RESET KIT

echo ==========================
echo PC RESET KIT
echo Instalando aplicativos
echo ==========================

`;





programasSelecionados.forEach(programa=>{


bat += `

echo Instalando ${programa}...

`;



});






bat += `

echo.

echo INSTALACAO FINALIZADA

pause

`;







let arquivo = new Blob(

[bat],

{type:"application/bat"}

);





let link = document.createElement("a");



link.href =
URL.createObjectURL(arquivo);



link.download =
"PC_RESET_KIT.bat";



link.click();



}







// ================================
// VOLTAR WINDOWS
// ================================

function voltarWindows(){


document.getElementById("telaArquitetura")
.style.display="none";


document.getElementById("telaWindows")
.style.display="block";


}








// ================================
// VOLTAR ARQUITETURA
// ================================

function voltarArquitetura(){


document.getElementById("resultado")
.style.display="none";


document.getElementById("telaArquitetura")
.style.display="block";


}
