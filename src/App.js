import React from 'react';
import './App.css';
import fire from "./Fire";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';




const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

function App() {

    const [state, setState] = React.useState({
        checkedA: true,
    });

    const classes = useStyles();

    // read the objects from firebase and load them into an array that rests in your state
    const [users, setUsers] = React.useState([]);
    const [values, setValues] = React.useState({
        name: "",
        number: null,
        coolness: null
    });

    const [changed, setChange] = React.useState(false);

    const db = fire.firestore();

    const handleChange = prop => event => {
        setValues({...values, [prop]: event.target.value});
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const submit=()=>{
        db.collection("users").add(values)
    };

    const deleteItem=(id)=> {
        db.collection("users").doc(id).delete().then(function(){
            setChange(!changed);
        })
    };

    React.useEffect(()=>{
        let newUsers = [];

        db.collection("users").orderBy("name").get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                const object = doc.data();

                let user = {
                    name: object.name,
                    number: object.number,
                    coolness: object.coolness,
                    id: doc.id
                };

                newUsers.push(user);

            });
            setUsers(newUsers);
        });
    }, [db, changed]);

    let userEles = users.map((user, idx)=>
        <Card className={classes.root} key={idx}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Name
                </Typography>
                <Typography variant="h5" component="h1">
                    <div style={{fontSize: user.number}} className={`${user.coolness ? "cool-font" : ""}`}>{user.name}</div>
                </Typography>
                {user.name.length>5&&
                <Typography className={classes.pos} color="textSecondary">
                    I am a long name
                </Typography>}
            </CardContent>
            <CardActions>
                <Button size="small" variant="contained" color="primary">Edit</Button>
                <Button variant="contained" color="secondary" onClick={()=>deleteItem(user.id)}>
                    Delete
                </Button>
            </CardActions>
        </Card>
    );


  return (
    <div className="App">
        {userEles}
        <div>
            <FormGroup>
            <input type="text" placeholder="Name..." onChange={handleChange("name")}/>
            <input type="number" placeholder="Number..."  onChange={handleChange("number")}/>
                <input
                    type="checkbox"
                    name="coolness"
                    defaultValue
                    onChange={handleChange}
                />
            <button onClick={submit}>Submit</button>
            </FormGroup>
        </div>
    </div>
  );
}

export default App;
