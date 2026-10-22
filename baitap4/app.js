const subscriptions = [
    {
        subscriptionId: 'SUB01',
        customerName: 'Nguyen Van A',
        planTier: 'Standard',
        price: 120000,
        deviceLimit: 2
    },
    {
        subscriptionId: 'SUB02',
        customerName: 'Tran Thi B',
        planTier: 'Family',
        price: 250000,
        deviceLimit: 5
    }
];

function addSub() {
    console.log('\n===== THEM THUE BAO MOI =====');

    const subscriptionId = prompt('Nhap ma thue bao:');

    if (subscriptionId === null || subscriptionId.trim() === '') {
        alert('Ma thue bao khong duoc de trong!');
        return;
    }

    for (let i = 0; i < subscriptions.length; i++) {
        if (
            subscriptions[i].subscriptionId ===
            subscriptionId.trim().toUpperCase()
        ) {
            alert('Ma thue bao da ton tai!');
            return;
        }
    }

    const customerName = prompt('Nhap ten khach hang:');

    if (customerName === null || customerName.trim() === '') {
        alert('Ten khach hang khong duoc de trong!');
        return;
    }

    const planChoice = prompt(
        'Chon goi cuoc:\n1. Standard - 120000 VND\n2. Family - 250000 VND'
    );

    if (planChoice === '1') {
        subscriptions.push({
            subscriptionId: subscriptionId.trim().toUpperCase(),
            customerName: customerName.trim(),
            planTier: 'Standard',
            price: 120000,
            deviceLimit: 2
        });
    } else if (planChoice === '2') {
        subscriptions.push({
            subscriptionId: subscriptionId.trim().toUpperCase(),
            customerName: customerName.trim(),
            planTier: 'Family',
            price: 250000,
            deviceLimit: 5
        });
    } else {
        alert('Goi cuoc khong hop le!');
        return;
    }

    alert('Them thue bao thanh cong!');
}

function listSubs() {
    console.log('\n================ DANH SACH THUE BAO ================');

    if (subscriptions.length === 0) {
        console.log('Chua co thue bao nao.');
        return;
    }

    console.log(
        'Ma thue bao'.padEnd(15) +
        'Ten khach hang'.padEnd(22) +
        'Goi cuoc'.padEnd(13) +
        'Don gia'.padEnd(15) +
        'So thiet bi'
    );

    console.log('-'.repeat(80));

    for (let i = 0; i < subscriptions.length; i++) {
        const sub = subscriptions[i];

        console.log(
            sub.subscriptionId.padEnd(15) +
            sub.customerName.padEnd(22) +
            sub.planTier.padEnd(13) +
            (sub.price.toLocaleString('vi-VN') + ' VND').padEnd(15) +
            sub.deviceLimit
        );
    }

    console.log('-'.repeat(80));
    console.log('Tong so thue bao: ' + subscriptions.length);
}

function upgradeSub() {
    console.log('\n===== NANG CAP GOI CUOC =====');

    const subscriptionId = prompt('Nhap ma thue bao can nang cap:');

    if (subscriptionId === null || subscriptionId.trim() === '') {
        alert('Ma thue bao khong hop le!');
        return;
    }

    let foundIndex = -1;

    for (let i = 0; i < subscriptions.length; i++) {
        if (
            subscriptions[i].subscriptionId ===
            subscriptionId.trim().toUpperCase()
        ) {
            foundIndex = i;
            break;
        }
    }

    if (foundIndex === -1) {
        alert('Khong tim thay thue bao!');
        return;
    }

    const sub = subscriptions[foundIndex];

    if (sub.planTier === 'Family') {
        alert('Thue bao dang su dung goi Family!');
        return;
    }

    sub.planTier = 'Family';
    sub.price = 250000;
    sub.deviceLimit = 5;

    alert('Nang cap goi Family thanh cong!');
}

function showMenu() {
    console.log('\n===== RIKKEISTREAM - QUAN LY THUE BAO =====');
    console.log('1. Them thue bao moi');
    console.log('2. Hien thi danh sach thue bao');
    console.log('3. Nang cap goi cuoc');
    console.log('4. Thoat chuong trinh');
}

function main() {
    let menuChoice;

    do {
        showMenu();

        const input = prompt(
            'Nhap lua chon cua ban (1-4):'
        );

        if (input === null) {
            menuChoice = '4';
        } else {
            menuChoice = input.trim();
        }

        switch (menuChoice) {
            case '1':
                addSub();
                break;

            case '2':
                listSubs();
                break;

            case '3':
                upgradeSub();
                break;

            case '4':
                alert('Da thoat chuong trinh RikkeiStream!');
                break;

            default:
                alert('Lua chon khong hop le! Vui long nhap tu 1 den 4.');
        }
    } while (menuChoice !== '4');
}

main();
