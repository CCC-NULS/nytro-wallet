const fr = {
  public: {
    wallet: 'Portefeuille',
    wallets: 'Portefeuilles',
    warning: 'Attention',
    amounts: 'Montants',
    balance: 'Balance',
    balances: 'Balances',
    accounts: 'Comptes',
    total_balance: 'Balance Totale',
    usable: 'Utilisable',
    available: 'Disponible',
    price: 'Prix',
    staked: 'Participations',
    available_balance: 'Balance Disponible',
    consensus_locked_balance: 'Balance Bloquée dans le Consensus',
    time_locked_balance: 'Balance bloquée temporellement',
    time_locked: 'Bloquage Temporel',
    including_locked: '(incl. bloqué)'
  },

  resource: {
    keystore_file: "Fichier de clés",
    encrypted_private_key: "Clé privée chiffrée",
    private_key: "Clé privée",
    public_key: "Clé publique",
    address: "Adresse",
    passphrase: "Phrase de passe",

    amount: "Montant",
    min_amount: "Veuillez saisir un montant supérieur à {min}.",
    valid_amount: "Montant valide demandé: {amount}",
    insuficient_balance: "Balance disponible ({balance}) trop basse",
    available_balance: "Balance disponible:",
    remark: "Remarque",
    valid_target: "La cible semble valide",
    invalid_target: "Cible invalide",
    signed_transaction: "Transaction Signée",
    transaction_content: "Contenu de la Transaction",
    unsigned_raw_transaction: "Transaction brute (non signée)",
    fee: "Frais",
    account_name: 'Nom du Compte'
  },

  nav: {
    select: 'Selectionner un compte',
    all: 'Tout voir',
    dashboard: 'Tableau de bord',
    accounts: 'Comptes',
    actions: 'Actions',
    addAccount: 'Ajouter un compte',
    createAccount: 'Créer un compte',
    configuredWallets: 'Portefeuilles configurés'
  },

  header: {
    lastBlock: 'Dernier bloc'
  },

  actions: {
    send: 'Envoyer',
    request: 'Demander',
    consolidate: 'Consolider',
    rename: 'Renommer',
    delete: 'Supprimer',
    backup: 'Sauvegarder',
    stake: 'Participer',
    regenerate: 'Regénerer',
    add_it: "Ajouter",

    sign_transaction: 'Signer la Transaction',
    broadcast_transaction: 'Envoyer la Transaction',
    view_detail: 'voir le détail',
    save: 'Sauvegarder',
    unstake: 'Retirer la participation'
  },

  wallet: {
    wallet_value: 'Valeur du portefeuille',
    unspent_outputs: 'Sorties non dépensées',
    current_staking: 'Participations actuelles',
    more_than_2000_required: 'Pas de participation possible (Vous devez avoir une balance de 2000 NULS).',
    no_staking_yet: 'Vous ne participez à aucun agent pour l\'instant ! Faites-le pour gagner des NULS.',

    tab_transactions: 'Transactions',
    tab_staking: 'Participations (Agents)',
    consolidate_outputs: 'Consolidate {count} outputs',
    unstake_from: 'Unstake {amount} from {agent}',
    delete_account_1: 'Delete account {account_name} ?\n\nPlease backup your private key before doing this!',
    delete_account_2: 'The address is {account_address}\n\nAre you really sure? There is no way to go back!',
    delete_account_3: 'Ok, removing address {account_address}.'
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
    heading: "Ajouter un portefeuille",
    create: "Créer un portefeuille",
    import_privkey: "Importer une clé privée",
    import_encrypted_privkey: "Importer une clé privée chiffrée",
    import_keystore: "Importer un fichier de clés",
    add_view_only: "Ajouter un compte en lecture seule"
  },


  info: {
    date: 'Date',
    source: 'Source',
    target: 'Cible',
    value: 'Valeur',
    fee: 'Frais'
  },

  staking: {
    active: 'Actif',
    waiting: 'En attente',
    commission_rate: 'Taux de commission',
    participants: 'Participants',
    node_deposit: 'Dépot du noeud',
    node_staked: 'Participation total sur le noeud',
    target_node: 'Noeud cible'
  },

  transfer: {
    target_address: 'Adresse cible'
  }
};
export default fr
