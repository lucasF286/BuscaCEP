const mensagemErro = document.querySelector("#mensagemErro");
const cepbusca = document.querySelector("#cep");
const numero = document.querySelector("#numero");
const logradouro = document.querySelector("#logradouro");
const bairro = document.querySelector("#bairro");
const localidade = document.querySelector("#localidade");
const uf = document.querySelector("#uf");
const btnBuscar =  document.querySelector("#botao_buscar");
const btnLimpar =  document.querySelector("#botao_limpar");
const btnSalvar =  document.querySelector("#botao_salvar"); 
let endereco; 

btnBuscar.addEventListener('click', (e) => {
    e.preventDefault(); 
    try{
        validaCEP();
    }catch(erro){
        mensagemErro.innerHTML = erro.message;
    }
})

btnLimpar.addEventListener('click', () => {
    limparCampos();
})

btnSalvar.addEventListener('click', (e) => {
    e.preventDefault();
    try{
        salvaDados();
    }catch(erro){
        mensagemErro.innerHTML = erro.message;
    }
})

function buscaEndereco(){
    fetch(`http://viacep.com.br/ws/${cepbusca.value}/json/`)
        .then((resposta) => {
            return resposta.json();
        })
        .then((endereco) => {
            preencheEndereço(endereco);
    })
    .catch((erro) => {
        console.log(erro);
    })
}

function preencheEndereço(end){
    for(const campo in end){
        if(document.querySelector("#"+campo)){
            document.querySelector("#"+campo).value = end[campo];
        }
    }
}

function limparCampos(){
    cepbusca.value = "";
    logradouro.value = "";
    numero.value = "";
    bairro.value = "";
    localidade.value = "";
    uf.value = "";
    mensagemErro.innerHTML = "";
}

function validaCEP(){
    const regex = /^\d{5}[-]\d{3}$/;
    if(regex.test(cepbusca.value)){
        mensagemErro.innerHTML = '';
        buscaEndereco();
    }  else{
        throw new Error("CEP inválido");
    }
}

function salvaDados(){
    if(numero.value === ''){
        throw new Error("Campo número não preenchido!");
    }else{
        alert("Dados salvos com sucesso!");
        limparCampos();
    }
}



