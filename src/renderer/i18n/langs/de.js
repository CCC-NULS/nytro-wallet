const de = {
  public: {
    wallet:'Wallet',
    wallets:'Wallets',
    warning: 'Warnung',
    amounts: 'Beträge',
    balance: 'Guthaben',
    balances: 'Guthaben',
    accounts: 'Konten',
    total_balance: 'Gesamtguthaben',
    usable: 'Verwendbar',
    available: 'Verfügbar',
    price: 'Preis',
    staked: 'Hinterlegt (Staked)',
    available_balance: 'Verfügbares Guthaben',
    consensus_locked_balance: 'Consensus gesperrtes Guthaben',
    time_locked_balance: 'Zeitlich gesperrtes Guthaben',
    time_locked: 'Zeitlich gesperrt',
    including_locked: '(inkl. gesperrt)'
  },

  resource: {
    keystore_file: "Schlüsselspeicherdatei",
    encrypted_private_key: "Verschlüsselter privater Schlüssel",
    private_key: "Privater Schlüssel",
    public_key: "Öffentlicher Schlüssel",
    address: "Adresse",
    passphrase: "Passphrase",

    amount: "Betrag",
    validation_min_amount: "Bitte geben Sie einen Betrag über {min} ein.",
    valid_amount: "Gültiger Betrag angefordert: {amount}",
    insuficient_balance: "Verfügbarer Betrag ({balance}) zu niedrig",
    available_balance: "Verfügbarer Betrag:",
    remark: "Anmerkung",
    valid_target: "Ziel scheint gültig zu sein",
    invalid_target: "Ungültiges Ziel",
    signed_transaction: "Signierte Transaktionen",
    transaction_content: "Transaktionsinhalt",
    unsigned_raw_transaction: "Nicht signierte unformatierte Transaktion",
    fee: "Gebühr",
    account_name: 'Kontoname',

    max_amount: 'Maximum amount:'
  },

  nav: {
    select: 'Konto auswählen',
    all: 'Alle',
    dashboard: 'Übersicht',
    accounts:'Konten',
    actions:'Aktionen',
    addAccount:'Konto hinzufügen',
    createAccount:'Neues Konto erstellen',
    configuredWallets: 'Konfigurierte Wallets'
  },

  header: {
    lastBlock: 'Letzter Block'
  },

  actions: {
    send: 'Senden',
    request: 'Anfordern',
    consolidate: 'Konsolidieren',
    rename: 'Umbenennen',
    delete: 'Löschen',
    backup: 'Sichern',
    stake: 'Hinterlegen (Stake)',
    regenerate: 'Regenerieren',
    add_it: 'Hinzufügen',

    sign_transaction: 'Transaktion signieren',
    broadcast_transaction: 'Broadcast Transaktion',
    view_detail: 'Details',
    save: 'Speichern',
    unstake: 'Abheben (Un-Stake)'
  },

  wallet: {
    wallet_value: 'Wallet Wert',
    unspent_outputs: 'Unspent Outputs',
    current_staking: 'Aktuelle Hinterlegung (Staking)',
    more_than_2000_required: 'Keine Hinterlegung (Staking) möglich (mehr als 2000 Tokens notwendig).',
    no_staking_yet: 'Noch keine Hinterlegung (Staking) bisher. Du verpasst es!',

    tab_transactions: 'Transaktionen',
    tab_staking: 'Hinterlegung (Staking)',
    consolidate_outputs: 'Consolidate {count} outputs',
    unstake_from: 'Hebe {amount} von {agent} ab (Unstaking)',
    delete_account_1: 'Konto {account_name} löschen?\n\nBitte sichern Sie Ihren privaten Schlüssel, bevor Sie dies tun!',
    delete_account_2: 'Die Adresse lautet {account_address}\n\nSind Sie sich wirklich sicher? Es gibt keinen Weg zurück!',
    delete_account_3: 'Ok, die Adresse {account_address} wird gelöscht.'
  },

  create: {
    new_text: `
Dies ist ein neuer privater Schlüssel, der gerade für Sie generiert wurde.

Bitte schreiben Sie ihn auf, dass ist sehr **wichtig**.
Ohne den privaten Schlüssel haben Sie keine Möglichkeit auf Ihre Token zuzugreifen.
    `,
    import_text: `
Geben Sie Ihren privaten Schlüssel ein, um auf Ihr Konto zuzugreifen.
    `,
  import_encrypted_text: `
Geben Sie Ihren verschlüsselten privaten Schlüssel und das entsprechende Kennwort ein, um auf Ihr Konto zuzugreifen.

Die Adresse sollte der Adresse entsprechen, die Sie importieren möchten.
    `,
  import_keystore_text: `
Laden Sie Ihre Schlüsselspeicherdatei hoch, um Ihr Konto zu importieren.
    `,
    heading: "Neue Wallet hinzufügen",
    create: "Neue Wallet erstellen",
    import_privkey: "Privaten Schlüssel importieren",
    import_encrypted_privkey: "Verschlüsselten privaten Schlüssel importieren",
    import_keystore: "Schlüsselspeicherdatei importieren",
    add_view_only: "Nur-lesendes Konto hinzufügen"
  },


  info: {
    date: 'Datum',
    source: 'Quelle',
    target: 'Ziele',
    value: 'Wert',
    fee: 'Gebühr'
  },

  staking: {
    active: 'Aktiv',
    waiting: 'Wartend',
    commission_rate: 'Provision',
    participants: 'Teilnehmer',
    node_deposit: 'Node Deposit',
    node_staked: 'Node gesamtes Stacking',
    target_node: 'Ziel Node'
  },

  transfer: {
    target_address: 'Zieladresse'
  }
};
export default de
