import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './Styles/AlertMessageStyles'
import ErrorActions from '../Redux/ErrorRedux'

class AlertMessage extends React.Component {
  static propTypes = {
    icon: PropTypes.string,
    style: PropTypes.object
  }

  constructor(props) {
    super(props)
  }

  handleCloseAlertMessage = () => {
    this.props.clearError()
  }

  render () {
    let messageComponent = null
    const { errorMessage } = this.props

    if (errorMessage) {
      return (
        <View style={styles.container}>
          <Text style={styles.message}>{errorMessage}</Text>
          <Icon style={styles.icon} name='close' onPress={this.handleCloseAlertMessage} />
        </View>
      )
    }

    return messageComponent
  }
}

const mapStateToProps = (state, ownProps) =>  {
  return {
    errorMessage: state.error.message,
    errorType: state.error.errorType
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearError: () => {
      dispatch(ErrorActions.clearError())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertMessage)
