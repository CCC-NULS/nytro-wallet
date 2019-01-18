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
    passphrase: "Passphrase"
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
    add_it: 'Add it'
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
  }
};
export default en
