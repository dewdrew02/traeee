# Task Breakdown for BMI Tracking Web Application

เอกสารนี้แบ่งงานตามลำดับความสำคัญและขั้นตอนการพัฒนา เพื่อให้บรรลุตามข้อกำหนดใน SRS.md

## Phase 1: Project Setup & Database Initialization (การตั้งค่าโปรเจกต์และฐานข้อมูล)
เป้าหมาย: เตรียมโครงสร้างโปรเจกต์ให้พร้อมสำหรับ Next.js + SQLite

- [x] **Task 1.1**: ติดตั้ง Library ที่จำเป็นสำหรับการจัดการฐานข้อมูล
  - แนะนำให้ใช้ Prisma ORM (`npm install prisma --save-dev`, `npm install @prisma/client`)
  - ติดตั้ง `bcrypt` หรือ `argon2` สำหรับการ Hash password
- [x] **Task 1.2**: ออกแบบและสร้าง Schema (`schema.prisma`)
  - สร้าง Model `User` (id, username, password, created_at)
  - สร้าง Model `BMIRecord` (id, userId, weight, height, bmi, recorded_at)
  - กำหนด Relation ระหว่าง User และ BMIRecord (One-to-Many)
- [x] **Task 1.3**: สร้าง Database Migration
  - รันคำสั่งสร้างไฟล์ SQLite database (`dev.db`)

## Phase 2: User Authentication (ระบบจัดการผู้ใช้งาน)
เป้าหมาย: รองรับ Multi-user ตาม SRS โดยให้ผู้ใช้แต่ละคนเข้าถึงข้อมูลของตนเองได้เท่านั้น

- [x] **Task 2.1**: สร้าง API/Server Action สำหรับการลงทะเบียน (Register)
  - ตรวจสอบ Username ซ้ำ
  - Hash password ก่อนบันทึก
- [x] **Task 2.2**: สร้าง API/Server Action สำหรับการเข้าสู่ระบบ (Login)
  - ตรวจสอบ Username/Password
  - สร้าง Session Management (ใช้ `jose` JWT + Cookie)
- [x] **Task 2.3**: สร้างหน้า UI สำหรับ Login และ Register
- [x] **Task 2.4**: ปรับปรุง Middleware เพื่อป้องกัน Route ที่ต้อง Login

## Phase 3: BMI Core Features Migration (ปรับปรุงระบบหลักให้ใช้ Database)
เป้าหมาย: เปลี่ยนการเก็บข้อมูลจาก LocalStorage เป็น Database (SQLite)

- [ ] **Task 3.1**: สร้าง Server Actions สำหรับ CRUD Operations
  - `addRecord(weight, height, date)`
  - `getRecords()` (เฉพาะของ User ที่ Login อยู่)
  - `deleteRecord(id)`
- [ ] **Task 3.2**: ปรับปรุงหน้า UI `BMICalculator`
  - เรียกใช้ Server Action แทน LocalStorage
- [ ] **Task 3.3**: ปรับปรุงหน้า UI `BMIReport`
  - Fetch ข้อมูลจาก Database มาแสดงผล

## Phase 4: MIS Reporting Implementation (ระบบรายงานสรุป)
เป้าหมาย: สร้างรายงานวิเคราะห์ข้อมูลรายวัน/สัปดาห์/เดือน/ปี ตาม SRS

- [ ] **Task 4.1**: พัฒนา Logic การ Query ข้อมูลแบบ Aggregate (Server-side)
  - Group by Day: แสดงรายการปกติ
  - Group by Week: หาค่าเฉลี่ย BMI รายสัปดาห์
  - Group by Month: หาค่าเฉลี่ย BMI รายเดือน
  - Group by Year: หาค่าเฉลี่ย BMI รายปี
- [ ] **Task 4.2**: ปรับปรุง UI `BMIReport` ให้รองรับการเลือกช่วงเวลา (Tabs)
  - เพิ่ม Tab: Daily, Weekly, Monthly, Yearly
  - แสดงผลในรูปแบบตารางสรุป

## Phase 5: Testing & Deployment (การทดสอบและนำขึ้นระบบ)
เป้าหมาย: ตรวจสอบความถูกต้องและความพร้อมใช้งาน

- [ ] **Task 5.1**: ทดสอบระบบ Multi-user
  - ลอง Login ด้วย User A และ User B
  - ตรวจสอบว่า User A ไม่เห็นข้อมูลของ User B
- [ ] **Task 5.2**: ทดสอบการคำนวณและการแสดงผลรายงาน
- [ ] **Task 5.3**: ตรวจสอบ Responsive Design บนมือถือ
- [ ] **Task 5.4**: เตรียม Build script สำหรับ Production
