import Transport from '@ledgerhq/hw-transport-webusb'
import {get_account, get_scriptsig} from '../ledger'

let last_transport = null;

export async function ledger_get_accounts(chain_id, show_on_ledger) {
  let transport = null
  if (last_transport !== null)
    transport = last_transport
  else
    transport = await Transport.create()
  last_transport = transport;
  console.log(transport)
  let account = null
  console.log('Transport created')
  try {
    chain_id = chain_id ? chain_id : 261
    account = await get_account(transport, chain_id, show_on_ledger)
    console.log(account)
  }
  catch (e) {
    console.warn('Error communicating with ledger', e)
  }
  // await transport.close()
  return account
}

export async function ledger_get_scriptsig (chain_id, tx_hex) {
  let transport = null
  if (last_transport !== null)
    transport = last_transport
  else
    transport = await Transport.create()
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
  // await transport.close()
  return response
}
