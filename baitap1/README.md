# Dò vết và sửa lỗi điều kiện biên Grace Period

## 1. Phân tích lỗi

Trong hàm `auditSubscriptions(list)`, đoạn code sai logic là:

```javascript
if (sub.daysOverdue >= 3) {
```

**Nguyên nhân:** Toán tử `>= 3` khiến hệ thống hạ cấp thuê bao ngay khi số ngày nợ cước bằng 3. Tuy nhiên, theo yêu cầu nghiệp vụ, khách hàng vẫn được sử dụng gói cũ trong 3 ngày đầu.

**Cách sửa:** Thay điều kiện `sub.daysOverdue >= 3` bằng `sub.daysOverdue > 3`.

Quy tắc xử lý:

- `daysOverdue <= 0`: Không có ngày nợ cước, giữ nguyên thông tin thuê bao.
- `0 < daysOverdue <= 3`: Giữ nguyên gói cước và giới hạn thiết bị, cập nhật trạng thái `GRACE_PERIOD`.
- `daysOverdue > 3`: Hạ cấp về gói `FREE`, đặt `deviceLimit = 1` và cập nhật trạng thái `EXPIRED`.

## 2. Bảng Test Cases

| Trường hợp kiểm thử | Dữ liệu đầu vào | Kết quả sai thực tế | Kết quả đúng mong đợi |
|---|---|---|---|
| TC01: Nợ cước đúng 3 ngày | `daysOverdue = 3`, `planTier = 'FAMILY'`, `deviceLimit = 5` | Bị hạ cấp về `FREE`, `deviceLimit = 1`, trạng thái `EXPIRED` | Giữ gói `FAMILY`, `deviceLimit = 5`, trạng thái `GRACE_PERIOD` |
| TC02: Nợ cước 4 ngày | `daysOverdue = 4`, `planTier = 'FAMILY'`, `deviceLimit = 5` | Bị hạ cấp về `FREE`, `deviceLimit = 1`, trạng thái `EXPIRED` | Hạ cấp về `FREE`, `deviceLimit = 1`, trạng thái `EXPIRED` |

## 3. Kết luận

Lỗi xuất phát từ việc sử dụng sai toán tử so sánh tại điều kiện biên. Sửa `>= 3` thành `> 3` giúp hệ thống tuân thủ chính sách ân hạn 3 ngày, tránh hạ cấp thuê bao sớm và đảm bảo đồng bộ các thuộc tính của từng đối tượng trong mảng.
