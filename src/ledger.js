import {LedgerAccount, NulsCommHandler, NulsLedger} from 'nuls-ledger/dist'
import {ipcMain} from 'electron'


export async function get_account(transport, chain_id) {
  let commhandler = new NulsCommHandler(transport);
  let ledger = new NulsLedger(commhandler);
  let account = new LedgerAccount();
  if (chain_id)
    account = account.coinIndex(chain_id)
  let pub = await ledger.getPubKey(account)
  return pub
}
