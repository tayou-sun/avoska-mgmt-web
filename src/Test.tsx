import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
export default class TitlebarBelowImageList extends React.Component {

    /*   const [error, setError] = useState(null);
      const [isLoaded, setIsLoaded] = useState(false);
      const [items, setItems] = useState([]); */


    //const [clicked, setClicked] = useState([]);
    constructor(props: any) {
        super(props);
        this.state = {
            items: [],
            clicked: this.getFromLS() != null ? this.getFromLS() : [],
            error: null,
            isLoaded: false,
        }
            ;
    }

    a(d: string) {
        
        var aa = (this.state as any).clicked;
        aa.push(d);

        this.setLS(JSON.stringify({val: aa}));
        this.setState({
            clicked: aa
        })
    }
    outOfClicked(d: string){

        var aa = (this.state as any).clicked;
        var filteredAry = aa.filter(function(e:any) { return e !== d })

        this.setLS(JSON.stringify({val: filteredAry}));

        this.setState({
            clicked: filteredAry
        })

    }


    getFromLS(){

        var a =  localStorage.getItem('clicked') as any;
        var b =  JSON.parse(a) as any
        return b != null ? b.val : [] ;
    }

    setLS(data:any){
        
        localStorage.setItem('clicked', data);
    }

    componentDidMount() {
        fetch("http://176.113.82.96/order?id=2")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                      
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


    // Примечание: пустой массив зависимостей [] означает, что
    // этот useEffect будет запущен один раз
    // аналогично componentDidMount()
    /*     useEffect(() => {
          fetch("https://localhost:5001/order?id=34")
            .then(res => res.json())
            .then(
              (result) => {
              //  setIsLoaded(true);
               // setItems(result);
              },
              // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
              // чтобы не перехватывать исключения из ошибок в самих компонентах.
              (error) => {
                //setIsLoaded(true);
               // setError(error);
              }
            )
        }, []) */


    render() {
        var error = (this.state as any).error;
        var isLoaded = (this.state as any).isLoaded;
        var items = (this.state as any).items;
        
        if (error) {
          return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Загрузка...</div>;
        } else {
          return (
            <div>
            {(this.state as any).items?.map((item: any) => (
                (this.state as any).clicked != null && (this.state as any).clicked?.includes(item.name) ?
                <Card style={{ border: "1px solid grey", margin: 10}}>
                    <CardMedia
                        component="img"
                        style={{opacity:0.4}}
                        image={item.imageUrl}
                        alt="green iguana"
                    />
                    <CardContent style={{background:"lightgrey", textDecoration:"line-through" }} >
                        <Typography gutterBottom variant="h5" component="div">
                            {item.name}
                        </Typography>

                    </CardContent>
                    <CardActions>
                        <Button onClick={() => this.outOfClicked(item.name)} style={{ width: "100%", background: "grey", color: "black" }} size="small">Вернуть</Button>

                    </CardActions>
                </Card> :  
                
                <Card style={{ border: "1px solid grey", margin: 10}}>
                    <CardMedia
                        component="img"
                       
                        image={item.imageUrl}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {item.name}
                        </Typography>

                    </CardContent>
                    <CardActions>
                        <Button onClick={() => this.a(item.name)} style={{ width: "100%", background: "grey", color: "black" }} size="small">Взял!</Button>

                    </CardActions>
                </Card> 

            ))}

        </div>
          );
        }
      }

       
    
}

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
        author: '@bkristastucchio',
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
        author: '@rollelflex_graphy726',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
        author: '@helloimnik',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
        author: '@nolanissac',
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
        author: '@hjrc33',
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
        author: '@arwinneil',
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
        author: '@tjdragotta',
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
        author: '@katie_wasserman',
    },
    {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
        author: '@silverdalex',
    },
    {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        title: 'Tomato basil',
        author: '@shelleypauls',
    },
    {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        title: 'Sea star',
        author: '@peterlaster',
    },
    {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'Bike',
        author: '@southside_customs',
    },
];
