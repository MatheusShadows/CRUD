import React, {useEffect, useState, useRef} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import card from '../styles/App.module.css';
import api from '../services/api';
import { SelectButton } from 'primereact/selectbutton';
import { InputNumber } from 'primereact/inputnumber';
import { Tag } from 'primereact/tag';

interface IContrato{
    id: number;
    nomedevedor: string;
    empresa: string;
    statuscontrato: boolean;
    numerocontrato: number;
  }

const Table = () =>{
    const [contratosLista,setContratosLista] = useState<IContrato[]>([{
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
    const [globalFilter, setGlobalFilter] = useState('');
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [displayAtualizar, setDisplayAtualizar] = useState(false); 
    const [displayDeletar, setDisplayDeletar] = useState(false); 
    const [statuscontrato, setStatuscontrato] = useState<boolean>(false);
    const [empresa, setEmpresa] = useState<string>('');
    const [nomedevedor, setNomedevedor] = useState('');
    const [numerocontrato, setNumerocontrato] = useState<number>(0);
    const [iD, setID] = useState(0)
    const statuses = [{
      name: 'Vigente', value: true},
      {name: 'Não Vigente', value: false}];
    const options = [{
      name: 'Vigente', value: true},
      {name: 'Não Vigente', value: false}];
      
  const onHideA = (name: string) => {
      setDisplayAtualizar(false);
  }
  const onHideDelete = (name: string) => {
    setDisplayDeletar(false);
}
  
  const editProduct = (product:any) => {
    setID(product.id);
    setDisplayAtualizar(true);
}
  const confirmDeleteProduct=(product:any)=>{
    setID(product.id);
    setDisplayDeletar(true);
}

    const dt = useRef(null);

  const statusFilter = <Dropdown optionLabel="name" optionValue="value" value={selectedStatus} options={statuses} onChange={(e) => setSelectedStatus(e.value)} placeholder="Select a Status" className="p-column-filter" showClear />;
    const header = (
        <div className="table-header">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Busca global" />
            </span>
        </div>
    ); 
    const Update=()=>{
      try {
        api.put(`/posts/${iD}`, {nomedevedor,empresa,statuscontrato,numerocontrato})
      } catch (err) {
        console.log(err);
      }
    }
    const Delete=()=>{
      try {
        api.delete(`/posts/${iD}`);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
     
    useEffect(()=>{
      async function getData(){
        try {
          const { data } = await api.get('/posts')
          console.log("axios get",data);
          setContratosLista(data);
          console.log("axios contratos",contratosLista);
        } catch (err) {
          console.log(err);
        }
      }
      getData()
     }, [])
     const actionBodyTemplate = (rowData:any) => {
      return (
          <React.Fragment>
              <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editProduct(rowData)} />
              <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
          </React.Fragment>
      );
  }
  const deleteProductDialogFooter = (
    <React.Fragment>
        <Button label="No" icon="pi pi-times" className="p-button-text" onClick= {() => onHideDelete('displayDeletar')} />
        <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={Delete} />
    </React.Fragment>
  );
  const statusBodyTemplate = (rowData: any) => {
      if(rowData.statuscontrato == true){
        return (
        <React.Fragment>
          <Tag className="p-mr-2" icon="pi pi-check" severity="success" value="Vigente"></Tag>
        </React.Fragment>)}
        else{
        return (
          <React.Fragment>
          <Tag className="p-mr-2" icon="pi pi-exclamation-triangle" severity="warning" value="Não Vigente"></Tag>
        </React.Fragment>)}
        
        } 

  
    
    return (
        <div>
               <Dialog className={card.card} visible={displayAtualizar} style={{ width: '50vw' }} header="Atualizar Contrato" onHide={() => onHideA('displayAtualizar')}>
        <div >
        <form className="p-field" action="192.168.1.9:3038" method="put">
          <h2>Contrato N° </h2>
          <form className="p-field">
          <label form = "nomedevedor">Nome: </label><br/>
          <InputText keyfilter="alpha" value={nomedevedor} onChange={(e) => setNomedevedor(e.target.value)} /><br/>
          <label form = "empresa" >Empresa: </label><br/>
          <InputText value={empresa} onChange={(e) => setEmpresa(e.target.value)} /><br/>
          <label form = "numerocontrato" >Nº do Contrato: </label><br/>
          <InputNumber value={numerocontrato} onChange={(e) => setNumerocontrato(e.value)} /><br/>
          <label>Status do Contrato</label>
          <SelectButton optionLabel="name" value={statuscontrato} options={options} onChange={(e) => setStatuscontrato(e.value)} /><br/>
          <Button label="ENVIAR" onClick={Update}/>
         </form>
        </form>
          </div>
            </Dialog>
 
             <div>
                <DataTable ref={dt} value={contratosLista} paginator rows={10}
                    header={header} className="p-datatable-customers"
                    globalFilter={globalFilter} emptyMessage="Nenhum contrato encontrado.">
                    <Column field="nomedevedor" header="Nome Devedor"  filter filterPlaceholder="Buscar por Nome" />
                    <Column field="empresa" filterField="empresa" header="Empresa"  filter filterPlaceholder="Buscar por Empresa"/>
                    <Column field="numerocontrato" filterField="numerocontrato" filter header="Numero Contrato" filterPlaceholder="Buscar por Nº"/>
                    <Column header="Status Contrato" body={statusBodyTemplate} />
                    <Column header="Editar/Excluir" body={actionBodyTemplate}/>
                    </DataTable>
            </div>
            <Dialog visible={displayDeletar} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={() => onHideDelete('displayDeletar')}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    <span>Tem certeza de que deseja deletar o contrato? <b></b>?</span>
                </div>
            </Dialog>

        </div>
    )
}
export default Table;