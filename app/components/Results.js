import React from 'react';
import { FaBriefcase, FaCompass, FaUsers, FaUser, FaUserFriends } from 'react-icons/fa';
import { battle } from '../utils/api';
import Card from './Card';

function ProfileList({ profile }) {
  return (
    <ul className='card-list'>
      <li>
        <FaUser color='rgb(239, 115, 115)' size={22} />
        {profile.name}
      </li>
      {profile.location && (
        <li>
          <FaCompass color='rgb(144, 115, 255)' size={22} />
          {profile.location}
        </li>
      )}
      {profile.company && (
        <li>
          <FaBriefcase color='#795548' size={22} />
          {profile.company}
        </li>
      )}
      <li>
        <FaUsers color='rgb(129, 195, 245)' size={22} />
        {profile.followers.toLocaleString()} followers
      </li>
      <li>
        <FaUserFriends color='rgb(64, 183, 95)' size={22} />
        {profile.following.toLocaleString()} following
      </li>
    </ul>
  );
}

export default class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true,
    };
  }
  componentDidMount() {
    const { playerOne, playerTwo } = this.props;
    battle([playerOne, playerTwo])
      .then((players) => {
        this.setState({
          winner: players[0],
          loser: players[1],
          error: null,
          loading: false,
        });
      })
      .catch(({ message }) =>
        this.setState({
          error: message,
          loading: false,
        })
      );
  }
  render() {
    const { winner, loser, error, loading } = this.state;

    if (loading) {
      return <p>Loading</p>;
    }
    if (error) {
      return <p className='center-text error'>{error}</p>;
    }
    return (
      <>
        {' '}
        <div className='grid space-around container-sm'>
          <Card
            header={winner.score === loser.score ? 'Tie' : 'Winner'}
            name={winner.profile.login}
            subheader={winner.profile.login}
            avatar={winner.profile.avatar_url}
            href={winner.profile.login}
          >
            <ProfileList profile={winner.profile} />
          </Card>
          <Card
            header={winner.score === loser.score ? 'Tie' : 'Loser'}
            name={loser.profile.login}
            subheader={loser.profile.login}
            avatar={loser.profile.avatar_url}
            href={loser.profile.login}
          >
            <ProfileList profile={loser.profile} />
          </Card>
        </div>
        <button onClick={this.props.onReset} className='btn dark-btn btn-space'>
          Reset
        </button>
      </>
    );
  }
}
