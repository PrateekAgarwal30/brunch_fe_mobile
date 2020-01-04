import React from "react";
import {
  Text,
  TouchableOpacity,
  ToastAndroid,
  KeyboardAvoidingView,
  Picker
} from "react-native";
import { connect } from "react-redux";
import { updateProfile, getProfile } from "../redux/actions";
// import { Calendar } from "react-native-calendars";
import moment from "moment";
import { DatePicker } from "native-base";
// import { Separator } from "native-base";
import {
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Icon
} from "native-base";
class UserInfo extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Profile",
      headerRight: (
        <TouchableOpacity
          onPress={() => {
            const _editableToggle = navigation.getParam(
              "_editableToggle",
              null
            );
            if (_editableToggle) {
              _editableToggle();
            }
          }}
          style={{ padding: 5, marginRight: 10 }}
        >
          <Icon name="create" style={{ color: "#fff" }} />
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
      description: null
    },
    edit: {
      firstName: null,
      lastName: null,
      email: null,
      phoneNumber: null,
      location: null,
      dateOfBirth: null,
      preferredMeal: null,
      description: null
    },
    editing: false
  };
  componentDidMount() {
    console.log(this.props.profile);
    this.props.navigation.setParams({
      _editableToggle: this._editableToggle
    });
    if (this.state.editing) {
      this.setState({
        ...this.state,
        db: { ...this.props.profile.details }
      });
    } else {
      this.setState({
        ...this.state,
        db: { ...this.state.db, ...this.props.profile.details },
        edit: { ...this.state.edit, ...this.props.profile.details }
      });
    }
    this.interval = setInterval(async () => {
      if (this.state.editing) {
        this.setState({
          ...this.state,
          db: { ...this.props.profile.details }
        });
      } else {
        this.setState({
          ...this.state,
          db: { ...this.state.db, ...this.props.profile.details },
          edit: { ...this.state.edit, ...this.props.profile.details }
        });
      }
    }, 2000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  _updateProfile = async () => {
    try {
      const a = await this.props.updateProfile(this.state.edit);
      this.setState({
        ...this.state,
        editing: false
      });
      this.props.getProfile();
      ToastAndroid.show(a, ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }
  };
  _editableToggle = () => {
    console.log("Edit Called");
    this.setState({
      ...this.state,
      editing: !this.state.editing
    });
  };
  _firstNameChange = x => {
    this.setState({
      ...this.state,
      edit: { ...this.state.edit, firstName: x }
    });
  };
  _lastNameChange = x => {
    this.setState({
      ...this.state,
      edit: { ...this.state.edit, lastName: x }
    });
  };
  _phoneNumberChange = x => {
    this.setState({
      ...this.state,
      edit: { ...this.state.edit, phoneNumber: x }
    });
  };
  _locationChange = x => {
    this.setState({
      ...this.state,
      edit: { ...this.state.edit, location: x }
    });
  };
  _dateOfBirthChange = x => {
    console.log("Date", x);
    this.setState({
      ...this.state,
      edit: { ...this.state.edit, dateOfBirth: x }
    });
  };
  _preferredMealChange = x => {
    this.setState({
      ...this.state,
      edit: { ...this.state.edit, preferredMeal: x }
    });
  };
  _descriptionChange = x => {
    this.setState({
      ...this.state,
      edit: { ...this.state.edit, description: x }
    });
  };
  componentWillUpdate() {
    console.log("this.state.db.dateOfBirth", this.state.db.dateOfBirth);
    return true;
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior="height"
        style={{ justifyContent: "center", flex: 1, alignItems: "center" }}
      >
        <Content>
          <Text style={{ color: "red" }}>{this.props.user.err}</Text>
          <Form>
            <Item style={{ flexDirection: "row" }}>
              <Item stackedLabel style={{ flex: 1 }}>
                <Label>First Name</Label>
                <Input
                  value={
                    this.state.editing
                      ? this.state.edit.firstName
                      : this.state.db.firstName
                  }
                  editable={this.state.editing}
                  onChangeText={this._firstNameChange}
                />
              </Item>
              <Item stackedLabel style={{ flex: 1 }}>
                <Label>Last Name</Label>
                <Input
                  value={
                    this.state.editing
                      ? this.state.edit.lastName
                      : this.state.db.lastName
                  }
                  editable={this.state.editing}
                  onChangeText={this._lastNameChange}
                />
              </Item>
            </Item>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input value={this.state.db.email} editable={false} />
            </Item>
            <Item style={{ flexDirection: "row" }}>
              <Item stackedLabel style={{ flex: 1 }}>
                <Label>Mobile Number</Label>
                <Input
                  value={
                    this.state.editing
                      ? this.state.edit.phoneNumber
                      : this.state.db.phoneNumber
                  }
                  editable={this.state.editing}
                  onChangeText={this._phoneNumberChange}
                />
              </Item>
              <Item stackedLabel style={{ flex: 1 }}>
                <Label>Location</Label>
                <Input
                  value={
                    this.state.editing
                      ? this.state.edit.location
                      : this.state.db.location
                  }
                  editable={this.state.editing}
                  onChangeText={this._locationChange}
                />
              </Item>
            </Item>
            <Item style={{ flexDirection: "row" }}>
              <Item stackedLabel style={{ flex: 1 }}>
                <Label>Date Of Birth</Label>
                {this.state.editing ? (
                  <DatePicker
                    defaultDate={
                      this.state.db.dateOfBirth
                        ? new Date(moment(this.state.db.dateOfBirth))
                        : new Date(moment())
                    }
                    minimumDate={new Date(moment().subtract("years", 18))}
                    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                    maximumDate={new Date(moment())}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText={"Select date"}
                    onDateChange={this._dateOfBirthChange}
                    disabled={!this.state.editing}
                  />
                ) : (
                  <Label>{moment(this.state.db.dateOfBirth).format("D/M/YYYY") }</Label>
                )}
              </Item>
              <Item stackedLabel style={{ flex: 1 }}>
                <Label>Preferred Meal</Label>
                <Picker
                  selectedValue={this.state.editing
                    ? this.state.edit.preferredMeal
                    : this.state.db.preferredMeal}
                  style={{ height: 20, width: 150 }}
                  onValueChange={this._preferredMealChange}
                  enabled = {this.state.editing}
                >
                  <Picker.Item label="Veg" value="veg" />
                  <Picker.Item label="NonVeg" value="nonVeg" />
                </Picker>
              </Item>
            </Item>
            <Item stackedLabel>
              <Label>Description</Label>
              <Input
                value={
                  this.state.editing
                    ? this.state.edit.description
                    : this.state.db.description
                }
                editable={this.state.editing}
                onChangeText={this._descriptionChange}
              />
            </Item>
          </Form>
        </Content>
        {/* <Text>{JSON.stringify(this.state)}</Text>
        <Separator></Separator>
        <Text>{JSON.stringify(this.props.profile)}</Text>
        <Separator></Separator> */}
        {this.state.editing ? (
          <Button
            full
            disabled={this.state.db === this.state.edit}
            onPress={this._updateProfile}
          >
            <Text>Save</Text>
          </Button>
        ) : null}
      </KeyboardAvoidingView>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  profile: state.profile
});
const mapActionsToProps = {
  updateProfile: updateProfile,
  getProfile: getProfile
};
export default connect(mapStateToProps, mapActionsToProps)(UserInfo);
