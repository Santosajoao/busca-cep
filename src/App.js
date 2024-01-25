import {useState} from 'react';
import {FaSearchLocation} from 'react-icons/fa';
import "./Styles.css";
import Api from './services/Api';


function App(){

  var [input, setInput] = useState('')
  var [data, setData] = useState({})

  async function handleSearch(){
    
    if(input === ""){
    alert("Preencha algum CEP")
    return;
    } 

    try{
      
      var response = await Api.get(input + '/json');

      setData(response.data);
      setInput("");

    }
    catch{
      alert("Erro ao buscar o CEP");
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        
        <input 
        type="text"
        placeholder="Digite o seu CEP"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        />

        

        <button className="buttonSearch" onClick={handleSearch}>
          <FaSearchLocation size="25" color="	#FFFF"/>
        </button>
      </div>

      {Object.keys(data).length > 0 &&(
      <main className="main">
        <h2>CEP: {data.cep}</h2>
        <span>Rua: {data.logradouro}</span>
        <span>Bairro: {data.bairro}</span>
        <span>Cidade: {data.localidade}</span>
        <span>Estado: {data.uf}</span>
        <span>DDD: {data.ddd}</span>
      </main>
      )}
    </div>   
    
  );
}

export default App;
