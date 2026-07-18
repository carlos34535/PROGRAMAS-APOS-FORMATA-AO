function gerarPacote(){


if(programasSelecionados.length === 0){


alert("Selecione pelo menos um programa");


return;


}



let bat = `@echo off

title PC RESET KIT - Instalador

echo =====================================
echo       PC RESET KIT
echo Instalando programas selecionados
echo =====================================

echo.

`;



programasSelecionados.forEach(programa => {


if(programa === "Google Chrome"){

bat += `
echo Instalando Google Chrome...
winget install Google.Chrome --silent
`;

}


if(programa === "7-Zip"){

bat += `
echo Instalando 7-Zip...
winget install 7zip.7zip --silent
`;

}


if(programa === "VLC Player"){

bat += `
echo Instalando VLC Player...
winget install VideoLAN.VLC --silent
`;

}


if(programa === "Java"){

bat += `
echo Instalando Java...
winget install Oracle.JavaRuntimeEnvironment --silent
`;

}


if(programa === "Visual C++ Redistributable"){

bat += `
echo Instalando Visual C++...
winget install Microsoft.VCRedist.2015+.x64 --silent
`;

}


});



bat += `

echo.
echo =====================================
echo INSTALACAO FINALIZADA
echo =====================================

pause
`;




let arquivo = new Blob(
[bat],
{type:"application/bat"}
);



let link=document.createElement("a");


link.href=URL.createObjectURL(arquivo);


link.download="PC_RESET_KIT.bat";


link.click();


}
