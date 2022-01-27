import * as React from 'react';
import { Button, IconButton } from '@mui/material';
import AlarmIcon from '@mui/icons-material/Alarm';
import { Link } from 'react-router-dom'
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { history1 } from '../History';

export default class OrderCreate extends React.Component<any> {



    constructor(props: any) {
        super(props);
        this.state = {
           payment:1,
           id: 1,
           plus: 0,
           date: "2017-05-24",
           comment: "" 
        }
            ;
    }

    onCreateClick(e:any){

   /*    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: { Payment: (this.state as any).payment, RealPrice:(this.state as any).plus, OrderId: (this.state as any).id,Date:(this.state as any).date}
    };
    fetch('https://localhost:5001/result', requestOptions)
        .then(response => response.json())
        .then(data => console.log('yep')); */

        fetch("https://msk.backend.avoska-dostavka.ru/result",{
       // fetch('https://localhost:5001/result',{
      method: 'POST',
      headers:{'Content-type':'application/json'},
      body: JSON.stringify({ Payment: (this.state as any).payment, RealPrice:(this.state as any).plus, OrderId: (this.state as any).id,Date:(this.state as any).date, Comment: (this.state as any).comment})
    }).then(r=>r.json()).then(res=>{
      if(res){
        this.setState({message:'New Employee is Created Successfully'});
      }
    });


      (this.props as any).handleClose();
      
      
    }
    paymentChange(event : any){

        this.setState({
            payment: event.target.value 
        })
    }
  

    idChange(event : any){

        this.setState({
            id: event.target.value 
        })
    }

    plusChange(event : any){

        this.setState({
            plus: event.target.value 
        })
    }


    dateChange(event : any){

        this.setState({
            date: event.target.value 
        })
    }
    

    commentChange(event : any){

      this.setState({
          comment: event.target.value 
      })
  }
  


    
    render(){
        return(
            <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            style={{ display:'flex',flexDirection:'column', width:'100%'}}
          >



<TextField id="outlined-basic" label="ИД" variant="outlined" value={(this.state as any).id}  fullWidth
onChange={this.idChange.bind(this)} style={{width:'100%'}} />

<TextField id="outlined-basic" label="Реальная стоимость" variant="outlined" value={(this.state as any).plus} 
onChange={this.plusChange.bind(this)}  style={{width:'100%'}}/>


  <TextField
   style={{width:'100%'}}
        id="date"
        label="Дата"
        type="date"
        onChange={this.dateChange.bind(this)}
        defaultValue="2017-05-24"
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
      />


<FormControl fullWidth  style={{width:'100%'}}>
  <InputLabel id="demo-simple-select-label"  style={{width:'100%'}}>Тип доставки</InputLabel>
  <Select
   style={{width:'100%'}}
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={(this.state as any).payment}
    label="Age"
    onChange={this.paymentChange.bind(this)}
  
  >
<MenuItem value={1}>эквайринг</MenuItem>
    <MenuItem value={2}>наличные</MenuItem>
    <MenuItem value={3}>перевод</MenuItem>
  </Select>
</FormControl>

<TextField id="outlined-basic" label="Комментарий" variant="outlined" value={(this.state as any).comment} 
onChange={this.commentChange.bind(this)}  style={{width:'100%'}}/>




{/*         <Link style={{textDecoration:'none'}} to={'/result'}>
 */}        <Button variant="outlined" onClick={this.onCreateClick.bind(this)} >Создать</Button>

     {/*    <IconButton color="secondary" aria-label="add an alarm" >
          <AlarmIcon />
        </IconButton> */}
    {/*     </Link> */}
        
        </Box>
        );

    }

}