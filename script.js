let windowsEscolhido = "";
let arquiteturaEscolhida = "";




// ESCOLHER WINDOWS

function selecionarWindows(windows){


windowsEscolhido = windows;



document.getElementById("telaWindows")
.style.display="none";



document.getElementById("telaArquitetura")
.style.display="block";



}






// ESCOLHER ARQUITETURA


function selecionarArquitetura(tipo){


arquiteturaEscolhida = tipo;



document.getElementById("telaArquitetura")
.style.display="none";



carregarProgramas();


}








// BUSCAR PROGRAMAS


async function carregarProgramas(){



try{


let resposta = await fetch("/PROGRAMAS-APOS-FORMATA-AO/database/apps.json");



let programas = await resposta.json();



mostrarProgramas(programas);



}

catch(error){


document.getElementById("resultado")
.style.display="block";



document.getElementById("config")
.innerHTML=

"Erro ao carregar banco de programas";



console.log(error);


}



}








// MOSTRAR PROGRAMAS


function mostrarProgramas(programas){



document.getElementById("resultado")
.style.display="block";



let lista="";



programas.forEach(programa=>{


lista += `


<div class="item">


✅ <b>${programa.nome}</b>

<br>

<small>
${programa.categoria}
</small>


</div>



`;



});






document.getElementById("config")
.innerHTML=



`

Windows:
<b>${windowsEscolhido}</b>


<br><br>


Arquitetura:
<b>${arquiteturaEscolhida}</b>


<hr>


${lista}


`;



}







// BOTÃO FINAL


function gerarPacote(){



alert(

"Pacote criado!\n\n"+
windowsEscolhido+
"\n"+
arquiteturaEscolhida


);



}
