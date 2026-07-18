let windowsEscolhido = "";
let arquiteturaEscolhida = "";
let programasSelecionados = [];


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



        document.getElementById("resultado").style.display = "block";



        document.getElementById("config").innerHTML = `

        Windows:
        <b>${windowsEscolhido}</b>

        <br><br>

        Arquitetura:
        <b>${arquiteturaEscolhida}</b>

        <hr>

        `;



        let lista = "";



        programas.forEach((programa,index)=>{


            lista += `

            <div class="item">


            <input 
            type="checkbox"
            id="prog${index}"
            onchange="selecionarPrograma('${programa.nome}')">


            <label for="prog${index}">

            <b>${programa.nome}</b>

            <br>

            <small>${programa.categoria}</small>

            </label>


            </div>

            <br>


            `;


        });



        document.getElementById("listaProgramas").innerHTML = lista;



    }


    catch(error){


        console.log(error);


        alert("Erro ao carregar programas");


    }


}




// ================================
// SELECIONAR PROGRAMAS
// ================================

function selecionarPrograma(nome){


    if(programasSelecionados.includes(nome)){


        programasSelecionados =
        programasSelecionados.filter(item => item !== nome);


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

        alert("Selecione pelo menos um programa");

        return;

    }



    let bat = `@echo off

title PC RESET KIT

echo ===============================
echo PC RESET KIT
echo Instalando programas
echo ===============================

`;



    programasSelecionados.forEach(programa=>{


        if(programa=="Google Chrome"){

            bat += `
echo Instalando Google Chrome...
winget install Google.Chrome --silent

`;

        }



        if(programa=="7-Zip"){

            bat += `
echo Instalando 7-Zip...
winget install 7zip.7zip --silent

`;

        }



        if(programa=="VLC Player"){

            bat += `
echo Instalando VLC Player...
winget install VideoLAN.VLC --silent

`;

        }



        if(programa=="Java"){

            bat += `
echo Instalando Java...
winget install Oracle.JavaRuntimeEnvironment --silent

`;

        }



        if(programa=="Visual C++ Redistributable"){

            bat += `
echo Instalando Visual C++...
winget install Microsoft.VCRedist.2015+.x64 --silent

`;

        }



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


    link.href = URL.createObjectURL(arquivo);


    link.download = "PC_RESET_KIT.bat";


    link.click();


}






// ================================
// VOLTAR PARA WINDOWS
// ================================

function voltarWindows(){


    document.getElementById("telaArquitetura").style.display = "none";


    document.getElementById("telaWindows").style.display = "block";


}






// ================================
// VOLTAR PARA ARQUITETURA
// ================================

function voltarArquitetura(){


    document.getElementById("resultado").style.display = "none";


    document.getElementById("telaArquitetura").style.display = "block";


}
