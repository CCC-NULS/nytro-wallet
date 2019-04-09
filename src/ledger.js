import {LedgerAccount, NulsCommHandler, NulsLedger} from 'nuls-ledger/dist'
import { Transaction } from 'nulsworldjs/src/model/transaction'
import { write_with_length } from 'nulsworldjs/src/model/data'
import {ipcMain} from 'electron'

function get_ledger_account(chain_id) {
  let account = new LedgerAccount()
  if (chain_id)
    account = account.coinIndex(chain_id)
  return account
}

export async function get_account(transport, chain_id) {
  let commhandler = new NulsCommHandler(transport)
  let ledger = new NulsLedger(commhandler)
  let account = get_ledger_account(chain_id)
  let pub = await ledger.getPubKey(account)
  return pub
}

export async function get_scriptsig(transport, chain_id, tx_ser) {
  let commhandler = new NulsCommHandler(transport)
  let ledger = new NulsLedger(commhandler)
  let account = get_ledger_account(chain_id)
  const acct = await ledger.getPubKey(account)

  const signature = await ledger.signTx(account, account, tx_ser)
  let pub_key = Buffer.from(acct.publicKey, 'hex')
  let buf = Buffer.alloc(3 + pub_key.length + signature.length)
  let cursor = write_with_length(pub_key, buf, 0)
  cursor += 1 // we let a zero there for alg ECC type
  cursor += write_with_length(signature, buf, cursor)
  return buf
}
