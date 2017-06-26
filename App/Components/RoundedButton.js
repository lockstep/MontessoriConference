import React, { PropTypes } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styles from './Styles/RoundedButtonStyles'
import ExamplesRegistry from '../Services/ExamplesRegistry'
import Spinner from './Spinner'

// Example
ExamplesRegistry.addComponentExample('Rounded Button', () =>
  <RoundedButton
    text='real buttons have curves'
    onPress={() => window.alert('Rounded Button Pressed!')}
  />
)

export default class RoundedButton extends React.Component {
  static propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string,
    children: PropTypes.string,
    navigator: PropTypes.object,
    alternateStyle: PropTypes.string
  }

  getText () {
    const buttonText = this.props.text || this.props.children || ''
    return buttonText.toUpperCase()
  }

  render () {
    const message = (this.props.busy) ? <Spinner /> : <Text style={styles.buttonText}>{this.getText()}</Text>

    return (
      <TouchableOpacity style={styles[this.props.alternateStyle || 'button']} onPress={this.props.onPress}>
        {message}
      </TouchableOpacity>
    )
  }
}
