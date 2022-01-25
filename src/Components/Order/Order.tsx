import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}


const tableIcons = {
  Add: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ViewColumn {...props} ref={ref} />)
};

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default class Order extends React.Component<any> {


  getAllSum(items: any) {

    var res = 0;

    if (items != null) {
      for (var i = 0; i < items.length; i++) {
        res += items[i].realPrice - Math.round(items[i].realPrice / 1.1)
      }
    }
    return res;

  }
  componentDidMount() {


    //fetch("https://localhost:5001/result")
      fetch("https://msk.backend.avoska-dostavka.ru/result")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            items: result
          });
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          this.setState({
            isLoaded: true,

            error
          });
        }
      )
  }
  getPayment(type: any) {
    if (type == 1)
      return "экварийнинг";
    if (type == 2)
      return "наличные";
    if (type == 3)
      return "перевод";

    return "";
  }


  render() {
    return (<div style={{ maxWidth: '100%' }}>
      { (this.state as any)?.items != null ?


<div>

   
<div style={{paddingTop:15, paddingBottom:15, fontWeight: 'bold', textAlign:'center', color:'green' }}>Общий доход: {this.getAllSum((this.state as any).items)}</div>


      <MaterialTable
      options={{
        filtering: true,
        grouping: true,
        exportButton: true,

      }}
      icons={tableIcons}

      localization={{
        grouping: {
          placeholder: "Для группировки перетащите сюда название столбца",
          groupedBy: 'Сгруппированно по:'
        },
        pagination: {
          labelDisplayedRows: '{from}-{to} из {count}',
          labelRowsSelect: 'строк',
          labelRowsPerPage: 'lignes par page:',
          firstAriaLabel: 'Последняя страница',
          firstTooltip: 'Предыдущая страница',
          previousAriaLabel: 'Page précédente',
          previousTooltip: 'Page précédente',
          nextAriaLabel: 'Первая страница',
          nextTooltip: 'Следующая страница',
          lastAriaLabel: 'Последняя страница',
          lastTooltip: 'Последняя страница'
        },

        toolbar: {
          searchTooltip: 'Поиск',
          searchPlaceholder: 'Поиск',
          exportTitle: 'Экспорт',
          exportAriaLabel: 'Экспорт',
       
        },
        body: {
          filterRow: {
            filterTooltip: 'Фильтр'
        },

      },
        
      }}

        columns={[
          { title: 'номер заказа', field: 'order.id' },
          { title: 'дата', field: 'date', type: 'date'},
          { title: 'изначальная стоимость', field: 'price' },
          { title: 'реальная стоимость ', field: 'realPrice' },
          { title: 'доход', field: 'realPrice', render: row => <div>

{(row as any).realPrice - Math.round((row as any).realPrice / 1.1) > 0
                           ?
                           <div style={{ color: 'green' }}>{ Math.round((row as any).realPrice - Math.round((row as any).realPrice / 1.1))}</div>
                           :
                           <div style={{ color: 'red' }}>{ Math.round((row as any).realPrice - Math.round((row as any).realPrice / 1.1))}</div>
                         }
          </div> },
          { title: 'тип оплаты', field: 'payment',    render: row => <div>{this.getPayment(row.payment)}</div>}
        ]}
        data={(this.state as any).items}
        title="Заказы"
      />

      </div>
      :<div>Загрузка...</div>
  }
    </div>)
  }
  /*  render() {
     return (
       <div>
         <TableContainer component={Paper}>
           <Table sx={{ minWidth: 650 }} aria-label="simple table">
             <TableHead>
               <TableRow>
                 <TableCell>номер заказа</TableCell>
 
                 <TableCell>изначальная стоимость</TableCell>
                 <TableCell>реальная стоимость</TableCell>
                 <TableCell>доход</TableCell>
                 <TableCell>тип оплаты</TableCell>
               </TableRow>
             </TableHead>
             <TableBody>
 
               {
                 (this.state as any)?.items != null
                   ?
                   (this.state as any).items?.map((row: any) => (
                     <TableRow
                       key={row.name}
                       sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                     >
                       <TableCell component="th" scope="row">
                         {row.order.id}
                       </TableCell>
 
                       <TableCell component="th" scope="row">
                         {row.price}
                       </TableCell>
                       <TableCell component="th" scope="row">
                         {row.realPrice}
                       </TableCell>
                       <TableCell component="th" scope="row">
 
                         {row.realPrice - Math.round(row.realPrice / 1.1) > 0
                           ?
                           <div style={{ color: 'green' }}>{ Math.round(row.realPrice - Math.round(row.realPrice / 1.1))}</div>
                           :
                           <div style={{ color: 'red' }}>{ Math.round(row.realPrice - Math.round(row.realPrice / 1.1))}</div>
                         }
                       </TableCell>
 
 
                       <TableCell component="th" scope="row">
                         {this.getPayment(row.payment)}
                       </TableCell>
 
                     </TableRow>
                   ))
 
                   : <div>Загрузка...</div>
               }
 
             </TableBody>
           </Table>
         </TableContainer>
 
         {
           (this.state as any)?.items != null ?
           <div>Общий доход: {this.getAllSum((this.state as any).items)}</div>
           : <div></div>
         }
       </div>
     )
   } */

}