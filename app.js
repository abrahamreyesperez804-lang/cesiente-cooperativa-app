// App State
let currentUser = null;
let currentScreen = 'login';
let transactions = [];
let balance = 0;

// DOM Elements
const screens = {
    loading: document.getElementById('loading-screen'),
    login: document.getElementById('login-screen'),
    register: document.getElementById('register-screen'),
    dashboard: document.getElementById('dashboard-screen'),
    transfer: document.getElementById('transfer-screen'),
    payments: document.getElementById('payments-screen'),
    history: document.getElementById('history-screen'),
    profile: document.getElementById('profile-screen')
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    checkOnlineStatus();
    setupServiceWorker();
});

function initializeApp() {
    // Check if user is logged in
    const savedUser = localStorage.getItem('cesiente_user');
    
    setTimeout(() => {
        screens.loading.classList.add('hidden');
        
        if (savedUser) {
            currentUser = JSON.parse(savedUser);
            loadUserData();
            navigateToScreen('dashboard');
        } else {
            navigateToScreen('login');
        }
    }, 1500);
}

// Screen Navigation
function navigateToScreen(screenName) {
    Object.values(screens).forEach(screen => {
        if (screen) screen.classList.remove('active');
    });
    
    if (screens[screenName]) {
        screens[screenName].classList.add('active');
        currentScreen = screenName;
        
        // Update bottom nav
        updateBottomNav(screenName);
    }
}

function updateBottomNav(screenName) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.nav === screenName || 
            (screenName === 'dashboard' && item.dataset.nav === 'home')) {
            item.classList.add('active');
        }
    });
}

// Event Listeners Setup
function setupEventListeners() {
    // Login Form
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', handleLogin);
    
    // Register Form
    const registerForm = document.getElementById('register-form');
    registerForm.addEventListener('submit', handleRegister);
    
    // Auth Links
    document.getElementById('show-register').addEventListener('click', (e) => {
        e.preventDefault();
        navigateToScreen('register');
    });
    
    document.getElementById('register-back').addEventListener('click', () => {
        navigateToScreen('login');
    });
    
    document.getElementById('forgot-password').addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Función en desarrollo', 'warning');
    });
    
    // Dashboard Actions
    document.querySelectorAll('.action-card').forEach(card => {
        card.addEventListener('click', () => {
            const action = card.dataset.action;
            navigateToScreen(action);
        });
    });
    
    document.getElementById('btn-add-money').addEventListener('click', () => {
        showDepositModal();
    });
    
    document.getElementById('btn-withdraw').addEventListener('click', () => {
        showWithdrawModal();
    });
    
    document.getElementById('view-all-transactions').addEventListener('click', (e) => {
        e.preventDefault();
        navigateToScreen('history');
    });
    
    // Bottom Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const nav = item.dataset.nav;
            if (nav === 'home') {
                navigateToScreen('dashboard');
            } else if (nav === 'transactions') {
                navigateToScreen('history');
            } else {
                navigateToScreen(nav);
            }
        });
    });
    
    // Back Buttons
    document.querySelectorAll('.btn-back').forEach(btn => {
        btn.addEventListener('click', () => {
            const backTo = btn.dataset.back || 'dashboard';
            navigateToScreen(backTo);
        });
    });
    
    // Transfer Form
    const transferForm = document.getElementById('transfer-form');
    transferForm.addEventListener('submit', handleTransfer);
    
    document.getElementById('transfer-amount').addEventListener('input', updateTransferSummary);
    
    // Payment Categories
    document.querySelectorAll('.payment-category').forEach(btn => {
        btn.addEventListener('click', () => {
            showPaymentForm(btn.dataset.category);
        });
    });
    
    document.getElementById('cancel-payment').addEventListener('click', () => {
        hidePaymentForm();
    });
    
    const paymentForm = document.getElementById('payment-form');
    paymentForm.addEventListener('submit', handlePayment);
    
    // Filter Tabs
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            filterTransactions(tab.dataset.filter);
        });
    });
    
    // Profile Actions
    document.getElementById('logout').addEventListener('click', handleLogout);
    
    document.getElementById('edit-profile').addEventListener('click', () => {
        showToast('Función en desarrollo', 'warning');
    });
    
    document.getElementById('change-password').addEventListener('click', () => {
        showToast('Función en desarrollo', 'warning');
    });
    
    document.getElementById('security-settings').addEventListener('click', () => {
        showToast('Función en desarrollo', 'warning');
    });
    
    document.getElementById('help-support').addEventListener('click', () => {
        showToast('Función en desarrollo', 'warning');
    });
    
    document.getElementById('btn-notifications').addEventListener('click', () => {
        showToast('No tienes notificaciones nuevas', 'info');
    });
    
    // Modal
    document.getElementById('modal-cancel').addEventListener('click', hideModal);
}

