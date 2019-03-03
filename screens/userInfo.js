import React from "react";
import {
  Text,
  View,
  TouchableOpacity, ToastAndroid,KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import {updateProfile} from '../redux/actions'
// import { Separator } from "native-base";
import { Container, Header, Content, Form, Item, Input, Label, Separator, Button,Icon } from 'native-base';
class UserInfo extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Profile",
      headerRight: (
        <TouchableOpacity
          onPress={() => {
            const _editableToggle = navigation.getParam('_editableToggle', null)
            if (_editableToggle) {
              _editableToggle();
            }
          }
          }
          style={{ padding: 5, marginRight: 10 }}
        ><Icon name="create" style={{ color: '#fff' }} />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: "#16235A"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    };
  };
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
    console.log(this.props.profile)
    this.props.navigation.setParams({
      _editableToggle: this._editableToggle
    });
    if (this.state.editing) {
      this.setState({
        ...this.state,
        db: { ...this.props.profile.details }
      })
    } else {
      this.setState({
        ...this.state,
        db: { ...this.state.db, ...this.props.profile.details },
        edit: { ...this.state.edit, ...this.props.profile.details }
      })
    }
  }
  _updateProfile = async () => {
    try {
      const a = await this.props.updateProfile(this.state.edit);
    } catch (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }
  };
  _editableToggle = () => {
    console.log("Edit Called")
    this.setState({
      ...this.state,
      editing: !this.state.editing
    })
  }
  _firstNameChange = (x) => {
    this.setState({
      ...this.state,
      edit: { ...this.state.edit, firstName: x }
    });
    console.log(this.state.edit)
  }
  _lastNameChange = (x) => {
    this.setState({
      ...this.state,
      edit: { ...this.state.edit, lastName: x }
    });
    console.log(this.state.edit)
  }
  _phoneNumberChange = (x) => {
    this.setState({
      ...this.state,
      edit: { ...this.state.edit, phoneNumber: x }
    });
    console.log(this.state.edit)
  }
  _locationChange = (x) => {
    this.setState({
      ...this.state,
      edit: { ...this.state.edit, location: x }
    });
    console.log(this.state.edit)
  }
  _dateOfBirthChange = (x) => {
    this.setState({
      ...this.state,
      edit: { ...this.state.edit, dateOfBirth: x }
    });
    console.log(this.state.edit)
  }
  _preferredMealChange = (x) => {
    this.setState({
      ...this.state,
      edit: { ...this.state.edit, preferredMeal: x }
    });
    console.log(this.state.edit)
  }
  _descriptionChange = (x) => {
    this.setState({
      ...this.state,
      edit: { ...this.state.edit, description: x }
    });
    console.log(this.state.edit)
  }
  render() {
    return (
      <KeyboardAvoidingView behavior="height" style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
        <Content>
          <Text style={{ color: "red" }}>{this.props.user.err}</Text>
          <Form>
            <Item style={{ flexDirection: 'row' }}>
              <Item stackedLabel style={{ flex: 1 }}>
                <Label>First Name</Label>
                <Input value={this.state.editing ? this.state.edit.firstName : this.state.db.firstName} editable={this.state.editing} onChangeText={this._firstNameChange} />
              </Item>
              <Item stackedLabel style={{ flex: 1 }}>
                <Label>Last Name</Label>
                <Input value={this.state.editing ? this.state.edit.lastName : this.state.db.lastName} editable={this.state.editing} onChangeText={this._lastNameChange} />
              </Item>
            </Item>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input value={this.state.db.email} editable={false} />
            </Item>
            <Item style={{ flexDirection: 'row' }}>
              <Item stackedLabel style={{ flex: 1 }}>
                <Label>Mobile Number</Label>
                <Input value={this.state.editing ? this.state.edit.phoneNumber : this.state.db.phoneNumber} editable={this.state.editing} onChangeText={this._phoneNumberChange} />
              </Item>
              <Item stackedLabel style={{ flex: 1 }}>
                <Label>Location</Label>
                <Input value={this.state.editing ? this.state.edit.location : this.state.db.location} editable={this.state.editing} onChangeText={this._locationChange} />
              </Item>
            </Item>
            <Item style={{ flexDirection: 'row' }}>
              <Item stackedLabel style={{ flex: 1 }}>
                <Label>Date Of Birth</Label>
                <Input value={this.state.editing ? this.state.edit.dateOfBirth : this.state.db.dateOfBirth} editable={this.state.editing} onChangeText={this._dateOfBirthChange} />
              </Item>
              <Item stackedLabel style={{ flex: 1 }}>
                <Label>Preferred Meal</Label>
                <Input value={this.state.editing ? this.state.edit.preferredMeal : this.state.db.preferredMeal} editable={this.state.editing} onChangeText={this._preferredMealChange} />
              </Item>
            </Item>
            <Item stackedLabel>
              <Label>Description</Label>
              <Input value={this.state.editing ? this.state.edit.description : this.state.db.description} editable={this.state.editing} onChangeText={this._descriptionChange} />
            </Item>
          </Form>
        </Content>
        <Text>{JSON.stringify(this.state)}</Text>
        {this.state.editing ? <Button full disabled={this.state.db === this.state.edit} onPress={this._updateProfile}><Text>Save</Text></Button> : null}
      </KeyboardAvoidingView>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  profile: state.profile
});
const mapActionsToProps = {
  updateProfile: updateProfile
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(UserInfo);
