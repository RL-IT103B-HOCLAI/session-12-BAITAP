1. Bảng so sánh kỹ thuật
Tiêu chuẩn	Monolithic Switch-Case (Nguyên khối)	Modular Function Architecture (Mô-đun hóa)
Cấu trúc code	Toàn bộ logic thêm, sửa, xóa nằm trong switch-case.	Mỗi chức năng được tách thành một hàm riêng.
Độ dài switch-case	Có thể dài hàng trăm dòng, khó đọc.	Ngắn gọn, mỗi case chỉ gọi hàm tương ứng.
Khả năng bảo trì	Khó sửa vì logic nhiều chức năng nằm chung.	Dễ sửa từng chức năng mà ít ảnh hưởng phần khác.
Tái sử dụng code	Thấp vì logic gắn chặt với menu.	Cao hơn, có thể tái sử dụng logic ở CLI, API hoặc Web nếu thiết kế phù hợp.
Kiểm thử độc lập	Khó kiểm thử từng chức năng riêng biệt.	Dễ kiểm thử từng hàm với dữ liệu đầu vào cụ thể.
Khả năng mở rộng	Khó quản lý khi tăng từ 5 lên 20 chức năng.	Dễ mở rộng bằng cách thêm hàm và thêm case tương ứng.
Độ phức tạp ban đầu	Thấp, dễ viết với chương trình nhỏ.	Cần thiết kế và phân chia hàm ngay từ đầu.
Phù hợp	Bài tập nhỏ, ít chức năng, logic đơn giản.	Ứng dụng có nhiều chức năng, cần bảo trì và phát triển lâu dài.

2. Ví dụ code nguyên khối (Monolithic)
Toàn bộ logic xử lý được viết trực tiếp bên trong từng case:

switch (menuChoice) {
    case '1': {
        const customerName = prompt('Nhap ten khach hang:');
        const planTier = prompt('Nhap goi cuoc:');

        if (customerName && planTier) {
            subscriptions.push({
                customerName: customerName,
                planTier: planTier
            });
            alert('Them thue bao thanh cong!');
        }
        break;
    }

    case '2': {
        for (let i = 0; i < subscriptions.length; i++) {
            console.log(subscriptions[i]);
        }
        break;
    }

    case '3': {
        // Logic tim va cap nhat thue bao
        break;
    }

    case '4': {
        // Logic tim va xoa thue bao
        break;
    }
}



Nhược điểm: Khi thêm chức năng tính tiền, gia hạn hoặc thống kê, khối switch-case tiếp tục dài ra. Việc tìm lỗi và sửa đổi trở nên khó khăn hơn.
3. Ví dụ code mô-đun hóa (Modular)
Bước 1: Tách từng chức năng thành hàm

function addSubscription() {
    const customerName = prompt('Nhap ten khach hang:');

    if (customerName === null || customerName.trim() === '') {
        alert('Ten khach hang khong hop le!');
        return;
    }

    subscriptions.push({
        customerName: customerName.trim(),
        planTier: 'PERSONAL'
    });

    alert('Them thue bao thanh cong!');
}

function listSubscriptions() {
    for (let i = 0; i < subscriptions.length; i++) {
        console.log(subscriptions[i]);
    }
}

function updateSubscription() {
    console.log('Xu ly cap nhat thue bao');
}

function deleteSubscription() {
    console.log('Xu ly huy thue bao');
}



Bước 2: Menu chỉ chịu trách nhiệm điều hướng

let menuChoice;

do {
    menuChoice = prompt(
        'QUAN LY THUE BAO\n' +
        '1. Them thue bao\n' +
        '2. Xem danh sach\n' +
        '3. Cap nhat thue bao\n' +
        '4. Huy thue bao\n' +
        '5. Thoat'
    );

    switch (menuChoice) {
        case '1':
            addSubscription();
            break;

        case '2':
            listSubscriptions();
            break;

        case '3':
            updateSubscription();
            break;

        case '4':
            deleteSubscription();
            break;

        case '5':
            alert('Thoat chuong trinh!');
            break;

        case null:
            menuChoice = '5';
            break;

        default:
            alert('Lua chon khong hop le!');
    }
} while (menuChoice !== '5');



Ở kiến trúc này, switch-case không còn xử lý chi tiết nghiệp vụ mà chỉ gọi hàm tương ứng.
4. Áp dụng nguyên lý SRP (Single Responsibility Principle)
SRP – Nguyên lý đơn nhiệm: Mỗi hàm nên có một trách nhiệm chính, giúp dễ hiểu, sửa đổi và kiểm thử.
addSubscription()

Chịu trách nhiệm thêm thuê bao mới.



listSubscriptions()

Chịu trách nhiệm hiển thị danh sách thuê bao.



updateSubscription()

Chịu trách nhiệm cập nhật thông tin thuê bao.



deleteSubscription()

Chịu trách nhiệm xóa thuê bao.



Lưu ý: SRP không có nghĩa là mỗi hàm chỉ được có một câu lệnh. Một hàm có thể chứa nhiều câu lệnh, miễn là chúng phục vụ cùng một trách nhiệm chính.