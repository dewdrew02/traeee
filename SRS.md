# Software Requirements Specification (SRS) - BMI Tracking Web Application

## 1. บทนำ (Introduction)

### 1.1 วัตถุประสงค์ (Purpose)
เอกสารนี้จัดทำขึ้นเพื่อระบุความต้องการของระบบ "BMI Tracking Web Application" ซึ่งเป็นระบบบันทึกและติดตามค่าดัชนีมวลกาย (BMI) สำหรับผู้ใช้งานหลายคน (Multi-user) โดยมุ่งเน้นการเก็บบันทึกข้อมูลสุขภาพส่วนบุคคลและแสดงผลรายงานสรุป (MIS Report) ในรูปแบบต่างๆ เพื่อช่วยให้ผู้ใช้งานสามารถติดตามแนวโน้มสุขภาพของตนเองได้อย่างมีประสิทธิภาพ

### 1.2 ขอบเขตของงาน (Scope)
ระบบเป็น Web Application ที่พัฒนาด้วย Next.js และใช้ฐานข้อมูล SQLite รองรับการใช้งานผ่าน Web Browser บนอุปกรณ์ต่างๆ (Responsive Design)

## 2. เทคโนโลยีที่ใช้ (Technology Stack)

- **Frontend Framework**: Next.js (Latest version)
- **Backend/API**: Next.js API Routes / Server Actions
- **Database**: SQLite
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## 3. ความต้องการของระบบ (Functional Requirements)

### 3.1 ระบบจัดการผู้ใช้งาน (User Management)
- **FR-01 User Registration**: ผู้ใช้งานสามารถสมัครสมาชิกใหม่ได้ โดยระบุ Username, Password และข้อมูลพื้นฐาน
- **FR-02 User Login/Logout**: ผู้ใช้งานสามารถเข้าสู่ระบบและออกจากระบบได้อย่างปลอดภัย (Authentication)
- **FR-03 User Profile**: ผู้ใช้งานสามารถแก้ไขข้อมูลส่วนตัวได้

### 3.2 ระบบคำนวณและบันทึก BMI (BMI Calculator & Tracking)
- **FR-04 Calculate BMI**: ระบบต้องสามารถคำนวณค่า BMI จากน้ำหนัก (kg) และส่วนสูง (cm) ได้ทันที
- **FR-05 Record Data**: ผู้ใช้งานสามารถบันทึกค่า น้ำหนัก, ส่วนสูง, BMI และวันที่บันทึก ลงในฐานข้อมูลส่วนตัวได้
- **FR-06 View History**: ผู้ใช้งานสามารถดูรายการประวัติการบันทึก BMI ของตนเองได้
- **FR-07 Edit/Delete Record**: ผู้ใช้งานสามารถแก้ไขหรือลบรายการบันทึกของตนเองได้

### 3.3 ระบบรายงาน MIS (MIS Reporting)
ระบบต้องสามารถสร้างรายงานสรุปและแสดงผลในรูปแบบตารางหรือกราฟ โดยแบ่งตามช่วงเวลาดังนี้:
- **FR-08 Daily Report**: รายงานประวัติ BMI รายวัน แสดงรายละเอียดการเปลี่ยนแปลงในแต่ละวัน
- **FR-09 Weekly Report**: รายงานสรุปรายสัปดาห์ แสดงค่าเฉลี่ย BMI ในแต่ละสัปดาห์
- **FR-10 Monthly Report**: รายงานสรุปรายเดือน แสดงแนวโน้มค่าเฉลี่ยและจำนวนครั้งที่บันทึก
- **FR-11 Yearly Report**: รายงานสรุปรายปี แสดงภาพรวมสุขภาพตลอดทั้งปี

## 4. การออกแบบฐานข้อมูล (Database Schema Design)

### 4.1 ตาราง Users
เก็บข้อมูลผู้ใช้งานระบบ
- `id`: Integer (Primary Key, Auto Increment)
- `username`: String (Unique)
- `password_hash`: String
- `created_at`: DateTime

### 4.2 ตาราง BMIRecords
เก็บข้อมูลประวัติ BMI ของผู้ใช้งานแต่ละคน
- `id`: Integer (Primary Key, Auto Increment)
- `user_id`: Integer (Foreign Key -> Users.id)
- `weight`: Float
- `height`: Float
- `bmi`: Float
- `recorded_at`: DateTime

## 5. ความต้องการที่ไม่ใช่ฟังก์ชัน (Non-Functional Requirements)

- **Performance**: ระบบต้องตอบสนองรวดเร็ว การคำนวณและการดึงรายงานต้องใช้เวลาไม่เกิน 2 วินาทีในปริมาณข้อมูลปกติ
- **Security**: 
  - รหัสผ่านต้องถูกเข้ารหัส (Encryption/Hashing) ก่อนบันทึกลงฐานข้อมูล
  - ข้อมูลของผู้ใช้แต่ละคนต้องเป็นส่วนตัว ผู้ใช้อื่นไม่สามารถเข้าถึงได้
- **Usability**: รองรับการใช้งานบนมือถือ (Mobile Responsive) และใช้งานง่าย

## 6. แผนการพัฒนา (Development Roadmap)
1.  Setup Project & Database Configuration (SQLite)
2.  Implement Authentication System
3.  Implement BMI CRUD Operations (Database integration)
4.  Implement MIS Reporting Logic (Daily, Weekly, Monthly, Yearly)
5.  Testing & Refinement
