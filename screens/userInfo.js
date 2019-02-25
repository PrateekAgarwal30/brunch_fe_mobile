import React from "react";
import {
  Text,
  View
} from "react-native";
import { connect } from "react-redux";
// import { Separator } from "native-base";
import { Container, Header, Content, Form, Item, Input, Label, Separator, Button } from 'native-base';
class UserInfo extends React.Component {
  state = {
    db: {
      firstName: null,
      lastName: null,
      email: null,
      phoneNumber: null,
      location: null,
      dateOfBirth: null,
      preferredMeal: null,
      description: null,
      editable: false
    },
    edit: {
      firstName: null,
      lastName: null,
      email: null,
      phoneNumber: null,
      location: null,
      dateOfBirth: null,
      preferredMeal: null,
      description: null,
    },
    editing: false
  }
  componentDidMount() {
    if (this.state.editing) {
      this.setState({
        ...this.state,
        db: { ...this.props.profile.details }
      })
    } else {
      this.setState({
        ...this.state,
        db: { ...this.props.profile.details },
        edit: { ...this.props.profile.details }
      })
    }
  }
  _editableToggle = () => {
    this.setState({
      ...this.state,
      editing: !this.state.editing
    })
  }
  render() {
    return (
      <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
        <Content>
          <Form>
            <Item style={{ flexDirection: 'row' }}>
              <Item stackedLabel style={{ flex: 1 }}>
                <Label>First Name</Label>
                <Input value={this.state.editing ? this.state.edit.firstName : this.state.db.firstName} editable={this.state.editing} />
              </Item>
              <Item stackedLabel style={{ flex: 1 }}>
                <Label>Last Name</Label>
                <Input value={this.state.editing ? this.state.edit.lastName : this.state.db.lastName} editable={this.state.editing} />
              </Item>
            </Item>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input value={this.state.db.email} />
            </Item>
            <Item stackedLabel>
              <Label>Mobile Number</Label>
              <Input value={this.state.editing ? this.state.edit.phoneNumber : this.state.db.phoneNumber} editable={this.state.editing} />
            </Item>
            <Item stackedLabel>
              <Label>Location</Label>
              <Input value={this.state.editing ? this.state.edit.location : this.state.db.location} editable={this.state.editing} />
            </Item>
            <Item stackedLabel>
              <Label>Date Of Birth</Label>
              <Input value={this.state.editing ? this.state.edit.dateOfBirth : this.state.db.dateOfBirth} editable={this.state.editing} />
            </Item>
            <Item stackedLabel>
              <Label>Preferred Meal</Label>
              <Input value={this.state.editing ? this.state.edit.preferredMeal : this.state.db.preferredMeal} editable={this.state.editing} />
            </Item>
            <Item stackedLabel>
              <Label>Description</Label>
              <Input value={this.state.editing ? this.state.edit.description : this.state.db.description} editable={this.state.editing} />
            </Item>
          </Form>
        </Content>
        <Button onPress={this._editableToggle}><Text>Edit</Text></Button>
        {/* <Text>{JSON.stringify(this.props.user)}</Text>
        <Text>{JSON.stringify(this.props.profile)}</Text>
        <Text>{JSON.stringify(this.state)}</Text> */}
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
