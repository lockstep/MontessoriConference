// @flow

// An All Components Screen is a great way to dev and quick-test components
import React from 'react'
import { Platform, View, ListView, Text, Image } from 'react-native'
import { Images } from '../Themes'
import styles from './Styles/MontessoriDirectoryScreenStyle'
import { connect } from 'react-redux'
import DirectoryActions from '../Redux/DirectoryRedux'

class MontessoriDirectoryScreen extends React.Component {

  state: {
    dataSource: Object
  }

  constructor (props) {
    super(props)
    const rowHasChanged = (r1, r2) => r1.id !== r2.id
    const ds = new ListView.DataSource({rowHasChanged})
    this.state = {
      dataSource: ds.cloneWithRows(props.profiles)
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.profiles) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(newProps.profiles)
      })
    }
  }

  componentDidMount () {
    this.props.loadProfiles();
  }

  renderAndroidWarning () {
    if (Platform.OS === 'android') {
      return (
        <Text style={styles.sectionText}>
        Android only: Animations are slow? You are probably running the app in debug mode.
          It will run more smoothly once your app will be built.
          </Text>
      )
    }
    return null
  }

  renderRow (rowData) {
    return (
      <View style={styles.row}>
      <Text style={styles.boldLabel}>{rowData.title}</Text>
      <Text style={styles.label}>{rowData.description}</Text>
      </View>
    )
  }

  noRowData () {
    return this.state.dataSource.getRowCount() === 0
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ListView
          contentContainerStyle={styles.listContent}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          pageSize={15}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const dataObjects = [
    {id: 1, title: 'First Title', description: 'First Description'},
    {id: 2, title: 'BLACKJACK!', description: 'BLACKJACK! Description'}
  ]
  return {
    profiles: dataObjects
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadProfiles: (page) => dispatch(DirectoryActions.directoryRequest(page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MontessoriDirectoryScreen)
