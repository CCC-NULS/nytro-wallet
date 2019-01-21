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

    amount: "Částka",
    min_amount: "Zadejdte prosím částku větší než {min}.",
    valid_amount: "Platná požadovaná částka: {amount}",
    insuficient_balance: "Zůstatek ({balance}) je příliš nízký",
    available_balance: "Zůstatek k dispozici:",
    remark: "Poznámka",
    valid_target: "Cíl se zdá platný",
    invalid_target: "Neplatný cíl",
    signed_transaction: "Podepsaná transakce",
    transaction_content: "Obsah transakce",
    unsigned_raw_transaction: "Nepodepsaná hrubá transakce",
    fee: "Poplatek",
    account_name: 'Jméno účtu'
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
    add_it: 'Přidat',

    sign_transaction: 'Podepsat transakci',
    broadcast_transaction: 'Poslat transakci',
    view_detail: 'Zobrazit detaily',
    save: 'Uložit',
    unstake: 'Od-Stakovat'
  },

  wallet: {
    wallet_value: 'Hodnota peněženky',
    unspent_outputs: 'Nečerpané výnosy',
    current_staking: 'Momentálně stakováno',
    more_than_2000_required: 'Stakovaní neni k dispozici (je potřeba více než 2000).',
    no_staking_yet: 'Ještě nestakujete. Tratíte!',

    tab_transactions: 'Transakce',
    tab_staking: 'Stakovani',
    consolidate_outputs: 'Sloučit {count} výnosy',
    unstake_from: 'Od-stakovat {amount} z {agent}',
    delete_account_1: 'Smazat účet {account_name} ?\n\nProsím zazálohujte si privátní klíč než to provedete!',
    delete_account_2: 'Tato adresa {account_address}\n\nJste si opravdu jisti? Poté již není cesty zpět!',
    delete_account_3: 'Ok, odstraňuji adresu {account_address}.'
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
    date: 'Datum',
    source: 'Zdroj',
    target: 'Cíl',
    value: 'Hodnota',
    fee: 'Poplatek'
 
  },

  staking: {
    active: 'Aktivní',
    waiting: 'Čekám',
    commission_rate: 'Commission Rate',
    participants: 'Účastníci',
    node_deposit: 'Vkladu uzlu',
    node_staked: 'Stakovano celkově uzlů',
    target_node: 'Cílový uzel'
  },

  transfer: {
    target_address: 'Cílová adresa'
  }
};
export default cz
