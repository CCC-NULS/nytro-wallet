const ru = {
  public: {
    wallet:'Кошелёк',
    wallets:'Кошельки',
    warning: 'Предупреждение',
    amounts: 'Количество',
    balance: 'Баланс',
    balances: 'Балансы',
    accounts: 'Аккаунты',
    total_balance: 'Итоговый баланс',
    usable: 'Удобный',
    available: 'Доступный',
    price: 'Цена',
    staked: 'Staked',
    available_balance: 'Доступный баланс',
    consensus_locked_balance: 'Заблокированный баланс',
    time_locked_balance: 'Временно заблокированный баланс',
    time_locked: 'Время блокировки',
    including_locked: '(вкл. заблокированный)'
  },

  resource: {
    keystore_file: "Файл хранения ключей",
    encrypted_private_key: "Зашифрованный приватный ключ",
    private_key: "Приватный ключ",
    public_key: "Публичный ключ",
    address: "Адрес",
    passphrase: "Пароль",

    amount: "Количество",
    min_amount: "Пожалуйста ввердите сумму выше {min}.",
    valid_amount: "Действительная запрашиваемая сумма: {amount}",
    insuficient_balance: "Доступный баланс ({balance}) слишком маленький",
    available_balance: "Доступный баланс:",
    remark: "Отмечать",
    valid_target: "Корректный адрес получателя",
    invalid_target: "Некорректная адрес получателя",
    signed_transaction: "Подписанная транзакция",
    transaction_content: "Содержание транзакции",
    unsigned_raw_transaction: "Необработанная транзакция",
    fee: "Комиссия",
    account_name: 'Имя Аккаунта'
  },

  nav: {
    select: 'Выберите аккаунт',
    all: 'Все',
    dashboard: 'Панель',
    accounts:'Аккаунты',
    actions:'Действия',
    addAccount:'Добавить аккаунт',
    createAccount:'Создать аккаунт',
    configuredWallets: 'Настроенные кошельки'
  },

  header: {
    lastBlock: 'Последний блок'
  },

  actions: {
    send: 'Отправить',
    request: 'Запрос',
    consolidate: 'Укреплять',
    rename: 'Переименовать',
    delete: 'Удалить',
    backup: 'Резервная копия',
    stake: 'Stake',
    regenerate: 'Сгенерировать повторно',
    add_it: 'Добавить',

    sign_transaction: 'Подписать транзакцию',
    broadcast_transaction: 'Отправить транзакцию',
    view_detail: 'посмотреть детали',
    save: 'Сохранить',
    unstake: 'Un-Stake'
  },

  wallet: {
    wallet_value: 'Значение кошелька',
    unspent_outputs: 'Неизрасходованный Остаток',
    current_staking: 'Текущий Staking',
    more_than_2000_required: 'Staking не доступен (вам необходимо больше, чем 2000).',
    no_staking_yet: 'Ставок нет!',

    tab_transactions: 'Транзакции',
    tab_staking: 'Staking',
    consolidate_outputs: 'Объединить {count} outputs',
    unstake_from: 'Unstake {amount} from {agent}',
    delete_account_1: 'Удалить аккаунт {account_name} ?\n\Пожалуйста, сделайте резевную копию приватного ключа перед этим действием!',
    delete_account_2: 'Адрес {account_address}\n\Вы уверены? Вы не сможете вернуться!',
    delete_account_3: 'Ок, удалить адрес {account_address}.'
  },

  create: {
    new_text: `
Это новый приватный ключ, сгенерированный вами.
Пожалуйста, напишите его ниже **Важно**.
Без него у вас не будет доступа к данным.
    `,
    import_text: `
Введите приватный ключ от вашего аккаунта.
    `,
  import_encrypted_text: `
Введите приватный ключ и пароль для доступа к аккаунту.
Полученный адрес должен соответствовать тому, который вы хотите импортировать.
    `,
  import_keystore_text: `
Пожалуйста, загрузите keystore файл, чтобы импортировать аккаунт.
    `,
    heading: "Добавить новый кошелек",
    create: "Создать новый кошелек",
    import_privkey: "Импортировать приватный ключ",
    import_encrypted_privkey: "Импортировать зашифрованный ключ",
    import_keystore: "Импорт KeyStore",
    add_view_only: "Добавить аккаунт для просмотра"
  },


  info: {
    date: 'Дата',
    source: 'Источник',
    target: 'Получатель',
    value: 'Значение',
    fee: 'Комиссия'
  },

  staking: {
    active: 'Активный',
    waiting: 'Ожидание',
    commission_rate: 'Комиссионная ставка',
    participants: 'Участники',
    node_deposit: 'Депозит ноды',
    node_staked: 'Общий stake ноды',
    target_node: 'Нода получателя'
  },

  transfer: {
    target_address: 'Адрес получателя'
  }
};
export default ru
