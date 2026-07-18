let windowsEscolhido = "";
let arquiteturaEscolhida = "";

let programasSelecionados = [];




// ESCOLHER WINDOWS

function selecionarWindows(windows){


windowsEscolhido = windows;


document.getElementById("telaWindows").style.display="none";


document.getElementById("telaArquitetura").style.display="block";


}





// ESCOLHER ARQUITETURA


function selecionarArquitetura(tipo){


arquiteturaEscolhida = tipo;


document.getElementById("telaArquitetura").style.display="none";


carregarProgramas();


}






// BUSCAR PROGRAMAS


async function carregarProgramas(){


try{


const resposta = await fetch("./database/apps.json");


const programas = await resposta.json();



document.getElementById("resultado").style.display="block";



document.getElementById("config").innerHTML=

`

Windows:
<b>${windowsEscolhido}</b>

<br><br>

Arquitetura:
<b>${arquiteturaEscolhida}</b>

`;




let lista="";



programas.forEach((programa,index)=>{


lista += `


<div class="item">


<input 
type="checkbox"
id="prog${index}"
value="${programa.nome}"
onchange="selecionarPrograma('${programa.nome}')">


<label for="prog${index}">

<b>${programa.nome}</b>

<br>

<small>${programa.categoria}</small>

</label>


</div>


`;


});



document.getElementById("listaProgramas").innerHTML = lista;



}

catch(error){


console.log(error);


document.getElementById("listaProgramas").innerHTML=

"Erro ao carregar programas";


}



}







// MARCAR PROGRAMAS


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








// GERAR PACOTE


function gerarPacote(){



if(programasSelecionados.length === 0){


alert("Selecione pelo menos um programa");


return;


}



let texto =

"PC RESET KIT\n\n"+

windowsEscolhido+
"\n"+
arquiteturaEscolhida+
"\n\nProgramas:\n\n";



programasSelecionados.forEach(programa=>{


texto += "✔ "+programa+"\n";


});



let arquivo = new Blob(
[texto],
{type:"text/plain"}
);



let link=document.createElement("a");


link.href=URL.createObjectURL(arquivo);


link.download="PC_RESET_KIT.txt";


link.click();



}
