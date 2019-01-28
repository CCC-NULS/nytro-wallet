const es = {
  public: {
    wallet: 'Cartera',
    wallets:'Carteras',
    warning: 'Aviso',
    amounts: 'Importes',
    balance: 'Saldo',
    balances: 'Saldos',
    accounts: 'Cuentas',
    total_balance: 'Saldo Total',
    usable: 'Utilizable',
    available: 'Disponible',
    price: 'Precio',
    staked: 'Apostado',
    available_balance: 'Saldo Disponible',
    consensus_locked_balance: 'Saldo de consenso bloqueado',
    time_locked_balance: 'Saldo de tiempo bloqueado',
    time_locked: 'Tiempo bloqueado',
    including_locked: '(bloqueado incluido)'
  },

  resource: {
    keystore_file: "Archivo de almacén de claves",
    encrypted_private_key: "Clave privada cifrada (encriptada)",
    private_key: "Clave privada",
    public_key: "Clave pública",
    address: "Dirección",
    passphrase: "Frase de contraseña",

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

    max_amount: 'Maximum amount:'
  },

  nav: {
    select: 'Seleccionar',
    all: 'Todo',
    dashboard: 'Tablero de instrumentos',
    accounts:'Cuentas',
    actions:'Acciones',
    addAccount:'Añadir una cuenta',
    createAccount:'Crear una cuenta',
    configuredWallets: 'Carteras configuradas'
  },

  header: {
    lastBlock: 'Último bloque'
  },

  actions: {
    send: 'Enviar',
    request: 'Solicitar',
    consolidate: 'Consolidar',
    rename: 'Renombrar',
    delete: 'Eliminar',
    backup: 'Copia de seguridad',
    stake: 'Apostar',
    regenerate: 'Volver a generar',
    add_it: 'Añádelo',

    sign_transaction: 'Sign Transaction',
    broadcast_transaction: 'Broadcast Transaction',
    view_detail: 'view detail',
    save: 'Save',
    unstake: 'Un-Stake'
  },

  wallet: {
    wallet_value: 'Valor de la cartera',
    unspent_outputs: 'Salidas no utilizadas',
    current_staking: 'Apuesta actual',
    more_than_2000_required: 'No hay apuestas disponibles (necesita más de 2000)',
    no_staking_yet: 'Todavía no hay apuestas',

    tab_transactions: 'Transactions',
    tab_staking: 'Staking',
    consolidate_outputs: 'Consolidate {count} outputs',
    unstake_from: 'Unstake {amount} from {agent}',
    delete_account_1: 'Delete account {account_name} ?\n\nPlease backup your private key before doing this!',
    delete_account_2: 'The address is {account_address}\n\nAre you really sure? There is no way to go back!',
    delete_account_3: 'Ok, removing address {account_address}.'
  },

  create: {
    new_text: `
Esta es una clave privada que acaba de generar.

Por favor escríbalo, esto es **importante**
sin ella, no podrá acceder a sus fondos.
    `,
    import_text: `
Ingrese su clave privada para acceder a su cuenta.
    `,
  import_encrypted_text: `
Ingrese su clave privada encriptada y la contraseña correspondiente para acceder a su cuenta.

:a dirección resultante debe corresponder a la que está dispuesto a importar.
    `,
  import_keystore_text: `
Por favor, cargue su archivo de almacén de claves para importar su cuenta.
    `,
    heading: "Añadir nueva cartera",
    create: "Crear nueva billetera",
    import_privkey: "Importar clave privada",
    import_encrypted_privkey: "Importar clave encriptada",
    import_keystore: "Importar almacén de claves",
    add_view_only: "Añadir cuenta de solo lectura"
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
export default es
