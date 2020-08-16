import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import smallLogo2 from '../../images/Asset 2.png'
import d_profile from '../../images/D_profile.jpeg'
import t_profile from '../../images/T_profile.jpg';
import j_profile from '../../images/j_profile.png';
//import k_profile from '../../images/Kat.JPG'

import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'


const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 1024,
    computer: 1024,
  },
})

/* Heads up!
 * HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled
 * components for such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header as='h1' centered style={{
      marginTop: mobile ? '1.5em' : '2em'
    }}>
      <Image
        src={smallLogo2}
        style={{
          width: 'auto', 
          height: mobile ? '40px' : '80px'
        }} />
      <Header.Content
        style={{
          fontSize: mobile ? '2em' : '4em',
          fontWeight: 'normal',
          color: '#f5f5f5',
        }}
      >
        ZeroTask
      </Header.Content>
      <Header.Subheader style={{
        fontSize: mobile ? '0.5em' : '0.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
        color: '#f5f5f5',
      }}>
        A Collection of Friends Making Things.
      </Header.Subheader>
    </Header>

  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Media greaterThan='mobile'>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 350, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Menu.Item as='a' active>
                  Home
                </Menu.Item>
                <Menu.Item as='a'href='#contributors'>Contributors</Menu.Item>
                <Menu.Item as='a' href='#newest'>Portfolio</Menu.Item>
                <Menu.Item position='right'>
                  <Button as='a' inverted={!fixed}>
                    Log in
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Media>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Media as={Sidebar.Pushable} at='mobile'>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation='overlay'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
            <Menu.Item as='a' active>
              Home
            </Menu.Item>
            <Menu.Item as='a' href='#contributors'>Contributors</Menu.Item>
            <Menu.Item as='a' href='#newest'>Portfolio</Menu.Item>
            <Menu.Item as='a'>Log in</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 250, padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  <Menu.Item position='right'>
                    <Button as='a' inverted>
                      Log in
                    </Button>
                  </Menu.Item>
                </Menu>
              </Container>
              <HomepageHeading mobile />
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Media>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  /* Heads up!
   * For large applications it may not be best option to put all page into these containers at
   * they will be rendered twice for SSR.
   */
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = () => (
  <ResponsiveContainer>

    <Segment style={{ padding: '3em 0em' }} vertical id='contributors'>
      <Grid celled='internally' align='center' container stackable columns={3}>
      <Header as='h2' style={{ fontSize: '2em' }} >
        Contributors
        </Header>
        <Grid.Row>

          <Grid.Column>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Travis Hodge
            </Header>
            <Image bordered margin-bottom='20px' rounded size='medium' src={t_profile} href='https://travishodge.com' />
            <p style={{ fontSize: '1.33em' }}>
              
            </p>
          </Grid.Column>


          <Grid.Column >
            <Header as='h3' style={{ fontSize: '2em' }}>
              Dominic&nbsp;Critchlow
            </Header>
            <Image bordered rounded size='medium' src={d_profile} href='https://dominiccritchlow.com' />
            <p style={{ fontSize: '1.33em' }}>
              
            </p>
            
          </Grid.Column>


          <Grid.Column >
            <Header as='h3' style={{ fontSize: '2em' }}>
              Dr. Jason Kelly
            </Header>
            <Image bordered rounded size='medium' src={j_profile} href='https://github.com/jkelly5207' />
            <p style={{ fontSize: '1.33em' }}>
              
            </p>
            
          </Grid.Column>
          

        </Grid.Row>
        
      </Grid>
    </Segment>


    <Segment style={{ padding: '3em 0em' }} vertical>
      <Container text>

      <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '0em 0em', textTransform: 'uppercase' }}
        >
          <p id='newest' >Newest</p>
      </Divider>


        <Header as='h3' style={{ fontSize: '2em' }}>
          Covid App
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          Text about covid applicaiton could go somewhere here. May describing the what you are trying to 
          accomplish with the applicaotion. and this is also me just fillin in some text so it holds the 
          space. We could put a character limit on it as well.
        </p>
        <Button href='https://covid.travishodge.com' target='_blank'>
          Open
        </Button>


        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <p>Featured Content</p>
        </Divider>


        <Header as='h3' style={{ fontSize: '2em' }}>
          A Different Covid App
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          Text about covid applicaiton could go somewhere here. May describing the what you are trying to 
          accomplish with the applicaotion. and this is also me just fillin in some text so it holds the 
          space. We could put a character limit on it as well.
        </p>
        <Button href='https://covid.travishodge.com' target='_blank'>
          Open
        </Button>

      </Container>
    </Segment>

    
  </ResponsiveContainer>
)

export default HomepageLayout