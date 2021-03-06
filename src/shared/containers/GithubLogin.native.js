import GithubLoginButton from 'shared/components/GithubLoginButton';
import OAuthManager from 'react-native-oauth';
import React from 'react';
import {Platform} from 'react-native';
import {connect} from 'react-redux';
import {onLoginSuccess} from 'shared/actions/thunks';

class GithubLogin extends React.Component {
  static manager = new OAuthManager('githubsearch')

  githubConfig = {
    client_id: Platform.select({ios: '8d07750095c0b3e4a7a1', android: '551957e1a0313ce3ab27'}),
    client_secret: Platform.select({ios: 'ff8b0392def34bad9bc9bad8fb2fe6b464463db1', android: 'ad39cade04054dc7b1e465055f7a34bf92e2398f'})
  }

  componentDidMount () {
    GithubLogin.manager.configure({
      github: this.githubConfig
    });
  }

  logMeIn = () => {
    GithubLogin.manager.authorize('github', {scopes: 'profile,user'}).
      then(this.props.onLoginSuccess).
      catch(this.props.onLoginFailure);
  }

  render () {
    return <GithubLoginButton triggerLogin={this.logMeIn} isLoggedIn={this.props.user.isLoggedIn} />;
  }
}


const mapDispatchToProps = (dispatch) => ({
  onLoginSuccess: ({response}) => {
    dispatch(onLoginSuccess(response.credentials.accessToken));
  },
  onLoginFailure: console.log
});

const mapStateToProps = ({user}) => ({
  user
});


export default connect(mapStateToProps, mapDispatchToProps)(GithubLogin);
