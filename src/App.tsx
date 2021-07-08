import React, {useEffect, useState} from 'react';
import api from './services/api';
import styled from 'styled-components';
import card from './App.module.css';
import './styles/globals.css'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import DiretoLogo from './images/img-1.png';
import { left } from '@popperjs/core';
interface IContrato{
  dtr_id: number;
  dtr_nomedevedor: string;
  dtr_estadodevedor: string;
  dtr_status: boolean;
  dtr_cidadedevedor: string;
}

const App: React.FC = () => {
  const [displayBasic, setDisplayBasic] = useState(false); 

  const onClick = (name: string) => {
      setDisplayBasic(true);
  }
  const onHide = (name: string) => {
      setDisplayBasic(false);
  }
  const renderFooter = (name: string) => {
      return (
          <div>
              <Button style={{marginLeft:"90%",color:"red"}} label="Close" onClick={() => onHide(name)} />
          </div>
      );
  }
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
  const param = ["dtr_nomedevedor"]
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
  
  function search(dados: IContrato[]) {
   return dados.filter((contrato)=>{
     return (contrato.dtr_nomedevedor.indexOf(nameinput.trim())>-1)
   })
  }

  return (
    <div >
      <img src={DiretoLogo} style={{margin:"0 25% 0 25%",width:"50%"}}/>
      
            <Button label="Criar Novo Contrato" icon="pi pi-external-link" onClick={() => onClick('displayBasic')} />
      <div>
            <Dialog className={card.card} visible={displayBasic} style={{ width: '50vw' }} header={renderFooter('displayBasic')} onHide={() => onHide('displayBasic')}>
        <div >
        <form>
                <h2>Criar novo contrato</h2>
          <label form = "dtr_nomedevedor">Nome: </label><br/>
          <input
          type = "text" 
          id = "dtr_nomedevedor" 
          name = "dtr_nomedevedor"  
          required
          placeholder = "Digite o nome do devedor"></input><br/>
          <label form = "dtr_estadodevedor" >Estado: </label><br/>
          <input 
          type = "text" 
          id = "dtr_estadodevedor" 
          name = "dtr_estadodevedor"  
          required
          placeholder = "Digite estado"></input><br/>
          <label form = "dtr_cidadedevedor">Cidade: </label><br/>
          <input 
          type = "text" id = "dtr_cidadedevedor" 
          name = "dtr_cidadedevedor"  
          required
          placeholder = "Digite a cidade"></input><br/>
          <input type = "radio" id = "true" value = "true" name="dtr_status" defaultChecked></input>
          <label form = "true">Vigente</label><br/>
          <input type = "radio" id = "false" value = "false" name="dtr_status"></input>
          <label form = "false">Não Vigente</label><br/>
          <input type = "submit" value = "ENVIAR" className={card.submit}></input>
        </form>
          </div>
            </Dialog>
      </div>
      <label htmlFor="search-form">
            <span>Digite seu nome aqui</span><br/>
              <input
              type="search"
              name="search-form"
              id="search-form"
              placeholder="Nome..."
              value={nameinput}
              onChange={(e)=>setNameinput(e.target.value)}
              />
          </label>
          <h1>Contratos</h1>
      <ul>
        <table >
        <div >
        <tr >
    <th >Nome</th>
    <th >Status</th> 
    <th >Estado</th>
    <th >ID</th>
        </tr>
          {search(contratosLista).map(nomes=>(  
        <tr key={nomes.dtr_id}>
    <th >{nomes.dtr_nomedevedor}</th>
    <th >{nomes.dtr_status}</th> 
    <th >{nomes.dtr_estadodevedor}</th>
    <th >{nomes.dtr_id}</th>
    <th ><button style={{color:"red"}}>Excluir</button></th>
        </tr>
          ))}
        </div>
        </table>
      </ul>
    </div>
  );
}

export default App;
