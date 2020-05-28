import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getDropdownRef } from "@components/Dropdown/Dropdown.react";
import Styles from "./PicUpload.style";
import { StyleType } from "@utils";

export interface Props {}

export interface State {
  image: any;
}

class PicUpload extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
    this.dropdownRef = getDropdownRef();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert(
          "We need permission to access your camera roll to upload a profile picture."
        );
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
    } catch (E) {
      this.dropdownRef.alertWithType(
        "error",
        "Photo Error",
        "Unable to access the photo library."
      );
    }
  };

  render() {
    const { image } = this.state;

    return (
      <TouchableOpacity
        style={Styles.shapeBackground}
        onPress={this._pickImage}
      >
        {image && (
          <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
        )}
      </TouchableOpacity>
    );
  }
}

export default PicUpload;
