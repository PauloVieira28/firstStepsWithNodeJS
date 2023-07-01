const extraiLinks = (arrLinks) =>{
    return arrLinks.map((ObjetoLink) => Object.values(ObjetoLink).join())
}

const checaStatus = async (listaURls) => {
    const arrStatus = await Promise.all(
        listaURls.map(async (url) => {
            try{
                const response = await fetch(url)
                return `${response.status} - ${response.statusText}`;
            }catch(erro){
                return manejaErros(erro)
            }
            
    })
    )
    return arrStatus;  
}

const manejaErros = (erro) => {
    if(erro.cause.code === "ENOTFOUND") {
        return 'link not found'
    }else{
        return 'ocorreu algum erro';
    }
}

export default async function listaValidada(listaDeLinks){
    const links =  extraiLinks(listaDeLinks)
    const status = await checaStatus(links)
    return listaDeLinks.map((Objeto, indice) => ({
        ...Objeto, 
        status: status[indice]
    }))
}
