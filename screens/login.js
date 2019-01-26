import React from "react";
import { StyleSheet } from "react-native";
// import Joi from 'joi';
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
    _checkLogin(x) {
        console.log(x);
    }
    _validEmailInput(x) {
        const schema = {
            email: Joi.string().min(5).max(50).required().email()
        }
        // let reg = '/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/';
        // console.log(reg.test(x) == 0);
    }
    _validPasswordInput(x) {
        console.log(x);
    }
    render() {
        return <Container style={styles.container}>
            <Card style={styles.card}>
                <Form>
                    <FormItem floatingLabel>
                        <Label>Email</Label>
                        <Input onChangeText={this._validEmailInput} />
                    </FormItem>
                    <FormItem floatingLabel last>
                        <Label>Password</Label>
                        <Input secureTextEntry={true} onChangeText={this._validPasswordInput} />
                    </FormItem>
                    <Button full primary style={{ paddingBottom: 4 }} onPress={this._checkLogin}>
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
        // alignItems: "center",
        // backgroundColor: "#0ABDA0",
        justifyContent: "center",
        color: "#fff"
    }
});