// Authentication
async function handleLogin(e) {
    e.preventDefault();
    
    const btn = e.target.querySelector('button[type="submit"]');
    btn.classList.add('loading');
    
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    // Simulate API call
    await sleep(1000);
    
    // Simple validation (demo purposes)
    const users = JSON.parse(localStorage.getItem('cesiente_users') || '{}');
    
    if (users[username] && users[username].password === password) {
        currentUser = {
            username: username,
            fullName: users[username].fullName,
            email: users[username].email,
            accountNumber: users[username].accountNumber,
            memberSince: users[username].memberSince
        };
        
        localStorage.setItem('cesiente_user', JSON.stringify(currentUser));
        loadUserData();
        
        btn.classList.remove('loading');
        showToast('¡Bienvenido de nuevo!', 'success');
        
        setTimeout(() => {
            navigateToScreen('dashboard');
        }, 500);
    } else {
        btn.classList.remove('loading');
        showToast('Usuario o contraseña incorrectos', 'error');
    }
}

async function handleRegister(e) {
    e.preventDefault();
    
    const btn = e.target.querySelector('button[type="submit"]');
    btn.classList.add('loading');
    
    const fullName = document.getElementById('reg-fullname').value;
    const email = document.getElementById('reg-email').value;
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    
    // Simulate API call
    await sleep(1000);
    
    const users = JSON.parse(localStorage.getItem('cesiente_users') || '{}');
    
    if (users[username]) {
        btn.classList.remove('loading');
        showToast('El usuario ya existe', 'error');
        return;
    }
    
    // Create new user
    const accountNumber = generateAccountNumber();
    users[username] = {
        fullName,
        email,
        password,
        accountNumber,
        memberSince: new Date().getFullYear()
    };
    
    localStorage.setItem('cesiente_users', JSON.stringify(users));
    
    // Auto login
    currentUser = {
        username,
        fullName,
        email,
        accountNumber,
        memberSince: users[username].memberSince
    };
    
    localStorage.setItem('cesiente_user', JSON.stringify(currentUser));
    
    // Initialize user data
    const initialBalance = 1000; // Welcome bonus
    localStorage.setItem(`cesiente_balance_${username}`, initialBalance.toString());
    
    const welcomeTransaction = {
        id: Date.now(),
        type: 'income',
        title: 'Bono de Bienvenida',
        amount: initialBalance,
        date: new Date().toISOString(),
        description: 'Gracias por registrarte'
    };
    
    localStorage.setItem(`cesiente_transactions_${username}`, JSON.stringify([welcomeTransaction]));
    
    btn.classList.remove('loading');
    showToast('¡Cuenta creada exitosamente!', 'success');
    
    loadUserData();
    
    setTimeout(() => {
        navigateToScreen('dashboard');
    }, 500);
}

function handleLogout() {
    showModal(
        'Cerrar Sesión',
        '¿Estás seguro que deseas cerrar sesión?',
        () => {
            localStorage.removeItem('cesiente_user');
            currentUser = null;
            balance = 0;
            transactions = [];
            showToast('Sesión cerrada', 'success');
            setTimeout(() => {
                navigateToScreen('login');
            }, 500);
        }
    );
}

