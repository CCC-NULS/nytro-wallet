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

  console.log(account, tx_ser)

  const signature = await ledger.signTx(account, account, tx_ser)
  console.log(signature)

  const pubKeyBuf = Buffer.from(acct.publicKey, 'hex')
  console.log(pubKeyBuf)
  let scriptSig = Buffer.alloc(
    3
    + pubKeyBuf.length
    + signature.length
  )

  const ll = write_with_length(pubKeyBuf, scriptSig, 0)
  write_with_length(signature, scriptSig, ll + 1)

  return scriptSig
}
