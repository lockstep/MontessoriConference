// @flow

// An All Components Screen is a great way to dev and quick-test components
import React from 'react'
import {
  Platform, View, ListView, Text, Image, RefreshControl,
  TouchableOpacity, TextInput,
} from 'react-native'
import InfiniteScrollView from 'react-native-infinite-scroll-view'
import { Images } from '../Themes'
import styles from './Styles/MontessoriDirectoryScreenStyle'
import ProfileTile from '../Components/ProfileTile'
import { connect } from 'react-redux'
import DirectoryActions, { directoryState } from '../Redux/DirectoryRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import I18n from 'react-native-i18n'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Metrics } from '../Themes/'

class MontessoriDirectoryScreen extends React.Component {

  state: {
    dataSource: Object
  }

  constructor (props) {
    super(props)
    const rowHasChanged = (r1, r2) => r1.id !== r2.id
    const ds = new ListView.DataSource({rowHasChanged})
    this.state = {
      dataSource: ds.cloneWithRows(props.profiles),
      searchParams: {}
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
    this.props.loadProfiles(
      this.props.lastPageFetched + 1, this.state.searchParams
    )
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
    return <ProfileTile { ...rowData } />
  }

  renderHeader () {

    const onSubmitEditing = () => {
      this.props.reloadProfiles(this.state.searchParams)
    }

    const onSearchQueryInput = (textInput) => {
      const newParams = Object.assign({}, this.state.searchParams, {
        query: textInput
      })
      this.setState({ searchParams: newParams })
    }

    return (
      <View style={styles.formWrapper}>
        <Icon name='search' size={Metrics.icons.small} style={styles.searchIcon} />
        <TextInput
          placeholder={I18n.t('searchDirectory')}
          underlineColorAndroid='transparent'
          style={styles.searchInput}
          value={this.props.searchTerm}
          autoCapitalize='none'
          onChangeText={ onSearchQueryInput }
          onSubmitEditing={onSubmitEditing}
          returnKeyType={'search'}
          autoCorrect={false}
        />
      </View>
    )
  }

  noRowData () {
    return this.state.dataSource.getRowCount() === 0
  }

  _renderRefreshControl() {
    const reloadWithSearchParams = () => {
      this.props.reloadProfiles(this.state.searchParams)
    }

    return (
      <RefreshControl
        refreshing={ this.props.isFetching }
        onRefresh={ reloadWithSearchParams.bind(this) }
      />
    );
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ListView
          renderSectionHeader={this.renderHeader.bind(this)}
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
    loadProfiles: (page, params) => {
      dispatch(DirectoryActions.directoryRequest(page, params))
    },
    reloadProfiles: (params) => {
      dispatch(DirectoryActions.directoryReset(params))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MontessoriDirectoryScreen)
