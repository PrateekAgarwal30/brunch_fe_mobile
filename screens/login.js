import React from "react";
import { StyleSheet } from "react-native";
import {
    Container,
    Header,
    Button,
    Text,
    Body,
    Form,
    Item as FormItem,
    Input,
    Label,
    Title,
    Card
} from "native-base";
import { ipAddress } from "../constants";
import { Constants } from "expo";
export default class Login extends React.Component {
    state = {
        validEmail: null,
        validPassword: null,
        email: null,
        password: null,
        error: null
    }
    componentDidMount() {
        // fetch(ipAddress)
        //   .then(res => {
        //     return res.json();
        //   })
        //   .then(res => {
        //     console.log(res);
        //   })
        //   .catch(ex => console.log(ex.message));
    }
    _checkLogin = async () => {
        const data = {
            email: this.state.email,
            password: this.state.password
        }
        const url = ipAddress + "/api/auth";
        console.log(url);
        fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        }).then(res => {
            return res.json()
        }).then(result => {
            if (result._status == "fail") {
                this.setState({
                    ...this.state,
                    error: result._message
                })
            } else {
                alert(result._message)
            }
        })
            .catch(ex => console.log(ex.message));
    }
    _validEmailInput = (x) => {
        reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        this.setState({
            ...this.state,
            email: x,
            validEmail: reg.test(x) != 0,
            error: null
        });
        // console.log(reg.test(x) != 0);
    }
    _validPasswordInput = (x) => {
        if (x.length >= 5) {
            this.setState({
                ...this.state,
                password: x,
                validPassword: true,
                error: null
            });
        } else {
            this.setState({
                ...this.state,
                password: x,
                validPassword: false,
                error: null
            });
        }
    }
    render() {
        return <Container style={styles.container}>
            <Text style={{ textAlign: 'center', alignItems: 'center' }}>
                {JSON.stringify(this.state)}
            </Text>
            <Card style={styles.card}>
                <Text style={{ textAlign: 'center', alignItems: 'center', color: 'red' }}>{this.state.error}</Text>
                <Form>
                    <FormItem floatingLabel>
                        <Label>Email</Label>
                        <Input style={{ color: this.state.validEmail ? "blue" : "red" }} onChangeText={this._validEmailInput} value={this.state.email} />
                    </FormItem>
                    <FormItem floatingLabel last>
                        <Label>Password</Label>
                        <Input style={{ color: this.state.validPassword ? "blue" : "red" }} secureTextEntry={true} onChangeText={this._validPasswordInput} value={this.state.password} />
                    </FormItem>
                    <Button full primary style={{ paddingBottom: 4 }} onPress={this._checkLogin} disabled={!(this.state.validEmail && this.state.validPassword)}>
                        <Text> Login </Text>
                    </Button>
                </Form>
            </Card>
        </Container>;
    }
}
const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight
    },
    card: {
        flex: 1,
        // backgroundColor: "#0ABDA0",
        justifyContent: "center",
        color: "#fff"
    }
});
