const cz = {
  public: {
    wallet:'Peněženka',
    wallets:'Peněženky',
    warning: 'Varování',
    amounts: 'Částka',
    balance: 'Zůstatek',
    balances: 'Zůstatky',
    accounts: 'Účty',
    total_balance: 'Celkový zůstatek',
    usable: 'Použitelný',
    available: 'K dispozici',
    price: 'Cena',
    staked: 'Stakováno',
    available_balance: 'Zůstatek k dispozici',
    consensus_locked_balance: 'Uzamčený zůstatek v Konsensu',
    time_locked_balance: 'Časově uzamčený zůstatek',
    time_locked: 'Časově uzamčený',
    including_locked: '(vč. uzamčených)'
  },

  resource: {
    keystore_file: "Soubor s privatním klíčem",
    encrypted_private_key: "Zakodovaný privátní klíč",
    private_key: "Privátní klíč",
    public_key: "Veřejný klíč",
    address: "Adresa",
    passphrase: "Přístupové heslo",

    amount: "Amount",
    min_amount: "Please enter an amount above {min}.",
    valid_amount: "Valid amount requested: {amount}",
    insuficient_balance: "Available balance ({balance}) too low",
    available_balance: "Available balance:",
    remark: "Remark",
    valid_target: "Target seems valid",
    invalid_target: "Invalid Target"
  },

  nav: {
    select: 'Vyberte účet',
    all: 'Vše',
    dashboard: 'Dashboard',
    accounts:'Účty',
    actions:'Akce',
    addAccount:'Přidat účet',
    createAccount:'Vytvořit účet',
    configuredWallets: 'Nastavit peneženky'
  },

  header: {
    lastBlock: 'Poslední blok'
  },

  actions: {
    send: 'Poslat',
    request: 'Vyžádat',
    consolidate: 'Sloučit',
    rename: 'Přejmenovat',
    delete: 'Smazat',
    backup: 'Zálohovat',
    stake: 'Stakovat',
    regenerate: 'Obnovit',
    add_it: 'Přidat'
  },

  wallet: {
    wallet_value: 'Hodnota peněženky',
    unspent_outputs: 'Nečerpané výnosy',
    current_staking: 'Momentálně stakováno',
    more_than_2000_required: 'Stakovaní neni k dispozici (je potřeba více než 2000).',
    no_staking_yet: 'Ještě nestakujete. Tratíte!',

    tab_transactions: 'Transactions',
    tab_staking: 'Staking'

  },

  create: {
    new_text: `
Toto je nový privátní klíč, vygenerovaný jen pro vás.
Prosím zapište si ho, je to **DŮLEŽITÉ**.
Bez něj, se není možné dostat k vašim účtům.
    `,
    import_text: `
Vložte svůj privátní klíč k odemknutí vašeho účtu.
	    `,
  import_encrypted_text: `
Vložte svůj zakodovaný privátní klíč a odpovídající heslo pro přístup k Vašemu účtu.

Výsledná adresa by měla být shodná s tou, kterou jste ochotni importovat.
    `,
  import_keystore_text: `
Prosím nahrajte váš soubor s privátním klíčem pro import vašeho účtu.
    `,
    heading: "Přidat novou peneženku",
    create: "Vytvořit novou peněženku",
    import_privkey: "Importovat privátní klíč",
    import_encrypted_privkey: "Importovat zakódovaný klíč",
    import_keystore: "Importovat klíč ze souboru",
    add_view_only: "Přidat účet jen pro prohlížení"
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
  }
};
export default cz
