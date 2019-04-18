import Transport from '@ledgerhq/hw-transport-u2f'
import {get_account, get_scriptsig} from '../ledger'

export async function ledger_get_accounts(chain_id, show_on_ledger) {
  let transport = await Transport.create()
  let account = null
  try {
    chain_id = chain_id ? chain_id : 261
    let account = await get_account(transport, chain_id, show_on_ledger)
  }
  catch (e) {
    console.warn('Error communicating with ledger', e)
  }
  transport.close()
  return account
}

export async function ledger_get_scriptsig (chain_id, tx_hex) {
  console.log(tx_hex)
  let transport = await Transport.create()
  let response = null
  try {
    chain_id = chain_id ? chain_id : 261
    let tx_ser = Buffer.from(tx_hex, 'hex')
    let scriptSig = await get_scriptsig(transport, chain_id, tx_ser)
    console.log(scriptSig.toString('hex'))
    response = scriptSig.toString('hex')
  }
  catch (e) {
    console.warn('Error communicating with ledger', e)
  }
  transport.close()
  return response
}
