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
    stake: 'Stake'
  },

  wallet: {
    wallet_value: 'Wallet Value',
    unspent_outputs: 'Unspent Outputs',
    current_staking: 'Current Staking',
    more_than_2000_required: 'No staking available (you need more than 2000).',
    no_staking_yet: 'No staking yet. You are losing out!'
  },

  create: {
    new_text: `
    This is a new private key, just generated for you.

    Please write it down, this is **important**.
    Without it, no way to access your funds.
    `,
    heading: "Add new wallet",
    create: "Create new wallet",
    import_privkey: "Import private key",
    import_encrypted_privkey: "Import encrypted key",
    import_keystore: "Import keystore",
    add_view_only: "Add view-only account"
  }
};
export default en
