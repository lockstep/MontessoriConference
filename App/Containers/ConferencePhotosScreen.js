// @flow

// An All Components Screen is a great way to dev and quick-test components
import React from 'react'
import {
  Platform, View, ListView, Text, Image, RefreshControl,
  TouchableOpacity, TextInput,
} from 'react-native'
import InfiniteScrollView from 'react-native-infinite-scroll-view'
import { Images } from '../Themes'
import styles from './Styles/ConferencePhotosScreenStyle'
import { connect } from 'react-redux'
import ConferencePhotosActions, { conferencePhotosState } from '../Redux/ConferencePhotosRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import I18n from 'react-native-i18n'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Metrics } from '../Themes/'
import CameraBar from '../Components/CameraBar'
import RoundedButton from '../Components/RoundedButton'
import { isLoggedIn } from '../Redux/LoginRedux'

class ConferencePhotosScreen extends React.Component {

  state: {
    dataSource: Object
  }

  constructor (props) {
    super(props)
    const rowHasChanged = (r1, r2) => r1.id !== r2.id
    const ds = new ListView.DataSource({rowHasChanged})
    this.state = {
      dataSource: ds.cloneWithRows(props.conferencePhotos),
      searchParams: {}
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.conferencePhotos) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(newProps.conferencePhotos)
      })
    }
  }

  async componentWillMount() {
    if(this.props.lastPageFetched > 0) return;
    this._loadMoreConferencePhotosAsync();
  }

  _loadMoreConferencePhotosAsync = async () => {
    this.props.loadConferencePhotos(this.props.lastPageFetched + 1)
  }

  handlePressCamera = () => {
    NavigationActions.camera({
      callerInfo: {
        screen: 'conferencePhotos'
      }
    });
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

  renderRow(rowData) {
    return (
      <View style={styles.rowContainer}>
        <View style={styles.ownerContainer}>
          <Image
            style={styles.ownerAvatar}
            source={{uri: rowData.avatar_url_thumb}} />
          <Text>{rowData.owner}</Text>
        </View>
        <View style={styles.conferencePhotoContainer}>
          <Image
            style={styles.conferencePhoto}
            source={{uri: rowData.image_url_large}} />
        </View>
      </View>
    )
  }

  noRowData () {
    return this.state.dataSource.getRowCount() === 0
  }

  _renderRefreshControl() {
    return (
      <RefreshControl
        refreshing={ this.props.isFetching }
        onRefresh={ this.props.reloadConferencePhotos }
      />
    );
  }

  render () {
    const { loggedIn } = this.props;

    return (
      <View style={styles.mainContainer}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          enableEmptySections={true}
          renderScrollComponent={props => <InfiniteScrollView {...props} />}
          canLoadMore={this.props.canLoadMore && !this.props.isFetching}
          onLoadMoreAsync={this._loadMoreConferencePhotosAsync.bind(this)}
          refreshControl={this._renderRefreshControl()}
        />
        { loggedIn &&
          <CameraBar onPress={this.handlePressCamera}/>
        }
        {
          !loggedIn &&
          <View style={styles.section}>
            <RoundedButton onPress={NavigationActions.login} alternateStyle="darkButton">
              Log In To Post A Photo
            </RoundedButton>
          </View>
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: isLoggedIn(state.login),
    conferencePhotos: conferencePhotosState(state).conferencePhotos,
    isFetching: conferencePhotosState(state).fetching,
    canLoadMore: conferencePhotosState(state).canLoadMore,
    lastPageFetched: conferencePhotosState(state).lastPageFetched
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadConferencePhotos: (page) => {
      dispatch(ConferencePhotosActions.conferencePhotosRequest(page))
    },
    reloadConferencePhotos: () => {
      dispatch(ConferencePhotosActions.conferencePhotosReset())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConferencePhotosScreen)
