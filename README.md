# SkillAnti

Bộ công cụ quản lý **skills** cho AI Agent — giúp tải, cài đặt và kiểm soát các quy tắc hành vi của trợ lý AI trong dự án của bạn.

## Skills hiện có

| Skill | Mô tả |
|---|---|
| `strict-protocol` | Tuân thủ nghiêm ngặt mệnh lệnh, giao tiếp súc tích và commit message chuẩn tiếng Việt |
| `clean-code` | Phân tách logic 3 lớp, quy chuẩn đặt tên và kiểm thử bắt buộc (Web & App) |
| `quality-control` | Truy vết lỗi, ghi log có cấu trúc, lập trình phòng vệ và checklist debug |

## Cài đặt

```bash
npx skills add duyxyz/SkillAnti
```

Lệnh này sẽ tự động sao chép thư mục `.agents` và toàn bộ skills vào thư mục dự án để AI Agent nhận diện và sử dụng ngay.

## Các lệnh CLI

```bash
# Tải và cài đặt skill từ GitHub
npx skills add <user>/<repo>

# Liệt kê các skill đã cài trong dự án hiện tại
npx skills list
```

## Yêu cầu

- Node.js >= 16.0.0
