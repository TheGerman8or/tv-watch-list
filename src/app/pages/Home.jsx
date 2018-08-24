import React from 'react';

import user from 'assets/user.json';

import styles from './Home.scss';
import Header from './home/Header';
import MainContent from './home/MainContent';
import SidebarLeft from './home/SidebarLeft';
import SidebarRight from './home/SidebarRight';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      signedIn: false,
      shows: [],
      leftActive: false,
    };
    this.fetchUser = this.fetchUser.bind(this);
    this.hideLeft = this.hideLeft.bind(this);
  }

  componentWillMount() {
    this.fetchUser();
  }

  fetchUser() {
    // const { shows } = this.state;
    this.setState({
      username: user.userName,
      shows: user.shows,
    });
  }

  hideLeft(e) {
    e.preventDefault();
    this.setState(prevState => ({ leftActive: !prevState.leftActive }));
  }

  render() {
    const {
      username,
      signedIn,
      shows,
      leftActive,
    } = this.state;
    return (
      <div className={styles.appContainer}>
        <Header
          leftActive={leftActive}
          username={username}
          signedIn={signedIn}
        />
        <SidebarLeft
          isActive={leftActive}
          handleActive={this.hideLeft}
        />
        <MainContent
          shows={shows}
        />
        <SidebarRight />
      </div>
    );
  }
}
