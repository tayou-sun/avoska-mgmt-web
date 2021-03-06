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
import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import AddToPhotos from '@mui/icons-material/AddToPhotos';
import { Link } from 'react-router-dom'
import OrderCreate from './Create';
import { padding } from '@mui/system';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};


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


  constructor(props: any) {
    super(props);
    this.state = {
      open: false
    }
        ;
}


  handleClose(){
    this.setState({
      open: false
  })
  }


  handleOpen(){
    this.setState({
      open: true
  })
  }

  routeChange() {
    let path = `newPath`;
    (this.props as any).history.push(path);
  }

  getAllSum(items: any) {

    var res = 0;

    if (items != null) {
      for (var i = 0; i < items.length; i++) {
        res += items[i].price - Math.round(items[i].realPrice )
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
        // ????????????????????: ?????????? ???????????????????????? ???????????? ???????????? ??????????, ?? ???? ?? ?????????? catch(),
        // ?????????? ???? ?????????????????????????? ???????????????????? ???? ???????????? ?? ?????????? ??????????????????????.
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
      return "??????????????????????";
    if (type == 2)
      return "????????????????";
    if (type == 3)
      return "??????????????";

    return "";
  }


  render() {
    return (<div style={{ maxWidth: '100%', height:'100%' }}>
      { (this.state as any)?.items != null ?


<div  style={{height:'100%'}}>


<div style={{display:'flex', justifyContent:'center',alignItems:'center'}}>   
<div style={{paddingTop:15, paddingBottom:15, fontWeight: 'bold', textAlign:'center', color:'green' }}>?????????? ??????????: {this.getAllSum((this.state as any).items)}</div>

<div style={{paddingLeft:10}}>


<IconButton color="primary" aria-label="upload picture" component="span"  onClick={this.handleOpen.bind(this)}>
    <AddToPhotos />
  </IconButton>

     
{/* <IconButton style={{color:'white'}} aria-label="add an alarm" onClick={this.handleOpen.bind(this)} >
  <AlarmIcon />
</IconButton>
 */}
</div>
</div>

      <MaterialTable
     
      options={{
        filtering: true,
        grouping: true,
        exportButton: true,

      }}
      icons={tableIcons}

      localization={{
        grouping: {
          placeholder: "?????? ?????????????????????? ???????????????????? ???????? ???????????????? ??????????????",
          groupedBy: '???????????????????????????? ????:'
        },
        pagination: {
          labelDisplayedRows: '{from}-{to} ???? {count}',
          labelRowsSelect: '??????????',
          labelRowsPerPage: 'lignes par page:',
          firstAriaLabel: '?????????????????? ????????????????',
          firstTooltip: '???????????????????? ????????????????',
          previousAriaLabel: 'Page pr??c??dente',
          previousTooltip: 'Page pr??c??dente',
          nextAriaLabel: '???????????? ????????????????',
          nextTooltip: '?????????????????? ????????????????',
          lastAriaLabel: '?????????????????? ????????????????',
          lastTooltip: '?????????????????? ????????????????'
        },

        toolbar: {
          searchTooltip: '??????????',
          searchPlaceholder: '??????????',
          exportTitle: '??????????????',
          exportAriaLabel: '??????????????',
       
        },
        body: {
          filterRow: {
            filterTooltip: '????????????'
        },

      },
        
      }}

        columns={[
          { title: '?????????? ????????????', field: 'order.id' },
          { title: '????????', field: 'date', type: 'date'},
          { title: '?????????????????????? ??????????????????', field: 'price' },
          { title: '???????????????? ?????????????????? ', field: 'realPrice' },
          { title: '??????????', field: 'realPrice', render: row => <div>

{(row as any).price - Math.round((row as any).realPrice / 1.1) > 0
                           ?
                           <div style={{ color: 'green' }}>{ Math.round((row as any).price - Math.round((row as any).realPrice ))}</div>
                           :
                           <div style={{ color: 'red' }}>{ Math.round((row as any).price - Math.round((row as any).realPrice ))}</div>
                         }
          </div> },
          { title: '?????? ????????????', field: 'payment',    render: row => <div>{this.getPayment(row.payment)}</div>}, 
          { title: '?????????????????????? ', field: 'comment' },
        ]}
        data={(this.state as any).items}
        title="????????????"
      />




      </div>
      :<div>????????????????...</div>
  }



<Modal
  open={(this.state as any).open}
  onClose={this.handleClose.bind(this)}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <div style={{width:'100%'}}>
    <OrderCreate handleClose={this.handleClose.bind(this)}/>
    </div>
  </Box>
</Modal>


    </div>)
  }
  /*  render() {
     return (
       <div>
         <TableContainer component={Paper}>
           <Table sx={{ minWidth: 650 }} aria-label="simple table">
             <TableHead>
               <TableRow>
                 <TableCell>?????????? ????????????</TableCell>
 
                 <TableCell>?????????????????????? ??????????????????</TableCell>
                 <TableCell>???????????????? ??????????????????</TableCell>
                 <TableCell>??????????</TableCell>
                 <TableCell>?????? ????????????</TableCell>
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
 
                   : <div>????????????????...</div>
               }
 
             </TableBody>
           </Table>
         </TableContainer>
 
         {
           (this.state as any)?.items != null ?
           <div>?????????? ??????????: {this.getAllSum((this.state as any).items)}</div>
           : <div></div>
         }
       </div>
     )
   } */

}