// User Data
function loadUserData() {
    if (!currentUser) return;
    
    // Load balance
    balance = parseFloat(localStorage.getItem(`cesiente_balance_${currentUser.username}`) || '0');
    updateBalanceDisplay();
    
    // Load transactions
    transactions = JSON.parse(localStorage.getItem(`cesiente_transactions_${currentUser.username}`) || '[]');
    updateTransactionsList();
    
    // Update profile
    document.getElementById('dashboard-username').textContent = currentUser.fullName;
    document.getElementById('account-number').textContent = `****${currentUser.accountNumber.slice(-4)}`;
    document.getElementById('profile-name').textContent = currentUser.fullName;
    document.getElementById('profile-email').textContent = currentUser.email;
    document.getElementById('profile-account').textContent = `****${currentUser.accountNumber.slice(-4)}`;
    document.getElementById('profile-member-since').textContent = currentUser.memberSince;
}

function updateBalanceDisplay() {
    document.getElementById('balance-amount').textContent = formatCurrency(balance);
}

function updateTransactionsList(filter = 'all') {
    const transactionsContainer = document.getElementById('transactions-list');
    const historyContainer = document.getElementById('history-list');
    
    let filteredTransactions = [...transactions];
    
    if (filter === 'income') {
        filteredTransactions = transactions.filter(t => t.type === 'income');
    } else if (filter === 'expense') {
        filteredTransactions = transactions.filter(t => t.type === 'expense');
    }
    
    // Sort by date (newest first)
    filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const recentTransactions = filteredTransactions.slice(0, 5);
    
    // Update recent transactions
    if (recentTransactions.length === 0) {
        transactionsContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📭</div>
                <p>No hay transacciones recientes</p>
            </div>
        `;
    } else {
        transactionsContainer.innerHTML = recentTransactions.map(t => createTransactionHTML(t)).join('');
    }
    
    // Update full history
    if (filteredTransactions.length === 0) {
        historyContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📭</div>
                <p>No hay transacciones</p>
            </div>
        `;
    } else {
        historyContainer.innerHTML = filteredTransactions.map(t => createTransactionHTML(t)).join('');
    }
}

function createTransactionHTML(transaction) {
    const icon = transaction.type === 'income' ? '💰' : '💸';
    const sign = transaction.type === 'income' ? '+' : '-';
    
    return `
        <div class="transaction-item">
            <div class="transaction-icon ${transaction.type}">
                ${icon}
            </div>
            <div class="transaction-details">
                <div class="transaction-title">${transaction.title}</div>
                <div class="transaction-date">${formatDate(transaction.date)}</div>
            </div>
            <div class="transaction-amount ${transaction.type}">
                ${sign}${formatCurrency(transaction.amount)}
            </div>
        </div>
    `;
}

function filterTransactions(filter) {
    updateTransactionsList(filter);
}

// Transfer
async function handleTransfer(e) {
    e.preventDefault();
    
    const btn = e.target.querySelector('button[type="submit"]');
    btn.classList.add('loading');
    
    const recipient = document.getElementById('transfer-recipient').value;
    const amount = parseFloat(document.getElementById('transfer-amount').value);
    const description = document.getElementById('transfer-description').value || 'Transferencia';
    
    if (amount > balance) {
        btn.classList.remove('loading');
        showToast('Saldo insuficiente', 'error');
        return;
    }
    
    if (amount <= 0) {
        btn.classList.remove('loading');
        showToast('Monto inválido', 'error');
        return;
    }
    
    // Simulate API call
    await sleep(1500);
    
    // Update balance
    balance -= amount;
    localStorage.setItem(`cesiente_balance_${currentUser.username}`, balance.toString());
    
    // Add transaction
    const transaction = {
        id: Date.now(),
        type: 'expense',
        title: `Transferencia a ${recipient}`,
        amount: amount,
        date: new Date().toISOString(),
        description: description
    };
    
    transactions.unshift(transaction);
    localStorage.setItem(`cesiente_transactions_${currentUser.username}`, JSON.stringify(transactions));
    
    btn.classList.remove('loading');
    showToast('Transferencia exitosa', 'success');
    
    // Reset form
    e.target.reset();
    updateTransferSummary();
    updateBalanceDisplay();
    updateTransactionsList();
    
    setTimeout(() => {
        navigateToScreen('dashboard');
    }, 1000);
}

