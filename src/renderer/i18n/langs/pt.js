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
    passphrase: "Frase-chave"
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
    add_it: 'Adicionar'
  },

  wallet: {
    wallet_value: 'Valor da Carteira',
    unspent_outputs: 'Output de Transação Não Gasto',
    current_staking: 'Participação Atual',
    more_than_2000_required: 'Não é possível a participação (necessitas de mais de 2000).',
    no_staking_yet: 'Ainda não é possível a participação!',

    tab_transactions: 'Transações',
    tab_staking: 'Participação'

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
  }
};
export default en
