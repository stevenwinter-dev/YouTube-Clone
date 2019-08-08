import React, { Component } from 'react';
import './App.css';
import { Grid } from '@material-ui/core';
import SearchBar from './components/SearchBar';
import VideoDetail from './components/VideoDetail';
import VideoList from './components/VideoList';
import youtube from './api/youtube';


class App extends Component {
  state = {
    videos: [],
    selectedVideo: null,
  }
  handleSubmit = async (searchTerm) => {
    const response = await youtube.get('search', { 
      params: {
        part: 'snippet',
        maxResults: 5,
        key: 'AIzaSyBCbDSiKnCkhCEItWXxOLZ8waDSRxzN8do',
        q: searchTerm
      }
    });
    this.setState({ videos: response.data.items, selectedVideo: response.data.items[0] });
  }
  render() {
    const { selectedVideo } = this.state;
    return (
      <Grid justify="center" container spacing={10}>
        <Grid item xs={12}>
          <Grid container spacing={10}>
            <Grid item xs={12}>
              <SearchBar onFormSubmit={this.handleSubmit} />
            </Grid>
            <Grid item xs={8}>
              <VideoDetail video={selectedVideo} />
            </Grid>
            <Grid item xs={4}>
              <VideoList />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
 
}

export default App;
