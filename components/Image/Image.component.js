import React from 'react';
import { asset, Image, View, StyleSheet, NativeModules, Text } from 'react-360';


const imageModule = NativeModules.ImageModule;

export default class ImageComponent extends React.Component {
  state = {
    source: `img/attractions/${this.props.infoImg}`,
    width: this.props.width ? this.props.width : 100,
    height: this.props.height ? this.props.height : 100,
    isMouseOver: false,
  };

  onMouseOn () {
    imageModule.resizeTooltip(this.props.index, 450, 450);
    imageModule.reangleTooltipFollowCam(this.props.index);
    this.setState ({
      width: 450,
      height: 450,
      isMouseOver: true,
    });
  }

  onMouseOut() {
    imageModule.resizeTooltip (
      this.props.index,
      this.props.width,
      this.props.height
    );
    this.setState ({
      width: this.props.width,
      height: this.props.height,
      isMouseOver: false,
    });
  }

  render () {
    const styleSheet = StyleSheet.create ({
      viewPanel: {
        width: this.state.width,
        height: this.state.height,
        borderRadius: 10,
      },
      textBlock: {
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: '#FFFFFF',
        width: 300,
        maxHeight: 100,
      },
      text: {
        fontSize: 24,
        color: '#000000',
      },
    });

    return (
      <View
        hitSlop={160}
        style={styleSheet.viewPanel}
        onEnter={() => this.onMouseOn ()}
        onExit={() => this.onMouseOut ()}
      >
        <Image
          source={asset (`${this.state.source}`)}
          style={styleSheet.viewPanel}
        />
        {this.state.isMouseOver
          ? <View style={styleSheet.textBlock}>
              <Text style={styleSheet.text}>{this.props.text}</Text>
            </View>
          : null}
      </View>
    );
  }
}