function updateTransferSummary() {
    const amount = parseFloat(document.getElementById('transfer-amount').value) || 0;
    document.getElementById('summary-amount').textContent = formatCurrency(amount);
    document.getElementById('summary-total').textContent = formatCurrency(amount);
}

// Payments
function showPaymentForm(category) {
    const formContainer = document.getElementById('payment-form-container');
    const categoryTitle = document.getElementById('payment-category-title');
    const providerSelect = document.getElementById('payment-provider');
    
    const providers = {
        utilities: ['EDENORTE', 'EDESUR', 'EDEESTE', 'CAASD', 'CORAAPLATA'],
        phone: ['Claro', 'Altice', 'Viva', 'Tricom'],
        loans: ['Banco Popular', 'Banco BHD', 'Banco Reservas', 'Asociación La Nacional'],
        'credit-card': ['Visa', 'Mastercard', 'American Express']
    };
    
    const titles = {
        utilities: 'Pago de Servicios Públicos',
        phone: 'Recarga de Teléfono',
        loans: 'Pago de Préstamo',
        'credit-card': 'Pago de Tarjeta'
    };
    
    categoryTitle.textContent = titles[category] || 'Pago de Servicio';
    
    providerSelect.innerHTML = '<option value="">Selecciona un proveedor</option>';
    providers[category].forEach(provider => {
        const option = document.createElement('option');
        option.value = provider;
        option.textContent = provider;
        providerSelect.appendChild(option);
    });
    
    formContainer.classList.remove('hidden');
    formContainer.scrollIntoView({ behavior: 'smooth' });
}

function hidePaymentForm() {
    document.getElementById('payment-form-container').classList.add('hidden');
    document.getElementById('payment-form').reset();
}

async function handlePayment(e) {
    e.preventDefault();
    
    const btn = e.target.querySelector('button[type="submit"]');
    btn.classList.add('loading');
    
    const provider = document.getElementById('payment-provider').value;
    const account = document.getElementById('payment-account').value;
    const amount = parseFloat(document.getElementById('payment-amount').value);
    
    if (amount > balance) {
        btn.classList.remove('loading');
        showToast('Saldo insuficiente', 'error');
        return;
    }
    
    if (amount <= 0) {
        btn.classList.remove('loading');
        showToast('Monto inválido', 'error');
        return;
    }
    
    // Simulate API call
    await sleep(1500);
    
    // Update balance
    balance -= amount;
    localStorage.setItem(`cesiente_balance_${currentUser.username}`, balance.toString());
    
    // Add transaction
    const transaction = {
        id: Date.now(),
        type: 'expense',
        title: `Pago ${provider}`,
        amount: amount,
        date: new Date().toISOString(),
        description: `Cuenta: ${account}`
    };
    
    transactions.unshift(transaction);
    localStorage.setItem(`cesiente_transactions_${currentUser.username}`, JSON.stringify(transactions));
    
    btn.classList.remove('loading');
    showToast('Pago realizado exitosamente', 'success');
    
    hidePaymentForm();
    updateBalanceDisplay();
    updateTransactionsList();
    
    setTimeout(() => {
        navigateToScreen('dashboard');
    }, 1000);
}

// Deposit/Withdraw
function showDepositModal() {
    showModal(
        'Depositar Dinero',
        `
            <div class="form-group" style="margin-bottom: 0;">
                <label for="deposit-amount">Monto a depositar (RD$)</label>
                <input type="number" id="deposit-amount" class="form-control" placeholder="0.00" step="0.01" min="1" style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 16px;">
            </div>
        `,
        async () => {
            const amount = parseFloat(document.getElementById('deposit-amount').value);
            
            if (!amount || amount <= 0) {
                showToast('Monto inválido', 'error');
                return;
            }
            
            showToast('Procesando...', 'info');
            await sleep(1000);
            
            balance += amount;
            localStorage.setItem(`cesiente_balance_${currentUser.username}`, balance.toString());
            
            const transaction = {
                id: Date.now(),
                type: 'income',
                title: 'Depósito',
                amount: amount,
                date: new Date().toISOString(),
                description: 'Depósito en efectivo'
            };
            
            transactions.unshift(transaction);
            localStorage.setItem(`cesiente_transactions_${currentUser.username}`, JSON.stringify(transactions));
            
            updateBalanceDisplay();
            updateTransactionsList();
            showToast('Depósito realizado exitosamente', 'success');
        }
    );
}

