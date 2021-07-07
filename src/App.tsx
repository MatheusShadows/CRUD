import React, {useEffect, useState} from 'react';
import api from './services/api';
import styled from 'styled-components';
import card from './App.module.css';
interface IContrato{
  dtr_id: number;
  dtr_nomedevedor: string;
  dtr_estadodevedor: string;
  dtr_status: boolean;
  dtr_cidadedevedor: string;
}

const App: React.FC = () => {
  const [contratosLista, setContratosLista] = useState<IContrato[]>([{
    dtr_id: 1,
    dtr_nomedevedor: 'Jeferson Silva',
    dtr_estadodevedor: 'PA',
    dtr_status: true,
    dtr_cidadedevedor: 'Belém',
  },{
    dtr_id: 2,
    dtr_nomedevedor: 'Mateus Nascimento',
    dtr_estadodevedor: 'PA',
    dtr_status: false,
    dtr_cidadedevedor: 'Belém',
  },{
    dtr_id: 3,
    dtr_nomedevedor: 'Jaozin Leite',
    dtr_estadodevedor: 'PA',
    dtr_status: false,
    dtr_cidadedevedor: 'Belém',
  }, {
    dtr_id: 4,
    dtr_nomedevedor: 'Isaac Asimov',
    dtr_estadodevedor: 'AM',
    dtr_status: true,
    dtr_cidadedevedor: 'Manaus',
  },{
    dtr_id: 5,
    dtr_nomedevedor: 'Franz Kafka',
    dtr_estadodevedor: 'AP',
    dtr_status: true,
    dtr_cidadedevedor: 'Macapá',
  }  ]);
  const [nameinput,setNameinput] = useState('')
//  useEffect(()=>{
//    async function getData(){
//      try {
//        const { data } = await api.get('/dadosProtesto/ListaTitulos')
//        setContratosLista(data.DadosListTitulos);
//     } catch (err) {
//        console.log(err);
//      }
//   }
//    getData()
//  })
  
  // function search(dados: [IContrato]) {
  //   return dados.filter((contrato)=>{
  //     return (contrato.dtr_nomedevedor.indexOf(nameinput.trim().toLowerCase())>-1)
  //   })
  // }

  return (
    <div className={card.txt}>
      <h1>Hello World</h1>
      <div>
      <label htmlFor="search-form">
            <span>Digite seu nome aqui</span>
              <input
              type="search"
              name="search-form"
              id="search-form"
              placeholder="Nome..."
              value={nameinput}
              onChange={(e)=>setNameinput(e.target.value)}
              />
          </label>
      </div>
      <ul>
        <div >
          {contratosLista.map(nomes=>(
            <div key={nomes.dtr_id}>
            <h1>Nome: {nomes.dtr_nomedevedor}</h1>
            <h1>Status: {nomes.dtr_status}</h1>
            <h2>Estado: {nomes.dtr_estadodevedor}</h2>
            <h2>ID: {nomes.dtr_id}</h2>
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
}

export default App;
