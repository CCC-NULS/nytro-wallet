const cn = {
  public: {
    wallet:'钱包',
    wallets:'钱包',
    warning: '提醒',
    amounts: '数量',
    balance: '余额',
    balances: '余额',
    accounts: '账户',
    total_balance: '账户总额',
    usable: '可用余额',
    available: '可用余额',
    price: '价格',
    staked: '委托数量',
    available_balance: '可用余额',
    consensus_locked_balance: '共识锁定',
    time_locked_balance: '时间锁定',
    time_locked: '时间锁定',
    including_locked: '(包含锁定的)'
  },

  resource: {
    keystore_file: "Keystore文件",
    encrypted_private_key: "加密私钥",
    private_key: "私钥",
    public_key: "公钥",
    address: "地址",
    passphrase: "密码",

    amount: "数量",
    min_amount: "请输入不小于 {min}的数字.",
    valid_amount: "可输入的有效数量: {amount}",
    insuficient_balance: "可用余额 ({balance}) 太少",
    available_balance: "可用余额:",
    remark: "备注",
    valid_target: "收款地址格式有效",
    invalid_target: "收款地址格式无效",
    signed_transaction: "签名交易",
    transaction_content: "交易内容",
    unsigned_raw_transaction: "未签名的原始交易",
    fee: "手续费",
    account_name: '账户名称'
  },

  nav: {
    select: '选择账户',
    all: '所有账户',
    dashboard: '控制面板',
    accounts:'账户',
    actions:'操作',
    addAccount:'添加账户',
    createAccount:'创建账户',
    configuredWallets: '可使用的钱包'
  },

  header: {
    lastBlock: '最新区块'
  },

  actions: {
    send: '付款',
    request: '收款',
    consolidate: '零钱换整',
    rename: '重命名',
    delete: '删除',
    backup: '备份',
    stake: '委托',
    regenerate: '重新生成',
    add_it: '添加',

    sign_transaction: '签名交易',
    broadcast_transaction: '广播交易',
    view_detail: '查看详情',
    save: '保存',
    unstake: '取消委托'
  },

  wallet: {
    wallet_value: '估值',
    unspent_outputs: '零钱张数',
    current_staking: '委托情况',
    more_than_2000_required: '委托金额需要在2000到500000之间.',
    no_staking_yet: '还未参与委托',

    tab_transactions: '交易',
    tab_staking: '委托',
    consolidate_outputs: '将{count}张零钱进行零钱换整',
    unstake_from: '从节点{agent}取消委托 {amount}',
    delete_account_1: '删除账户 {account_name} ?\n\n请在删除前备份你的私钥!',
    delete_account_2: '地址是 {account_address}\n\n你是否确认？删除后将无法退回!',
    delete_account_3: '确认删除账户 {account_address}.'
  },

  create: {
    new_text: `
这是为你生成的新的私钥.

这个信息很**重要**，请你记录下来.
如果没有它，你将无法获取你的资金.
    `,
    import_text: `
请输入私钥来进入你的账户.
    `,
  import_encrypted_text: `
请输入加密私钥和相应的密码来进入你的账户.

结果显示的地址应该和你希望导入的地址保持一致.
    `,
  import_keystore_text: `
请上传keystore文件来导入你的账户.
    `,
    heading: "添加钱包",
    create: "创建钱包",
    import_privkey: "导入私钥",
    import_encrypted_privkey: "导入加密私钥",
    import_keystore: "导入keystore文件",
    add_view_only: "添加观察钱包"
  },


  info: {
    date: '日期',
    source: '付款地址',
    target: '收款地址',
    value: '交易金额',
    fee: '手续费'
  },

  staking: {
    active: '共识中',
    waiting: '待共识',
    commission_rate: '佣金比例',
    participants: '参与人数',
    node_deposit: '保证金',
    node_staked: '已委托',
    target_node: '目标节点'
  },

  transfer: {
    target_address: '收款地址'
  }
};
export default cn
