import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, AppBar } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { setEmitFlags } from 'typescript';


class Tag {
    Name: string | undefined;
    Count: number | undefined;
    ClickedCount: number | undefined;
}
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
            count: 0,
            tags: this.getFromTags() != null ? this.getFromTags() : []
        }
            ;
    }

    a(d: string, tag: string) {

        var aa = (this.state as any).clicked;
        aa.push(d);

        this.setLS(JSON.stringify({ val: aa }));

        var a = (this.state as any).tags;
        // a = a.map(function(item:any) { return item.name == tag ? item.clickedCount++ : item; });
        a.forEach(function (item: any, i: any) { if (item.name == tag) a[i].clickedCount++; });

        localStorage.setItem('tags', JSON.stringify(a));

        this.setState({
            clicked: aa,
        })
    }
    outOfClicked(d: string, tag: string) {

        var aa = (this.state as any).clicked;
        var filteredAry = aa.filter(function (e: any) { return e !== d })


        var a = (this.state as any).tags;
        //a = a.map(function(item:any) { return item.name == tag ?  item.clickedCount  > 0 ? item.clickedCount-- : 0: item; });
        a.forEach(function (item: any, i: any) { if (item.name == tag) a[i].clickedCount--; });

        this.setLS(JSON.stringify({ val: filteredAry }));

        this.setState({
            clicked: filteredAry
        })

    }


    getFromTags() {

        var a = localStorage.getItem('tags') as any;
        var b = JSON.parse(a) as any
        return b != null ? b : [];
    }


    getFromLS() {

        var a = localStorage.getItem('clicked') as any;
        var b = JSON.parse(a) as any
        return b != null ? b.val : [];
    }

    setLS(data: any) {

        localStorage.setItem('clicked', data);
    }

    setTags(items: []) {
        var res: any[] = []
        items.forEach((x: any) => {
            res.push({ name: x.tag, count: x.products.length, clickedCount: 0 });
        })

        return res;
    }

    isTgaClosed(tag: string) {

        var a = ((this.state as any).tags as any);
        var aa = a.filter((x: any) => x.name == tag);

        return aa.length != 0 ? aa[0].count == aa[0].clickedCount : false;

    }


    getTagCount(tag: string) {

        var a = ((this.state as any).tags as any);
        var aa = a.filter((x: any) => x.name == tag);

        return aa.length != 0 ? aa[0].count : 0;

    }


    getTagClickedCount(tag: string) {

        var a = ((this.state as any).tags as any);
        var aa = a.filter((x: any) => x.name == tag);

        return aa.length != 0 ? aa[0].clickedCount : 0;

    }
    componentDidMount() {

        fetch("https://msk.backend.avoska-dostavka.ru/order?id=2")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        tags: this.getFromTags().length != 0 ? this.getFromTags() : this.setTags(result),
                        count: result.map((x: any) => x.products).reduce(((sum: any, array: any) => sum + array.length), 0),
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
                <div >

                    <AppBar position="fixed" color="primary" style={{ fontSize: 20, padding: 10 }} enableColorOnDark>Куплено {(this.state as any).clicked?.length} из {(this.state as any).count}</AppBar>
                    {(this.state as any).items?.map((item: any, index:any) => (
                        <div style={{ marginTop: 60 }}>
                            {/*      <h1>{item.tag}</h1> */}


                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    {
                                        this.isTgaClosed(item.tag) ?


                                            <div style={{display: 'flex', fontSize: 20, width: '100%' }} >
                                                  <div style={{ fontWeight: 'bold', width:'70%', textAlign:'left' }}>{index+1}. {item.tag}</div>
                                                <div style={{ paddingLeft: 5, color: 'lightgrey' }}>{this.getTagClickedCount(item.tag)} из {this.getTagCount(item.tag)} </div>
                                            </div>
                                            :
                                            <div style={{ display: 'flex', fontSize: 20,  width: '100%'  }} >
                                                <div style={{ fontWeight: 'bold', width:'70%', textAlign:'left' }}>{index+1}. {item.tag}</div>
                                                <div style={{ paddingLeft: 5, color: 'lightgrey' }}>{this.getTagClickedCount(item.tag)} из {this.getTagCount(item.tag)} </div>
                                            </div>

                                    }

                                </AccordionSummary>
                                <AccordionDetails>
                                    {item.products.map((p: any) => (
                                        (this.state as any).clicked != null && (this.state as any).clicked?.includes(p.name) ?
                                            <Card style={{ border: "1px solid grey", margin: 10 }}>
                                                <CardMedia
                                                    component="img"
                                                    style={{ opacity: 0.4 }}
                                                    image={p.imageUrl}
                                                    alt="green iguana"
                                                />
                                                <CardContent style={{ background: "lightgrey", textDecoration: "line-through" }} >
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        {p.name}
                                                    </Typography>
                                                    <Typography variant="h6" color="text.secondary">
                                                        Цена: {p.price}
                                                    </Typography>

                                                    <Typography variant="h6" color="text.secondary">
                                                        Количество: {p.count}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button onClick={() => this.outOfClicked(p.name, item.tag)} style={{ width: "100%", background: "grey", color: "black" }} size="small">Вернуть</Button>

                                                </CardActions>
                                            </Card> :

                                            <Card style={{ border: "1px solid grey", margin: 10 }}>
                                                <CardMedia
                                                    component="img"

                                                    image={p.imageUrl}
                                                    alt="green iguana"
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        {p.name}
                                                    </Typography>
                                                    <Typography variant="h6" color="text.secondary">
                                                        Цена: {p.price}
                                                    </Typography>

                                                    <Typography variant="h6" color="text.secondary">
                                                        Количество: {p.count}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button onClick={() => this.a(p.name, item.tag)} style={{ width: "100%", background: "grey", color: "black" }} size="small">Взял!</Button>

                                                </CardActions>
                                            </Card>

                                    ))}

                                </AccordionDetails>
                            </Accordion>


                        </div>
                    ))}

                </div>
            );
        }
    }



}
