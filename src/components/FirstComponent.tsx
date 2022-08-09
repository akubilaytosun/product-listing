import * as React from "react";
import ProductService from '../services/ProductService'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Badge from '@mui/material/Badge';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { connect } from 'react-redux';
import { useGetAllProductsQuery } from "../features/productsApi"
import { ActionType, PageProps } from "../globalTypes";
import InputLabel from '@mui/material/InputLabel';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Add } from "@mui/icons-material";
interface filteredData {
    cName: string,
    checked: boolean
}
type Anchor = 'top' | 'left' | 'bottom' | 'right';

export const FirstComponent: React.FC<PageProps> = ({ state, dispatch, ctx }) => {
    const [filteredArray, setFilteredArray] = React.useState<filteredData[]>([])


    const handleClick = (item: any, added: any, price: any) => {
        const action: string = added ? "REMOVE" : "ADD_TO_CART";
        dispatch && dispatch({ type: action, payload: item })
    }

    const handleIncreaseCounter = (item: any, added: any, price: any) => {
        const action: string = "ADD_TO_CART";
        dispatch && dispatch({ type: action, payload: item })
    }

    const handleRemove = (index: any, added: any) => {

        const action: string = added ? "REMOVE" : "ADD_TO_CART";
        dispatch && dispatch({ type: action, payload: index })

    }

    const handleClearBasket = () => {
        const action: string = "RESET";
        dispatch && dispatch({ type: action })

    }

    const handleFilter = (categoryName: any) => {

        if (filteredArray.filter((x) => x.cName == categoryName)) {
            let index = filteredArray?.indexOf(categoryName)
            setFilteredArray(filteredArray.splice(index, 1))
        }
        else {
            let arr = filteredArray;
            arr.push(categoryName);
            setFilteredArray(arr)
        }

        dispatch && dispatch({ type: "FILTER", payload: categoryName })

    }

    const handleSearch = (e: any) => {
        dispatch && dispatch({ type: "SEARCHING", payload: e.target.value })
        if (!e.target.value) {
            dispatch && dispatch({ type: "FILTER", payload: "All items" })
        }
    }

    const [age, setAge] = React.useState('');

    const handleOrder = (e: any) => {

        setAge(e.target.value as string);

        if (e.target.value == 10) {
            var res = state.filteredItems.sort(({ price: a }, { price: b }) => b - a);
            dispatch && dispatch({ type: "ORDER", payload: res })

        }
        else if (e.target.value == 20) {
            var res = state.filteredItems.sort(({ price: a }, { price: b }) => a - b);
            dispatch && dispatch({ type: "ORDER", payload: res })

        }

        if (!e.target.value) {
            dispatch && dispatch({ type: "FILTER", payload: "All items" })
        }
    }

    const [state2, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state2, [anchor]: open });
            };

    const list = (anchor: Anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 600 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}

        >

            <Typography variant="h6" color="red" component="div" sx={{ flexGrow: 1 }} >
                Sepetim ({state.shoppingCart.length} ürün)
            </Typography>
            <Divider />
            <List>

                {state.shoppingCart.map((text, index) => (
                    <>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container sx={{ marginTop: 1 }}>
                                <Grid item xs={3}>
                                    <CardMedia
                                        component="img"
                                        height="100"
                                        image={text.image}
                                        sx={{ objectFit: "contain" }}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }} >
                                        {text.title}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button onClick={() => handleRemove(text.id, text.added)}>
                                        <DeleteIcon></DeleteIcon>
                                    </Button>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }} >
                                        {text.price} $
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button>
                                        <RemoveIcon></RemoveIcon>
                                    </Button>
                                    <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1, alignContent: "center" }} >
                                        {text.quantity} Adet
                                    </Typography>
                                    <Button onClick={() => handleIncreaseCounter(text.id, true, text.price)}>
                                        <AddIcon></AddIcon>
                                    </Button>
                                </Grid>
                            </Grid>

                            <Divider />
                        </Box>
                    </>
                ))}
            </List>

            <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }} >
                Toplam Ödenecek Tutar: {state.totalAmount} $
            </Typography>

            <Button onClick={() => handleClearBasket()}>
                Sepeti Boşalt
            </Button>
        </Box>
    );

    React.useEffect(() => {
        let arr: any = []
        state.categories.map((item) => {
            let obj = {
                cName: item,
                checked: false,
            }
            arr.push(obj)
        })
        setFilteredArray(arr)
    }, [])

    return (
        <>

            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" sx={{ backgroundColor: "#808080" }}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }} >
                            Ürün Listeleme
                        </Typography>
                        <Badge color="secondary" badgeContent={state.shoppingCart.length}>
                            <ShoppingCartOutlinedIcon ></ShoppingCartOutlinedIcon>
                        </Badge>

                        <React.Fragment >
                            <Button onClick={toggleDrawer('right', true)} variant="contained" color="primary" sx={{ marginLeft: 2 }}>Sepetim</Button>
                            <Drawer
                                anchor={'right'}
                                open={state2['right']}
                                onClose={toggleDrawer('right', false)}
                            >
                                {list('right')}
                            </Drawer>
                        </React.Fragment>
                    </Toolbar>
                </AppBar>
            </Box>

            <Box sx={{ flexGrow: 1, marginTop: 10 }}>
                <Grid container >
                    <Grid item xs={3} sx={{ height: "100%" }}>
                        <Card sx={{ minWidth: 275, height: 500, maxHeight: "100%", marginLeft: 5, marginTop: 2 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                                    Kategoriler
                                </Typography>
                                <FormGroup>
                                    {state.categories.map((value, index) => (
                                        <FormControlLabel control={
                                            <Checkbox
                                                // checked={()=>getFilterChecked(value)}
                                                onChange={() => handleFilter(value)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        } label={value} />
                                    ))}
                                </FormGroup>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={9}>
                        <Box sx={{ flexGrow: 1 }} >
                            <Toolbar sx={{ margin: 1 }}>
                                <Grid container>
                                    <Grid item xs={10}>
                                        <TextField id="outlined-basic" label="Ara" variant="outlined" onChange={(e) => handleSearch(e)} />
                                    </Grid>
                                </Grid>
                                <Grid item xs={2}>
                                    <InputLabel id="demo-simple-select-label">Sırala</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={age}
                                        label="Sırala"
                                        onChange={(e) => handleOrder(e)}
                                    >
                                        <MenuItem value={10}>En Yüksek Fiyat</MenuItem>
                                        <MenuItem value={20}>En Düşük Fiyat</MenuItem>
                                    </Select>
                                </Grid>
                            </Toolbar>
                        </Box>

                        <Box sx={{ flexGrow: 1 }}>
                            <>
                                <Typography variant="h6" color="primary" component="div" sx={{ flexGrow: 1, margin: 5 }} >
                                    Ürünler
                                </Typography>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Grid sx={{ flexGrow: 1, marginLeft: 5 }} container spacing={4}>
                                        <Grid item xs={12}>
                                            <Grid container justifyContent="flex-start" spacing={4}>
                                                {state.filteredItems.map((item, index) => (
                                                    <Grid key={item.id} item>
                                                        <Card sx={{ width: 275, height: "100%", justifyContent: "center" }}>
                                                            <CardActionArea>
                                                                <CardMedia
                                                                    component="img"
                                                                    height="250"
                                                                    image={item.image}
                                                                    sx={{ objectFit: "contain" }}
                                                                />
                                                                <CardContent>
                                                                    <Typography gutterBottom variant="h6" component="div">
                                                                        {item.title}
                                                                    </Typography>
                                                                    <Typography gutterBottom variant="h6" component="div">
                                                                        {item.price + ' $'}
                                                                    </Typography>
                                                                </CardContent>
                                                            </CardActionArea>
                                                            <CardActions>
                                                                <Button size="small" onClick={() => handleClick(item.id, item.added, item.price)} sx={{ backgroundColor: "green", color: "white" }}  >
                                                                    {item.added ? 'Sepetten Çıkar' : 'Sepete Ekle'}
                                                                </Button>
                                                            </CardActions>
                                                        </Card>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}



