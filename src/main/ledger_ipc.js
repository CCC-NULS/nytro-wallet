import Transport from '@ledgerhq/hw-transport-node-hid'
import {LedgerAccount, NulsCommHandler, NulsLedger} from 'nuls-ledger/dist'
import {ipcMain} from 'electron'
import {get_account} from '../ledger'

// .getPubKey(new LedgerAccount()) => first acct
// .getPubKey(new LedgerAccount().change(true)) => first acct change
// .getPubKey(new LedgerAccount().index(1)) => first acct index 1

ipcMain.on('ledger.get_accounts', async (event, data) => {
  //console.log("Received: " + data)
  //event.sender.send('message', {a: 'Hello interface!'})
  let transport = await Transport.create();
  let network_id = (data && data.network_id) ? data.network_id : 261;
})
