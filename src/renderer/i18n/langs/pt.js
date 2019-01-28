const pt = {
  public: {
    wallet:'Carteira',
    wallets:'Carteiras',
    warning: 'Aviso',
    amounts: 'Quantidades',
    balance: 'Saldo',
    balances: 'Saldos',
    accounts: 'Contas',
    total_balance: 'Saldo Total',
    usable: 'Utilizável',
    available: 'Disponível',
    price: 'Preço',
    staked: 'Participação',
    available_balance: 'Saldo Disponível',
    consensus_locked_balance: 'Saldo Bloqueado por Consenso',
    time_locked_balance: 'Saldo Bloqueado por Tempo',
    time_locked: 'Tempo Bloqueado',
    including_locked: '(incl. bloqueado)'
  },

  resource: {
    keystore_file: "Arquivo de Armazenamento de Chaves",
    encrypted_private_key: "Chave Privada Criptografada",
    private_key: "Chave Privada",
    public_key: "Chave Pública",
    address: "Endereço",
    passphrase: "Frase-chave",

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
    select: 'Selecionar Conta',
    all: 'Todos',
    dashboard: 'Painel',
    accounts:'Contas',
    actions:'Acões',
    addAccount:'Adicionar Conta',
    createAccount:'Criar Conta',
    configuredWallets: 'Configurar Carteira'
  },

  header: {
    lastBlock: 'Último Bloco'
  },

  actions: {
    send: 'Enviar',
    request: 'Receber',
    consolidate: 'Consolidar',
    rename: 'Renomear',
    delete: 'Apagar',
    backup: 'Cópia de Segurança',
    stake: 'Participação',
    regenerate: 'Re-generar',
    add_it: 'Adicionar',

    sign_transaction: 'Sign Transaction',
    broadcast_transaction: 'Broadcast Transaction',
    view_detail: 'view detail',
    save: 'Save',
    unstake: 'Un-Stake'
  },

  wallet: {
    wallet_value: 'Valor da Carteira',
    unspent_outputs: 'Output de Transação Não Gasto',
    current_staking: 'Participação Atual',
    more_than_2000_required: 'Não é possível a participação (necessitas de mais de 2000).',
    no_staking_yet: 'Ainda não é possível a participação!',

    tab_transactions: 'Transações',
    tab_staking: 'Participação',
    consolidate_outputs: 'Consolidate {count} outputs',
    unstake_from: 'Unstake {amount} from {agent}',
    delete_account_1: 'Delete account {account_name} ?\n\nPlease backup your private key before doing this!',
    delete_account_2: 'The address is {account_address}\n\nAre you really sure? There is no way to go back!',
    delete_account_3: 'Ok, removing address {account_address}.'
  },

  create: {
    new_text: `
Esta é uma nova chave privada, gerada apenas para ti.

Por favor anote, isto é **importante**.
Sem isto, não poderás ter acesso aos teus fundos.
    `,
    import_text: `
Digita a tua chave privada para ter acesso à tua conta.
    `,
  import_encrypted_text: `
Digita a tua chave privada criptografada e a senha correspondente para aceder à tua conta.

O endereço resultante deve corresponder ao endereço que desejas importar.
    `,
  import_keystore_text: `
Por favor carrega o teu Arquivo de Armazenamento de Chaves para importar a tua conta.
    `,
    heading: "Criar Nova Carteira",
    create: "Criar Nova Carteira",
    import_privkey: "Importar Chave Privada",
    import_encrypted_privkey: "Importar chave encriptado",
    import_keystore: "Importar Arquivo de Armazenamento de Chaves",
    add_view_only: "Adicionar apenas conta de visualização"
  },


  info: {
    date: 'Data',
    source: 'Fonte',
    target: 'Objetivo',
    value: 'Valor',
    fee: 'Taxa'
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
export default pt
