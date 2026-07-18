let windowsEscolhido="";
let arquiteturaEscolhida="";
let programasSelecionados=[];
let todosProgramas=[];




function selecionarWindows(windows){

windowsEscolhido=windows;

document.getElementById("telaWindows").style.display="none";

document.getElementById("telaArquitetura").style.display="block";

}




function selecionarArquitetura(tipo){

arquiteturaEscolhida=tipo;

document.getElementById("telaArquitetura").style.display="none";

carregarProgramas();

}





async function carregarProgramas(){

try{


let resposta=await fetch("./database/apps.json");


todosProgramas=await resposta.json();



document.getElementById("resultado").style.display="block";



document.getElementById("config").innerHTML=

`
Windows:
<b>${windowsEscolhido}</b>

<br><br>

Arquitetura:
<b>${arquiteturaEscolhida}</b>

<hr>
`;



mostrarLista(todosProgramas);



}

catch(e){

alert("Erro ao carregar aplicativos");

}



}






function mostrarLista(programas){


let lista="";



programas.forEach((programa,index)=>{


lista+=`

<div class="item">

<input 
type="checkbox"
id="prog${index}"
onchange="selecionarPrograma('${programa.nome}')">


<label>

<b>${programa.nome}</b>

<br>

<small>${programa.categoria}</small>

</label>


</div>


`;



});



document.getElementById("listaProgramas").innerHTML=lista;


}







function buscarAplicativo(){


let texto=document
.getElementById("buscaApp")
.value
.toLowerCase();



let resultado=todosProgramas.filter(app=>

app.nome.toLowerCase().includes(texto)

);



mostrarLista(resultado);


}







function selecionarPrograma(nome){


if(programasSelecionados.includes(nome)){


programasSelecionados =
programasSelecionados.filter(item=>item!==nome);


}

else{


programasSelecionados.push(nome);


}


}







function gerarPacote(){


if(programasSelecionados.length==0){

alert("Selecione pelo menos um aplicativo");

return;

}



let bat="@echo off\n\n";

bat+="title PC RESET KIT\n\n";


programasSelecionados.forEach(app=>{


bat+=`

echo Instalando ${app}

winget install "${app}" --silent


`;


});



bat+="\necho Finalizado\npause";




let arquivo=new Blob(

[bat],

{type:"application/bat"}

);



let link=document.createElement("a");


link.href=URL.createObjectURL(arquivo);


link.download="PC_RESET_KIT.bat";


link.click();


}








function voltarWindows(){


document.getElementById("telaArquitetura").style.display="none";


document.getElementById("telaWindows").style.display="block";


}






function voltarArquitetura(){


document.getElementById("resultado").style.display="none";


document.getElementById("telaArquitetura").style.display="block";


}
