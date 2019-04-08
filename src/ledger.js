import {LedgerAccount, NulsCommHandler, NulsLedger} from 'nuls-ledger/dist'
import {ipcMain} from 'electron'


export async function get_account(transport, network_id) {
  let commhandler = new NulsCommHandler(transport);
  let ledger = new NulsLedger(commhandler);
  let account = new LedgerAccount();
  if (network_id)
    account.coinIndex(network_id)
  let pub = await ledger.getPubKey();
  console.log(ledger, pub)
}
