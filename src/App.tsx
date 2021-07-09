import React, {useEffect, useState} from 'react';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import api from './services/api';
import styled from 'styled-components';
import card from './App.module.css';
import './styles/globals.css'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import DiretoLogo from './images/img-1.png';

interface IContrato{
  id: number;
  nomedevedor: string;
  empresa: string;
  statuscontrato: boolean;
  numerocontrato: number;
}

const App: React.FC = () => {
  const [displayBasic, setDisplayBasic] = useState(false); 
  const [displayAtualizar, setDisplayAtualizar] = useState(false); 
  const [numeroAtt, setNumeroAtt] = useState(0);
  const onClick = (name: string) => {
      setDisplayBasic(true);
  }
  const onHide = (name: string) => {
      setDisplayBasic(false);
  }
  const onClickA = (name: string) => {
    setDisplayAtualizar(true);
}
const onHideA = (name: string) => {
    setDisplayAtualizar(false);
}

  const [contratosLista, setContratosLista] = useState<IContrato[]>([{
    id: 1,
    nomedevedor: 'Jeferson Silva',
    empresa: 'PA',
    statuscontrato: true,
    numerocontrato: 1
  },{
    id: 2,
    nomedevedor: 'Mateus Nascimento',
    empresa: 'PA',
    statuscontrato: false,
    numerocontrato: 2
  },{
    id: 3,
    nomedevedor: 'Jaozin Leite',
    empresa: 'PA',
    statuscontrato: false,
    numerocontrato: 3
  }, {
    id: 4,
    nomedevedor: 'Isaac Asimov',
    empresa: 'AM',
    statuscontrato: true,
    numerocontrato: 4
  },{
    id: 5,
    nomedevedor: 'Franz Kafka',
    empresa: 'AP',
    statuscontrato: true,
    numerocontrato: 5
  }  ]);
  const [nameinput,setNameinput] = useState('')
 useEffect(()=>{
   async function getData(){
     try {
       const { data } = await api.get('/retorno')
       console.log("axios get",data);
       setContratosLista(data[0]);
       console.log("axios get",contratosLista);
     } catch (err) {
       console.log(err);
     }
   }
   getData()
  }, [])
  function Status(estado:boolean) {
  
    if (estado == true) {
      return 'Vigente';
    }else{
      return 'Não Vigente';
    }
  }
  function search(dados: IContrato[]) {
   return dados.filter((contrato)=>{
     return (contrato.nomedevedor.indexOf(nameinput.trim())>-1)
   })
  }
  function Excluir(id: number){
    console.log(id);
    //  return api.delete('', id);
  }
  function NC(id: number){
    setNumeroAtt(id)
  }

  return (
    <div >
      <img src={DiretoLogo} style={{margin:"0 25% 0 25%",width:"50%",clear:"both"}}/>
      <div>
            <Dialog className={card.card} visible={displayBasic} style={{ width: '50vw' }} header="Criar Novo Contrato" onHide={() => onHide('displayBasic')}>
        <div >
        <form className="p-field" action="192.168.1.9:3038" method="post">
          <label form = "nomedevedor">Nome: </label><br/>
          <input
          type = "text" 
          id = "nomedevedor" 
          name = "nomedevedor"  
          required
          placeholder = "Digite o nome do devedor"></input><br/>
          <label form = "empresa" >Empresa: </label><br/>
          <input 
          type = "text" 
          id = "empresa" 
          name = "empresa"  
          required
          placeholder = "Digite o nome da empresa"></input><br/>
          <input type = "radio" id = "true" value = "true" name="statuscontrato" defaultChecked></input>
          <label form = "true">Vigente</label><br/>
          <input type = "radio" id = "false" value = "false" name="statuscontrato"></input>
          <label form = "false">Não Vigente</label><br/>
          <input type = "submit" value = "ENVIAR" className={card.submit} ></input>
        </form>
          </div>
            </Dialog>
      </div>
      <Dialog className={card.card} visible={displayAtualizar} style={{ width: '50vw' }} header="Atualizar Contrato" onHide={() => onHideA('displayAtualizar')}>
        <div >
        <form className="p-field" action="192.168.1.9:3038" method="put">
          <h2>Contrato N° {numeroAtt}</h2>
          <label form = "nomedevedor">Nome: </label><br/>
          <input
          type = "text" 
          id = "nomedevedor" 
          name = "nomedevedor"  
          required
          placeholder = "Digite o nome do devedor"></input><br/>
          <label form = "empresa" >Empresa: </label><br/>
          <input 
          type = "text" 
          id = "empresa" 
          name = "empresa"  
          required
          placeholder = "Digite o nome da empresa"></input><br/>
          <input type = "radio" id = "true" value = "true" name="statuscontrato" defaultChecked></input>
          <label form = "true">Vigente</label><br/>
          <input type = "radio" id = "false" value = "false" name="statuscontrato"></input>
          <label form = "false">Não Vigente</label><br/>
          <input type = "submit" value = "ENVIAR" className={card.submit} ></input>
        </form>
          </div>
            </Dialog>
          <h1>Contratos</h1>
      <ul>
      <label htmlFor="search-form">
            <h2>Buscar Contrato</h2><br/>
              <input
              style={{width:"50%", height:"30px", fontSize:"18px",marginBottom:"30px"}}
              type="search"
              name="search-form"
              id="search-form"
              placeholder="Nome..."
              value={nameinput}
              onChange={(e)=>setNameinput(e.target.value)}
              />
          </label>
          <Button label="Criar Novo Contrato" style={{marginLeft: "33%",marginBottom:"20px"}}  onClick={() => onClick('displayBasic')} />
        <table >
        <tr >
    <th >Nome</th>
    <th >Status</th> 
    <th >Empresa</th>
    <th >Numero Contrato</th>
        </tr>
          {search(contratosLista).map(nomes=>(  
        <tr key={nomes.id}>
    <td >{nomes.nomedevedor}</td>
    <td >{Status(nomes.statuscontrato)}</td> 
    <td >{nomes.empresa}</td>
    <td >{nomes.numerocontrato}</td>
    <td ><button onClick={()=>Excluir(nomes.id)}>Excluir</button></td>
    <td ><button className={card.update} onClick={() => {onClickA('displayAtualizar');NC(nomes.numerocontrato)}}>Atualizar</button></td>
        </tr>
          ))}
        </table>
      </ul>
    </div>
  );
}

export default App;
