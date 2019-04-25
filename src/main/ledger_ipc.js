import Transport from '@ledgerhq/hw-transport-node-hid'
// import {ipcMain} from 'electron'
import {get_account, get_scriptsig} from '../ledger'
const {ipcpMain} = require('electron-ipcp')

// .getPubKey(new LedgerAccount()) => first acct
// .getPubKey(new LedgerAccount().change(true)) => first acct change
// .getPubKey(new LedgerAccount().index(1)) => first acct index 1

// ipcMain.on('ledger.get_accounts', async (event, data) => {
//   //console.log("Received: " + data)
//   //event.sender.send('message', {a: 'Hello interface!'})
//   let transport = await Transport.create()
//   let chain_id = (data && data.chain_id) ? data.chain_id : 261;
//   let account = await get_account(transport, chain_id)
//   event.sender.send('ledger.set_account', account)
// })


ipcpMain.on('ledger_get_accounts', async (event, chain_id, show_on_ledger) => {
  let transport = await Transport.create()
  try {
    chain_id = chain_id ? chain_id : 261
    let account = await get_account(transport, chain_id, show_on_ledger)
    event.respond(account)
  }
  catch (e) {
    event.respond(null)
  }
  await transport.close()
})

ipcpMain.on('ledger_get_scriptsig', async (event, chain_id, tx_hex) => {
  console.log(tx_hex)
  let transport = await Transport.create()
  try {
    chain_id = chain_id ? chain_id : 261
    let tx_ser = Buffer.from(tx_hex, 'hex')
    let scriptSig = await get_scriptsig(transport, chain_id, tx_ser)
    console.log(scriptSig.toString('hex'))
    event.respond(scriptSig.toString('hex'))
  }
  catch (e) {
    event.respond(null)
  }
  await transport.close()
})
