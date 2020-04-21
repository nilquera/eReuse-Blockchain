import { providers } from "ethers"
// import Web3 from "web3"

// Web3.providers.WebsocketProvider.prototype.sendAsync = Web3.providers.WebsocketProvider.prototype.send

let provider: providers.Web3Provider = null
let web3

export enum AccountState {
    Unknown = "Unknown",
    NoWeb3 = "Web3 is not detected on your browser",
    NoEthereum = "Ethereum is not detected on your browser",
    Locked = "Account is locked",
    Ok = "Ok"
}

export default class Web3Wallet {
    static get provider() { return provider }
    static get signer() { return provider.getSigner() }
    static get web3 () {return web3}

    static isAvailable() {
        return Web3Wallet.isWeb3Available() && Web3Wallet.isEthereumAvailable()
    }

    static isWeb3Available() {
        return typeof window["web3"] !== 'undefined'
    }

    static isEthereumAvailable() {
        return typeof window["ethereum"] !== 'undefined'
    }

    static connect() {
        if (provider != null) provider.polling = false
        provider = new providers.Web3Provider(window["web3"].currentProvider)
        // window["web3"].currentProvider.sendAsync = window["web3"].currentProvider.send
        // provider = new providers.Web3Provider(window["web3"].currentProvider)
        // provider = new Web3(window["web3"].currentProvider)
        // // provider.sendAsync = provider.send
        web3 = window["web3"]
    }

    public static unlock(): Promise<void> {
        if (!provider) this.connect()
        return window["ethereum"].enable()
    }

    public static getAccountState(): Promise<AccountState> {
        if (!Web3Wallet.isWeb3Available()) return Promise.resolve(AccountState.NoWeb3)
        else if (!Web3Wallet.isEthereumAvailable()) return Promise.resolve(AccountState.NoEthereum)
        else if (!provider) return Promise.resolve(AccountState.Locked)

        return provider.listAccounts()
            .then(accounts => {
                if (accounts && accounts[0]) return AccountState.Ok
                else return AccountState.Locked
            })
    }

    public static getAddress(): Promise<string> {
        if (!provider) this.connect()
        return provider.getSigner().getAddress()
    }

    public static getNetworkName(): string {
        if (!Web3Wallet.isAvailable()) return ""
        
        if (!provider) this.connect()
        return provider.network.name
    }
}
