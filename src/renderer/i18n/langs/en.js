const en = {
  public: {
    wallet:'Wallet',
    wallets:'Wallets',
    warning: 'Warning',
    amounts: 'Amounts',
    balance: 'Balance',
    balances: 'Balances',
    accounts: 'Accounts',
    total_balance: 'Total Balance',
    usable: 'Usable',
    available: 'Available',
    price: 'Price',
    staked: 'Staked',
    available_balance: 'Available Balance',
    consensus_locked_balance: 'Consensus Locked Balance',
    time_locked_balance: 'Time Locked Balance',
    time_locked: 'Time Locked',
    including_locked: '(incl. locked)'
  },

  resource: {
    keystore_file: "Keystore File",
    encrypted_private_key: "Encrypted Private Key",
    private_key: "Private Key",
    public_key: "Public Key",
    address: "Address",
    passphrase: "Passphrase",

    amount: "Amount",
    validation_min_amount: "Please enter an amount above {min}.",
    valid_amount: "Valid amount requested: {amount}",
    insuficient_balance: "Available balance ({balance}) too low",
    available_balance: "Available balance:",
    remark: "Remark",
    valid_target: "Target seems valid",
    invalid_target: "Invalid Target",
    signed_transaction: "Signed Transaction",
    transaction_content: "Transaction Content",
    unsigned_raw_transaction: "Unsigned Raw Transaction",
    fee: "Fee",
    account_name: 'Account Name',

    max_amount: 'Maximum amount:',
    transactions: 'Transactions'
  },

  nav: {
    select: 'Select account',
    all: 'All',
    dashboard: 'Dashboard',
    accounts:'Accounts',
    actions:'Actions',
    addAccount:'Add an account',
    createAccount:'Create an account',
    configuredWallets: 'Configured Wallets'
  },

  header: {
    lastBlock: 'Last Block'
  },

  actions: {
    send: 'Send',
    request: 'Request',
    consolidate: 'Consolidate',
    rename: 'Rename',
    delete: 'Delete',
    backup: 'Backup',
    stake: 'Stake',
    regenerate: 'Re-generate',
    add_it: 'Add it',

    sign_transaction: 'Sign Transaction',
    broadcast_transaction: 'Broadcast Transaction',
    view_detail: 'view detail',
    save: 'Save',
    unstake: 'Un-Stake'
  },

  wallet: {
    wallet_value: 'Wallet Value',
    unspent_outputs: 'Unspent Outputs',
    current_staking: 'Current Staking',
    more_than_2000_required: 'No staking available (you need more than 2000).',
    no_staking_yet: 'No staking yet. You are losing out!',

    tab_transactions: 'Transactions',
    tab_staking: 'Staking',
    consolidate_outputs: 'Consolidate {count} outputs',
    unstake_from: 'Unstake {amount} from {agent}',
    delete_account_1: 'Delete account {account_name} ?\n\nPlease backup your private key before doing this!',
    delete_account_2: 'The address is {account_address}\n\nAre you really sure? There is no way to go back!',
    delete_account_3: 'Ok, removing address {account_address}.',

    consolidate_outputs_multi: 'Consolidate {count} outputs in {tx_count} step(s)',
    consolidation_required: 'Too many outputs in this account, please consolidate before any other action.'
  },

  create: {
    new_text: `
This is a new private key, just generated for you.

Please write it down, this is **important**.
Without it, no way to access your funds.
    `,
    import_text: `
Enter your private key to access your account.
    `,
  import_encrypted_text: `
Enter your encrypted private key and corresponding password to access your account.

The resulting address should correspond to the one you are willing to import.
    `,
  import_keystore_text: `
Please upload your keystore file to import your account.
    `,
    heading: "Add new wallet",
    create: "Create new wallet",
    import_privkey: "Import private key",
    import_encrypted_privkey: "Import encrypted key",
    import_keystore: "Import keystore",
    add_view_only: "Add view-only account"
  },


  info: {
    date: 'Date',
    source: 'Source',
    target: 'Target',
    value: 'Value',
    fee: 'Fee'
  },

  staking: {
    active: 'Active',
    waiting: 'Waiting',
    commission_rate: 'Commission Rate',
    participants: 'Participants',
    node_deposit: 'Node Deposit',
    node_staked: 'Node total staked',
    target_node: 'Target node'
  },

  transfer: {
    target_address: 'Target address'
  },

  wait: {
    loading_utxo: 'Please wait, loading input transaction data.',
    preparing_tx: 'Preparing transaction.',
    loading_account_info: 'Loading account information.'
  },

  ledger: {
    display_address_on_ledger: 'Display address on Ledger Device'
  }
};
export default en
