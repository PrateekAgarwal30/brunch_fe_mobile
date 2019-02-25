import React from "react";
import {
  Text,
  View
} from "react-native";
import { connect } from "react-redux";
// import { Separator } from "native-base";
import { Container, Header, Content, Form, Item, Input, Label, Separator } from 'native-base';
class UserInfo extends React.Component {
  state = {
    firstName: null,
    lastName: null,
    email : null,
    phoneNumber: null,
    location: null,
    dateOfBirth: null,
    preferredMeal: null,
    description: null
  }
  componentDidMount() {
    this.setState({
      ...this.props.profile.details
    })
  }
  render() {
    return (
      <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
        <Content>
          <Form>
            <Item style={{ flexDirection: 'row' }}>
              <Item stackedLabel style={{flex:1}}>
                <Label>First Name</Label>
                <Input value={this.state.firstName}/>
              </Item>
              <Item stackedLabel style={{ flex: 1 }}>
                <Label>Last Name</Label>
                <Input value={this.state.lastName} />
              </Item>
            </Item>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input value={this.state.email} editable={false} />
            </Item>
            <Item stackedLabel>
              <Label>Password</Label>
              <Input value={"1"} />
            </Item>
          </Form>
        </Content>
        <Text>{JSON.stringify(this.props.user)}</Text>
        <Text>{JSON.stringify(this.props.profile)}</Text>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  profile: state.profile
});
const mapActionsToProps = {
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(UserInfo);
