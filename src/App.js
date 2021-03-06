import React from 'react'
import { createStore } from '@spyna/react-store'
import Web3 from 'web3'

import config from './config.json'
import yusdABI from './abi/yUSD.abi.json'
import syusdABI from './abi/syUSD.abi.json'

import NavContainer from './containers/Nav'
import JoinExitContainer from './containers/JoinExit'
import BalanceContainer from './containers/Balance'
import TotalSupplyContainer from './containers/TotalSupply'
import TransfersyUSDContainer from './containers/TransfersyUSD'
import { setupContracts, getData, WadDecimal } from './utils/web3Utils'

import theme from './theme/theme'

import Typography from '@material-ui/core/Typography'
import { withStyles, ThemeProvider } from '@material-ui/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'


const styles = () => ({
  root: {
    flexGrow: 1,
  },
  paper: {
  },
  footer: {
    textAlign: 'center',
  },
  navContainer: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
    minHeight: 52
  },
  contentContainer: {
      // boxShadow: '0px 0px 30px 0px rgba(0, 0, 0, 0.05)',
      borderRadius: theme.shape.borderRadius,
      padding: 0,
      marginBottom: theme.spacing(3)
  }
})

const web3 = new Web3(new Web3.providers.HttpProvider(config.defaultWeb3Provider))

const initialState = {
    web3: web3,
    web3Failure: false,
    network: 1,
    yusdObject: new web3.eth.Contract(yusdABI, config.yUSD),
    syusdObject: new web3.eth.Contract(syusdABI, config.syUSD),
    walletAddress: '',
    walletConnecting: false,
    walletType: '',
    yusdBalance: '',
    yusdAllowance: '',
    yusdBalanceDecimal: new WadDecimal(0),
    allowanceAvailable: false,
    syusdBalance: '',
    syusdBalanceRaw: '',
    syusdBalanceDecimal: new WadDecimal(0),
    syusdUnderlyingBalance: '',
    syusdUnderlyingBalanceRaw: '',
    syusdUnderlyingBalanceDecimal: new WadDecimal(0),
    dsrRaw: '',
    dsr: '',
    pps: '',
    ppsRaw:'',
    syusdTotalSupply:'',
    joinAmount: new WadDecimal(0),
    exitAmount: new WadDecimal(0),
    joinexitAction: 0,
    transferAmount: new WadDecimal(0),
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    async componentDidMount() {
    }

    render() {
        const classes = this.props.classes
        return (
            <ThemeProvider theme={theme}>
                <Container maxWidth="md">
                    <Grid container spacing={3}>
                        <Grid item xs={12}><br/></Grid>
                        <NavContainer />
                        <Grid item xs={12} md={6}>
                          <JoinExitContainer />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <BalanceContainer />
                        </Grid>
                        <Grid item xs={12}>
                          <TransfersyUSDContainer />
                        </Grid>
                        <Grid item xs={12} className={classes.footer}>
                          Interacting with the syUSD contract at: <a target="_blank" href={"https://etherscan.io/token/" + config.syUSD} rel="noopener noreferrer">{config.syUSD}</a><br />
                          <TotalSupplyContainer />
                          <a href="/about.html">Learn more about syUSD</a>
                        </Grid>
                        <Grid item xs={12} className={classes.footer}>
                         syusd.cash by&nbsp;
                              <a target="_blank" href="https://twitter.com/andy8052" rel="noopener noreferrer">andy8052</a>. <br />
                         &nbsp; UI at <a href="https://github.com/andy8052/syusd-web">github.com/andy8052/syusd-web</a><br />
                              forked from <a href="https://github.com/lucasvo/chui">chai.money UI</a> thanks guys
                        </Grid>
                    </Grid>
                </Container>
            </ThemeProvider>
        )
    }
}

export default createStore(withStyles(styles)(App), initialState)
