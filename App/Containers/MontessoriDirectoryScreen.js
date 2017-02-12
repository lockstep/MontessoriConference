// @flow

// An All Components Screen is a great way to dev and quick-test components
import React from 'react'
import {
  Platform, View, ListView, Text, Image, RefreshControl,
  TouchableOpacity
} from 'react-native'
import InfiniteScrollView from 'react-native-infinite-scroll-view'
import { Images } from '../Themes'
import styles from './Styles/MontessoriDirectoryScreenStyle'
import { connect } from 'react-redux'
import DirectoryActions, { directoryState } from '../Redux/DirectoryRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'

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

  async componentWillMount() {
    if(this.props.lastPageFetched > 0) return;
    this._loadMoreProfilesAsync();
  }

  _loadMoreProfilesAsync = async () => {
    this.props.loadProfiles(this.props.lastPageFetched + 1)
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

    handlePressRow = () => {
      NavigationActions.directoryProfile({
        profileId: rowData.id, title: rowData.first_name
      });
    }

    return (
      <TouchableOpacity onPress={ handlePressRow }>
        <View style={styles.row}>
          <View style={styles.imageWrapper}>
            <Image source={{ uri: rowData.avatar_url_small }}
              style={styles.image} />
          </View>
          <View style={styles.info}>
            <Text style={styles.boldLabel}>{rowData.full_name}</Text>
            <Text style={styles.label} numberOfLines={1}>
              {rowData.position_with_organization}
            </Text>
            <Text style={styles.label} numberOfLines={1}>
              {rowData.full_address_country}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  noRowData () {
    return this.state.dataSource.getRowCount() === 0
  }

  _renderRefreshControl() {
    return (
      <RefreshControl
        refreshing={ this.props.isFetching }
        onRefresh={ this.props.reloadProfiles }
      />
    );
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ListView
          contentContainerStyle={styles.listContent}
          renderScrollComponent={props => <InfiniteScrollView {...props} />}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          canLoadMore={this.props.canLoadMore && !this.props.isFetching}
          onLoadMoreAsync={this._loadMoreProfilesAsync.bind(this)}
          refreshControl={this._renderRefreshControl()}
          pageSize={15}
          enableEmptySections={true}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profiles: directoryState(state).profiles,
    isFetching: directoryState(state).fetching,
    canLoadMore: directoryState(state).canLoadMore,
    lastPageFetched: directoryState(state).lastPageFetched
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadProfiles: (page) => dispatch(DirectoryActions.directoryRequest(page)),
    reloadProfiles: () => dispatch(DirectoryActions.directoryReset())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MontessoriDirectoryScreen)