function showWithdrawModal() {
    showModal(
        'Retirar Dinero',
        `
            <div class="form-group" style="margin-bottom: 0;">
                <label for="withdraw-amount">Monto a retirar (RD$)</label>
                <input type="number" id="withdraw-amount" class="form-control" placeholder="0.00" step="0.01" min="1" style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 16px;">
            </div>
        `,
        async () => {
            const amount = parseFloat(document.getElementById('withdraw-amount').value);
            
            if (!amount || amount <= 0) {
                showToast('Monto inválido', 'error');
                return;
            }
            
            if (amount > balance) {
                showToast('Saldo insuficiente', 'error');
                return;
            }
            
            showToast('Procesando...', 'info');
            await sleep(1000);
            
            balance -= amount;
            localStorage.setItem(`cesiente_balance_${currentUser.username}`, balance.toString());
            
            const transaction = {
                id: Date.now(),
                type: 'expense',
                title: 'Retiro',
                amount: amount,
                date: new Date().toISOString(),
                description: 'Retiro en efectivo'
            };
            
            transactions.unshift(transaction);
            localStorage.setItem(`cesiente_transactions_${currentUser.username}`, JSON.stringify(transactions));
            
            updateBalanceDisplay();
            updateTransactionsList();
            showToast('Retiro realizado exitosamente', 'success');
        }
    );
}

// UI Helpers
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function showModal(title, message, onConfirm) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const confirmBtn = document.getElementById('modal-confirm');
    
    modalTitle.textContent = title;
    modalMessage.innerHTML = message;
    modal.classList.add('show');
    
    // Remove old listeners
    const newConfirmBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
    
    newConfirmBtn.addEventListener('click', () => {
        if (onConfirm) onConfirm();
        hideModal();
    });
}

function hideModal() {
    document.getElementById('modal').classList.remove('show');
}

// Utility Functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('es-DO', {
        style: 'currency',
        currency: 'DOP',
        minimumFractionDigits: 2
    }).format(amount).replace('DOP', 'RD$');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
        return 'Hoy';
    } else if (diffDays === 2) {
        return 'Ayer';
    } else if (diffDays <= 7) {
        return `Hace ${diffDays - 1} días`;
    } else {
        return date.toLocaleDateString('es-DO', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }
}

function generateAccountNumber() {
    return Math.floor(100000000000 + Math.random() * 900000000000).toString();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// PWA and Service Worker
function setupServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registrado:', registration);
            })
            .catch(error => {
                console.log('Error al registrar Service Worker:', error);
            });
    }
    
    // Install prompt
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        // Show install prompt (optional)
        console.log('App can be installed');
    });
}

// Online/Offline Status
function checkOnlineStatus() {
    const updateOnlineStatus = () => {
        const offlineIndicator = document.createElement('div');
        offlineIndicator.className = 'offline-indicator';
        offlineIndicator.textContent = '📡 Sin conexión - Modo offline';
        
        if (!document.querySelector('.offline-indicator')) {
            document.body.appendChild(offlineIndicator);
        }
        
        const indicator = document.querySelector('.offline-indicator');
        
        if (!navigator.onLine) {
            indicator.classList.add('show');
            showToast('Modo offline activo', 'warning');
        } else {
            indicator.classList.remove('show');
        }
    };
    
    window.addEventListener('online', () => {
        updateOnlineStatus();
        showToast('Conexión restaurada', 'success');
    });
    
    window.addEventListener('offline', () => {
        updateOnlineStatus();
    });
    
    updateOnlineStatus();
}

// Prevent zoom on double tap (iOS)
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);
