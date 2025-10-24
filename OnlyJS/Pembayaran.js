// Midtrans Payment Integration
class MidtransPayment {
    constructor() {
        this.serverKey = 'SB-Mid-server-YOUR_SERVER_KEY'; // Replace with your server key
        this.clientKey = 'SB-Mid-client-YOUR_CLIENT_KEY'; // Replace with your client key
        this.isProduction = false; // Set to true for production
        this.snapToken = null;
    }

    // Generate payment token (In real app, this should be done on server-side)
    async generatePaymentToken(orderData) {
        try {
            // Show loading
            this.showLoading();

            // Simulate API call to your backend
            // In real implementation, you would call your backend API
            const response = await this.simulateBackendCall(orderData);
            
            if (response.success) {
                this.snapToken = response.token;
                return response.token;
            } else {
                throw new Error(response.message || 'Failed to generate payment token');
            }
        } catch (error) {
            console.error('Payment token generation failed:', error);
            this.hideLoading();
            throw error;
        }
    }

    // Simulate backend API call (Replace with actual backend integration)
    async simulateBackendCall(orderData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Generate a mock token for demo purposes
                const mockToken = 'mock_token_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                
                resolve({
                    success: true,
                    token: mockToken,
                    redirect_url: `https://app.sandbox.midtrans.com/snap/v2/vtweb/${mockToken}`
                });
            }, 2000); // Simulate network delay
        });
    }

    // Process payment with Midtrans Snap
    async processPayment(membershipData) {
        try {
            const orderData = this.prepareOrderData(membershipData);
            const token = await this.generatePaymentToken(orderData);
            
            this.hideLoading();

            // For demo purposes, we'll simulate the Snap payment
            this.simulateSnapPayment(token, orderData);
            
        } catch (error) {
            this.hideLoading();
            this.showPaymentError(error.message);
        }
    }

    // Prepare order data for Midtrans
    prepareOrderData(membershipData) {
        const orderId = 'GYM-' + Date.now();
        const adminFee = 50000;
        const totalAmount = membershipData.price + adminFee;

        return {
            transaction_details: {
                order_id: orderId,
                gross_amount: totalAmount
            },
            credit_card: {
                secure: true
            },
            customer_details: {
                first_name: membershipData.firstName,
                last_name: membershipData.lastName,
                email: membershipData.email,
                phone: membershipData.phone,
                billing_address: {
                    address: membershipData.address,
                    city: "Jakarta",
                    postal_code: "12345",
                    country_code: "IDN"
                }
            },
            item_details: [
                {
                    id: `membership_${membershipData.plan.toLowerCase()}`,
                    price: membershipData.price,
                    quantity: 1,
                    name: `Membership ${membershipData.plan}`,
                    category: "Fitness Membership"
                },
                {
                    id: "admin_fee",
                    price: adminFee,
                    quantity: 1,
                    name: "Biaya Admin",
                    category: "Administrative Fee"
                }
            ],
            callbacks: {
                finish: 'https://yourdomain.com/payment/finish',
                error: 'https://yourdomain.com/payment/error',
                pending: 'https://yourdomain.com/payment/pending'
            }
        };
    }

    // Simulate Snap payment for demo
    simulateSnapPayment(token, orderData) {
        // Create a mock payment interface
        const paymentOptions = [
            { method: 'credit_card', name: 'Kartu Kredit', icon: '💳' },
            { method: 'bank_transfer', name: 'Transfer Bank', icon: '🏦' },
            { method: 'gopay', name: 'GoPay', icon: '📱' },
            { method: 'shopeepay', name: 'ShopeePay', icon: '🛒' }
        ];

        this.showPaymentInterface(paymentOptions, orderData);
    }

    // Show payment interface
    showPaymentInterface(paymentOptions, orderData) {
        const modal = document.getElementById('membershipModal');
        const modalBody = document.getElementById('membershipModalBody');

        modalBody.innerHTML = `
            <div class="payment-interface">
                <div class="payment-header">
                    <h2>Pilih Metode Pembayaran</h2>
                    <div class="order-summary">
                        <p><strong>Order ID:</strong> ${orderData.transaction_details.order_id}</p>
                        <p><strong>Total:</strong> Rp ${orderData.transaction_details.gross_amount.toLocaleString('id-ID')}</p>
                    </div>
                </div>
                
                <div class="payment-methods-grid">
                    ${paymentOptions.map(option => `
                        <div class="payment-method-card" onclick="selectPaymentMethod('${option.method}', '${orderData.transaction_details.order_id}', ${orderData.transaction_details.gross_amount})">
                            <div class="payment-icon">${option.icon}</div>
                            <div class="payment-name">${option.name}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="payment-security">
                    <div class="security-badges">
                        <span class="security-badge">🔒 SSL Encrypted</span>
                        <span class="security-badge">🛡️ PCI Compliant</span>
                        <span class="security-badge">✅ Verified by Midtrans</span>
                    </div>
                </div>
            </div>
        `;
    }

    // Show loading state
    showLoading() {
        const loadingModal = document.getElementById('loadingModal');
        loadingModal.style.display = 'block';
    }

    // Hide loading state
    hideLoading() {
        const loadingModal = document.getElementById('loadingModal');
        loadingModal.style.display = 'none';
    }

    // Show payment error
    showPaymentError(message) {
        alert(`Pembayaran gagal: ${message}\n\nSilakan coba lagi atau hubungi customer service.`);
    }

    // Handle payment success
    handlePaymentSuccess(result) {
        console.log('Payment success:', result);
        
        // Store payment result
        localStorage.setItem('paymentResult', JSON.stringify(result));
        
        // Show success page
        this.showPaymentSuccess(result);
        
        // Close modal
        window.closeMembershipModal();
        
        // Show payment status navigation
        document.getElementById('paymentStatusNav').style.display = 'block';
        
        // Navigate to payment status page
        setTimeout(() => {
            window.showPage('payment-status');
        }, 2000);
    }

    // Handle payment failure
    handlePaymentFailure(result) {
        console.log('Payment failed:', result);
        this.showPaymentError(result.status_message || 'Pembayaran dibatalkan atau gagal');
    }

    // Show payment success message
    showPaymentSuccess(result) {
        const successHtml = `
            <div class="payment-success">
                <div class="success-icon">✅</div>
                <h2>Pembayaran Berhasil!</h2>
                <p>Terima kasih, pembayaran Anda telah berhasil diproses.</p>
                <div class="success-details">
                    <p><strong>Order ID:</strong> ${result.order_id}</p>
                    <p><strong>Total:</strong> Rp ${result.gross_amount.toLocaleString('id-ID')}</p>
                </div>
            </div>
        `;
        
        // Show success message
        const modal = document.getElementById('membershipModal');
        const modalBody = document.getElementById('membershipModalBody');
        modalBody.innerHTML = successHtml;
        
        // Auto close after 3 seconds
        setTimeout(() => {
            window.closeMembershipModal();
        }, 3000);
    }
}

// Initialize Midtrans payment
const midtransPayment = new MidtransPayment();

// Select payment method
function selectPaymentMethod(method, orderId, amount) {
    // Simulate payment processing
    const loadingModal = document.getElementById('loadingModal');
    loadingModal.style.display = 'block';
    
    // Update loading message based on payment method
    const loadingContent = loadingModal.querySelector('.loading-content');
    loadingContent.innerHTML = `
        <div class="loading-spinner"></div>
        <h3>Memproses Pembayaran ${getPaymentMethodName(method)}...</h3>
        <p>Mohon tunggu, jangan tutup halaman ini</p>
    `;
    
    // Simulate payment processing time
    setTimeout(() => {
        loadingModal.style.display = 'none';
        
        // Simulate random success/failure for demo
        const isSuccess = Math.random() > 0.2; // 80% success rate
        
        if (isSuccess) {
            const result = {
                order_id: orderId,
                gross_amount: amount,
                payment_type: method,
                transaction_status: 'settlement',
                status_message: 'Success, transaction is found',
                transaction_time: new Date().toISOString()
            };
            
            midtransPayment.handlePaymentSuccess(result);
        } else {
            const result = {
                order_id: orderId,
                status_message: 'Pembayaran gagal atau dibatalkan'
            };
            
            midtransPayment.handlePaymentFailure(result);
        }
    }, 3000);
}

// Get payment method display name
function getPaymentMethodName(method) {
    const names = {
        'credit_card': 'Kartu Kredit',
        'bank_transfer': 'Transfer Bank',
        'gopay': 'GoPay',
        'shopeepay': 'ShopeePay'
    };
    return names[method] || method;
}

// Load payment status page
function loadPaymentStatus() {
    const paymentResult = localStorage.getItem('paymentResult');
    const statusContent = document.getElementById('paymentStatusContent');
    
    if (paymentResult) {
        const result = JSON.parse(paymentResult);
        statusContent.innerHTML = generatePaymentStatusHTML(result);
    } else {
        statusContent.innerHTML = `
            <div class="no-payment-status">
                <h2>Tidak Ada Riwayat Pembayaran</h2>
                <p>Belum ada transaksi pembayaran yang tercatat.</p>
                <button class="btn-cta" onclick="window.showPage('membership')">Pilih Membership</button>
            </div>
        `;
    }
}

// Generate payment status HTML
function generatePaymentStatusHTML(result) {
    const statusClass = result.transaction_status === 'settlement' ? 'success' : 'pending';
    const statusText = result.transaction_status === 'settlement' ? 'Berhasil' : 'Pending';
    const statusIcon = result.transaction_status === 'settlement' ? '✅' : '⏳';
    
    return `
        <div class="payment-status-card">
            <div class="status-header ${statusClass}">
                <div class="status-icon">${statusIcon}</div>
                <h2>Status Pembayaran: ${statusText}</h2>
            </div>
            
            <div class="status-details">
                <div class="detail-row">
                    <span class="detail-label">Order ID:</span>
                    <span class="detail-value">${result.order_id}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Total Pembayaran:</span>
                    <span class="detail-value">Rp ${result.gross_amount.toLocaleString('id-ID')}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Metode Pembayaran:</span>
                    <span class="detail-value">${getPaymentMethodName(result.payment_type)}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Waktu Transaksi:</span>
                    <span class="detail-value">${new Date(result.transaction_time).toLocaleString('id-ID')}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Status:</span>
                    <span class="detail-value">${result.status_message}</span>
                </div>
            </div>
            
            ${result.transaction_status === 'settlement' ? `
                <div class="membership-info">
                    <h3>Informasi Membership</h3>
                    <p>✅ Membership Anda telah aktif</p>
                    <p>📧 Email konfirmasi telah dikirim</p>
                    <p>🏃‍♂️ Anda dapat mulai menggunakan fasilitas gym</p>
                </div>
            ` : `
                <div class="pending-info">
                    <h3>Menunggu Konfirmasi</h3>
                    <p>⏳ Pembayaran sedang diproses</p>
                    <p>📧 Kami akan mengirim konfirmasi via email</p>
                    <p>📞 Hubungi customer service jika ada pertanyaan</p>
                </div>
            `}
            
            <div class="status-actions">
                <button class="btn-cta" onclick="window.showPage('home')">Kembali ke Beranda</button>
                ${result.transaction_status === 'settlement' ? 
                    '<button class="btn-secondary" onclick="downloadReceipt()">Download Struk</button>' : 
                    '<button class="btn-secondary" onclick="checkPaymentStatus()">Cek Status Terbaru</button>'
                }
            </div>
        </div>
    `;
}

// Download receipt (mock function)
function downloadReceipt() {
    alert('Fitur download struk akan segera tersedia!\n\nStruk pembayaran akan dikirim ke email Anda.');
}

// Check payment status (mock function)
function checkPaymentStatus() {
    alert('Mengecek status pembayaran...\n\nStatus terbaru akan diupdate dalam beberapa menit.');
}

// Export for use in main script
window.midtransPayment = midtransPayment;
window.loadPaymentStatus = loadPaymentStatus;

// Declare closeMembershipModal and showPage functions
function closeMembershipModal() {
    const modal = document.getElementById('membershipModal');
    modal.style.display = 'none';
}

function showPage(page) {
    // Implementation for showing different pages
    console.log(`Showing page: ${page}`);
}