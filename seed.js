const { createPool } = require("mysql2/promise");
const { fakerID_ID, faker } = require("@faker-js/faker");
const motor = require("./motorcycles.js");

const connection = createPool({
  host: "localhost",
  user: "grbadmin",
  password: "Password1!",
  database: "grb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function createTable(tableName, query) {
  await connection.query(query);
}

async function createTableKontakPerusahaan() {
  /**
    CREATE TABLE KontakPerusahaan (
        id_perusahaan INT,
        kontak VARCHAR(20),
        PRIMARY KEY (id_perusahaan, kontak),
        FOREIGN KEY (id_perusahaan) REFERENCES Perusahaan(id_perusahaan) 
    );
     */

  const query = `
    CREATE TABLE KontakPerusahaan (
        id_perusahaan INT,
        kontak VARCHAR(20),
        PRIMARY KEY (id_perusahaan, kontak),
        FOREIGN KEY (id_perusahaan) REFERENCES Perusahaan(id_perusahaan) 
    )`;

  await createTable("KontakPerusahaan", query);
}

async function createTablePerusahaan() {
  /**
    CREATE TABLE Perusahaan(
        id_perusahaan INT AUTO_INCREMENT,
        nama VARCHAR(255),
        alamat VARCHAR(255),
        PRIMARY KEY (id_perusahaan)
    );
     */

  const query = `CREATE TABLE Perusahaan (
            id_perusahaan INT AUTO_INCREMENT, 
            nama VARCHAR(255), 
            alamat VARCHAR(255), 
            PRIMARY KEY (id_perusahaan)
        )`;

  await createTable("Perusahaan", query);
}

async function createTablePerusahaanAsuransi() {
  /**
    CREATE TABLE PerusahaanAsuransi (
        id_PerusahaanAsuransi INT,
        PRIMARY KEY (id_PerusahaanAsuransi),
        FOREIGN KEY (id_PerusahaanAsuransi) REFERENCES Perusahaan(id_perusahaan) 
    );
     */

  const query = `
    CREATE TABLE PerusahaanAsuransi (
        id_PerusahaanAsuransi INT,
        PRIMARY KEY (id_PerusahaanAsuransi),
        FOREIGN KEY (id_PerusahaanAsuransi) REFERENCES Perusahaan(id_perusahaan) 
    )`;
  await createTable("PerusahaanAsuransi", query);
}

async function createTablePerusahaanPerawatan() {
  /**
    CREATE TABLE PerusahaanPerawatan (
        id_PerusahaanPerawatan INT,
        jumlah_teknisi INT,
        PRIMARY KEY (id_PerusahaanPerawatan),
        FOREIGN KEY (id_PerusahaanPerawatan) REFERENCES Perusahaan(id_perusahaan)
    );
     */

  const query = `
    CREATE TABLE PerusahaanPerawatan (
        id_PerusahaanPerawatan INT,
        jumlah_teknisi INT,
        PRIMARY KEY (id_PerusahaanPerawatan),
        FOREIGN KEY (id_PerusahaanPerawatan) REFERENCES Perusahaan(id_perusahaan)
    )`;
  await createTable("PerusahaanPerawatan", query);
}

async function createTableAsuransi() {
  /**
    CREATE TABLE Asuransi (
        id_Asuransi INT,
        disediakan_oleh INT,
        dimiliki_oleh VARCHAR(50),
        tanggal_exp DATE,
        harga_asuransi DECIMAL(10, 2),
        PRIMARY KEY (id_Asuransi, disediakan_oleh, dimiliki_oleh),
        FOREIGN KEY (disediakan_oleh) REFERENCES PerusahaanAsuransi(id_PerusahaanAsuransi),
        FOREIGN KEY (dimiliki_oleh) REFERENCES Kendaraan(Model)
    );
     */
  const query = `
    CREATE TABLE Asuransi (
        id_Asuransi INT,
        disediakan_oleh INT,
        dimiliki_oleh VARCHAR(50),
        tanggal_exp DATE,
        harga_asuransi DECIMAL(10, 2),
        PRIMARY KEY (id_Asuransi, disediakan_oleh),
        FOREIGN KEY (disediakan_oleh) REFERENCES PerusahaanAsuransi(id_PerusahaanAsuransi),
        FOREIGN KEY (dimiliki_oleh) REFERENCES Kendaraan(Model)
    )
    `;

  await createTable("Asuransi", query);
}

async function createTablePerawatan() {
  /**
    CREATE TABLE Perawatan (
        id_Perawatan INT,
        disediakan_oleh INT,
        dimiliki_oleh VARCHAR(50),
        tanggal DATE,
        tipe VARCHAR(50),
        PRIMARY KEY (id_Perawatan, disediakan_oleh, dimiliki_oleh),
        FOREIGN KEY (disediakan_oleh) REFERENCES PerusahaanPerawatan(id_PerusahaanPerawatan),
        FOREIGN KEY (dimiliki_oleh) REFERENCES Kendaraan(Model)
    );
     */
  const query = `
    CREATE TABLE Perawatan (
        id_Perawatan INT,
        disediakan_oleh INT,
        dimiliki_oleh VARCHAR(50),
        tanggal DATE,
        tipe VARCHAR(50),
        PRIMARY KEY (id_Perawatan, disediakan_oleh, dimiliki_oleh),
        FOREIGN KEY (disediakan_oleh) REFERENCES PerusahaanPerawatan(id_PerusahaanPerawatan),
        FOREIGN KEY (dimiliki_oleh) REFERENCES Kendaraan(Model)
    )
    `;

  await createTable("Perawatan", query);
}

async function createTableKendaraan() {
  /**
        CREATE TABLE Kendaraan (
            model VARCHAR(50),
            tahun_keluaran INT,
            tipe_elektrik ENUM('Elektrik', 'NonElektrik'),
            jumlah_kendaraan INT,
            PRIMARY KEY (Model)
        );
        */

  const query = `
    CREATE TABLE Kendaraan (
        model VARCHAR(50),
        tahun_keluaran INT,
        tipe_elektrik ENUM('Elektrik', 'NonElektrik'),
        jumlah_kendaraan INT,
        PRIMARY KEY (Model)
    )`;

  await createTable("Kendaraan", query);
}

async function createTableMotor() {
  /**
    CREATE TABLE Motor (
        model_motor VARCHAR(50),
        kapasitas_mesin INT,
        PRIMARY KEY (model_motor),
        FOREIGN KEY (model_motor) REFERENCES Kendaraan(model)
    );
     */
  const query = `
    CREATE TABLE Motor (
        model_motor VARCHAR(50),
        kapasitas_mesin INT,
        PRIMARY KEY (model_motor),
        FOREIGN KEY (model_motor) REFERENCES Kendaraan(model)
    )
    `;

  await createTable("Motor", query);
}

async function createTableMobil() {
  /**
    CREATE TABLE Mobil (
        model_mobil VARCHAR(50),
        jumlah_kursi INT,
        kelas ENUM('Normal', 'SUV', 'Van'),
        PRIMARY KEY (model_mobil),
        FOREIGN KEY (model_mobil) REFERENCES Kendaraan(model)
    );
     */

  const query = `
    CREATE TABLE Mobil (
        model_mobil VARCHAR(50),
        jumlah_kursi INT,
        kelas ENUM('Normal', 'SUV', 'Van'),
        PRIMARY KEY (model_mobil),
        FOREIGN KEY (model_mobil) REFERENCES Kendaraan(model)
    )
    `;

  await createTable("Mobil", query);
}

async function createTableDetail() {
  /**
    CREATE TABLE Detail (
        id_detail INT AUTO_INCREMENT,
        model_kendaraan VARCHAR(50),
        harga DECIMAL(10, 2),
        kuantitas INT,
        PRIMARY KEY (id_detail, model_kendaraan),
        FOREIGN KEY (model_kendaraan) REFERENCES Kendaraan(model

    )
     */
  const query = `
    CREATE TABLE Detail (
        id_detail INT AUTO_INCREMENT,
        model_kendaraan VARCHAR(50),
        harga DECIMAL(10, 2),
        kuantitas INT,
        PRIMARY KEY (id_detail, model_kendaraan),
        FOREIGN KEY (model_kendaraan) REFERENCES Kendaraan(model)

    )
    `;
  await createTable("Detail", query);
}

async function seedTableDetailPeminjaman() {
  try {
    const [details] = await connection.query(
      "SELECT id_detail, model_kendaraan FROM Detail"
    );

    const [loans] = await connection.query(
      "SELECT id_peminjaman FROM Peminjaman"
    );

    for (const detail of details) {
      const id_detail_peminjaman = detail.id_detail;
      const model_kendaraan = detail.model_kendaraan;

      const selectedLoan = faker.helpers.arrayElement(loans);
      const id_peminjaman = selectedLoan.id_peminjaman;

      const query = `INSERT INTO DetailPeminjaman (id_peminjaman, id_detail_peminjaman, model_kendaraan)
                       VALUES (?, ?, ?)`;
      await connection.query(query, [
        id_peminjaman,
        id_detail_peminjaman,
        model_kendaraan,
      ]);
      console.log(
        `Linked detail ID ${id_detail_peminjaman} (model ${model_kendaraan}) with loan ID ${id_peminjaman}`
      );
    }
  } catch (error) {
    console.error("Error seeding DetailPeminjaman:", error);
  }
}

async function createTablePeminjaman() {
  /**
    CREATE TABLE Peminjaman (
        id_peminjaman INT AUTO_INCREMENT,
        status_peminjaman ENUM('returned', 'pending', 'rented'),
        tanggal_mulai DATE,
        tanggal_berakhir DATE,
        PRIMARY KEY (id_peminjaman)
    );
     */

  const query = `
    CREATE TABLE Peminjaman (
        id_peminjaman INT AUTO_INCREMENT,
        status_peminjaman ENUM('returned', 'pending', 'rented'),
        tanggal_mulai DATE,
        tanggal_berakhir DATE,
        PRIMARY KEY (id_peminjaman)
    )
    `;

  await createTable("Peminjaman", query);
}

async function createTableKlien() {
  /**
    CREATE TABLE Klien (
        id_klien INT AUTO_INCREMENT,
        nama VARCHAR(255),
        email VARCHAR(255),
        nomor_telepon VARCHAR(20),
        PRIMARY KEY (id_klien)
    );
     */
  const query = `
    CREATE TABLE Klien (
        id_klien INT AUTO_INCREMENT,
        nama VARCHAR(255),
        email VARCHAR(255),
        nomor_telepon VARCHAR(20),
        PRIMARY KEY (id_klien)
    )
    `;

  await createTable("Klien", query);
}

async function createTablePeminjamanKlien() {
  /**
    CREATE TABLE PeminjamanKlien (
        id_klien INT,
        id_pegawai INT,
        id_peminjaman INT,
        PRIMARY KEY (id_klien, id_pegawai, id_peminjaman),
        FOREIGN KEY (id_klien) REFERENCES Klien(id_klien),
        FOREIGN KEY (id_pegawai) REFERENCES Pegawai(id_pegawai),
        FOREIGN KEY (id_peminjaman) REFERENCES Peminjaman(id_peminjaman)
    );
     */
  const query = `
    CREATE TABLE PeminjamanKlien (
        id_klien INT,
        id_pegawai INT,
        id_peminjaman INT,
        PRIMARY KEY (id_klien, id_pegawai, id_peminjaman),
        FOREIGN KEY (id_klien) REFERENCES Klien(id_klien),
        FOREIGN KEY (id_pegawai) REFERENCES Pegawai(id_pegawai),
        FOREIGN KEY (id_peminjaman) REFERENCES Peminjaman(id_peminjaman)
    )
    `;
  await createTable("PeminjamanKlien", query);
}

async function createTablePegawai() {
  /**
    CREATE TABLE Pegawai (
        id_pegawai INT AUTO_INCREMENT,
        id_atasan INT,
        nama VARCHAR(255),
        email VARCHAR(255),
        nomor_telepon VARCHAR(20),
        jabatan VARCHAR(50),
        PRIMARY KEY (id_pegawai),
        FOREIGN KEY (id_atasan) REFERENCES Pegawai(id_pegawai)  
    );
     */

  const query = `
    CREATE TABLE Pegawai (
        id_pegawai INT AUTO_INCREMENT,
        id_atasan INT,
        nama VARCHAR(255),
        email VARCHAR(255),
        nomor_telepon VARCHAR(20),
        jabatan ENUM('owner', 'manager', 'staff'),
        PRIMARY KEY (id_pegawai),
        FOREIGN KEY (id_atasan) REFERENCES Pegawai(id_pegawai),
        UNIQUE (nama)
    )`;
  await createTable("Pegawai", query);
}

async function createTables() {
  // OK !
  await createTablePerusahaan();

  // OK !
  // Needs perusahaan
  await createTableKontakPerusahaan();

  // OK !
  // Needs Perusahaan
  await createTablePerusahaanAsuransi();

  // OK !
  // Needs Perusahaan
  await createTablePerusahaanPerawatan();

  // OK !
  await createTableKendaraan();

  //
  await createTableAsuransi();

  //
  await createTablePerawatan();

  await createTableMobil();

  await createTableMotor();

  await createTableDetail();

  await createTablePeminjaman();

  await createTableDetailPeminjaman();

  await createTableKlien();

  await createTablePegawai();

  await createTablePeminjamanKlien();
}

async function seedTablePerusahaan() {
  let Names = [];
  let Addresses = [];

  for (let i = 0; i < 150; i++) {
    let companyName;
    do {
      companyName = fakerID_ID.company.name();
    } while (Names.includes(companyName));
    Names.push(companyName);
    companyName = companyName.replace(/'/g, "''");

    let address;
    do {
      address = faker.location.streetAddress({ useFullAddress: true });
    } while (address.length > 255 || Addresses.includes(address));
    Addresses.push(address);
    address = address.replace(/'/g, "''");

    try {
      const query = `INSERT INTO Perusahaan (nama, alamat) VALUES (?, ?)`;
      const [rows, fields] = await connection.query(query, [
        companyName,
        address,
      ]);
      console.log(`Inserted ${companyName} into Perusahaan`);
    } catch (err) {
      console.error("Error inserting data:", err);
    }
  }
}

async function seedTableKontakPerusahaan() {
  const queryGetIds = `SELECT id_perusahaan FROM Perusahaan`;
  try {
    const [rows, fields] = await connection.query(queryGetIds);
    for (let i = 0; i < rows.length; i++) {
      const id_perusahaan = rows[i].id_perusahaan;
      const kontak = [];
      const numberOfContacts = fakerID_ID.number.int({ min: 1, max: 3 });
      for (let j = 0; j < numberOfContacts; j++) {
        let contact;
        do {
          contact = fakerID_ID.phone.number();
        } while (kontak.includes(contact));
        kontak.push(contact);

        const queryInsert = `INSERT INTO KontakPerusahaan (id_perusahaan, kontak) VALUES (?, ?)`;
        try {
          await connection.query(queryInsert, [id_perusahaan, contact]);
          console.log(`Inserted ${contact} into KontakPerusahaan`);
        } catch (error) {
          console.error("Error inserting data:", error);
        }
      }
    }
  } catch (error) {
    console.error("Error selecting data:", error);
  }
}

async function seedTablePegawai() {
  const jabatanValues = ["owner", "manager", "staff"];
  const names = [];
  const phoneNumbers = [];
  const managersIdx = [];
  for (let i = 0; i < 100; i++) {
    let email;
    let name;
    let firstName;
    let lastName;
    do {
      firstName = fakerID_ID.person.firstName();
      lastName = fakerID_ID.person.lastName();
      name = firstName + " " + lastName;
    } while (names.includes(name));
    names.push(name);

    email = fakerID_ID.internet.email({
      firstName: firstName,
      lastName: lastName,
    });

    let phoneNumber;
    do {
      phoneNumber = fakerID_ID.phone.number();
    } while (phoneNumbers.includes(phoneNumber));
    phoneNumbers.push(phoneNumber);

    let jabatan;
    let idAtasan;
    if (i == 0) {
      jabatan = jabatanValues[0];
      idAtasan = 1;
    } else {
      if (managersIdx.length == 0) {
        jabatan = jabatanValues[1];
        idAtasan = 1;
        managersIdx.push(i);
      } else {
        if (fakerID_ID.number.int({ min: 0, max: 3 }) === 0) {
          jabatan = jabatanValues[1];
          idAtasan = 1;
          managersIdx.push(i);
        } else {
          jabatan = jabatanValues[2];
          idAtasan =
            managersIdx[
              fakerID_ID.number.int({ min: 0, max: managersIdx.length - 1 })
            ] + 1;
        }
      }
    }

    try {
      const query = `INSERT INTO Pegawai (id_atasan, nama, email, nomor_telepon, jabatan) VALUES (?, ?, ?, ?, ?)`;
      const [rows, fields] = await connection.query(query, [
        idAtasan,
        name,
        email,
        phoneNumber,
        jabatan,
      ]);
      console.log(`Inserted ${name} into Pegawai`);
    } catch (err) {
      console.error("Error inserting data:", err);
    }
  }
}

async function seedTableKlien() {
  const queryGetPegawaiRows = `SELECT * FROM Pegawai`;
  try {
    const [rows, fields] = await connection.query(queryGetPegawaiRows);
    const perusahaanNames = rows.map((row) => row.nama);
    const perusahaanPhoneNumbers = rows.map((row) => row.nomor_telepon);
    const names = [];
    const phoneNumbers = [];
    for (let i = 0; i < 50; i++) {
      let email;
      let name;
      let firstName;
      let lastName;
      do {
        firstName = fakerID_ID.person.firstName();
        lastName = fakerID_ID.person.lastName();
        name = firstName + " " + lastName;
      } while (names.includes(name) || perusahaanNames.includes(name));
      names.push(name);

      email = fakerID_ID.internet.email({
        firstName: firstName,
        lastName: lastName,
      });

      let phoneNumber;
      do {
        phoneNumber = fakerID_ID.phone.number();
      } while (
        phoneNumbers.includes(phoneNumber) ||
        perusahaanPhoneNumbers.includes(phoneNumber)
      );
      phoneNumbers.push(phoneNumber);

      try {
        const query = `INSERT INTO Klien (nama, email, nomor_telepon) VALUES (?, ?, ?)`;
        const [rows, fields] = await connection.query(query, [
          name,
          email,
          phoneNumber,
        ]);
        console.log(`Inserted ${name} into Klien`);
      } catch (err) {
        console.error("Error inserting data:", err);
      }
    }
  } catch (error) {
    console.error("Error selecting data:", error);
  }
}

async function seedTablePerusahaanAsuransiAndPerusahaanPerawatan() {
  const queryGetIds = `SELECT id_perusahaan FROM Perusahaan`;
  try {
    const [rows, fields] = await connection.query(queryGetIds);
    for (let i = 0; i < rows.length; i++) {
      const id_perusahaan = rows[i].id_perusahaan;
      if (fakerID_ID.number.int({ min: 0, max: 1 }) === 0) {
        const queryInsertAsuransi = `INSERT INTO PerusahaanAsuransi (id_PerusahaanAsuransi) VALUES (?)`;
        await connection.query(queryInsertAsuransi, [id_perusahaan]);
      } else {
        const queryInsertPerawatan = `INSERT INTO PerusahaanPerawatan (id_PerusahaanPerawatan, jumlah_teknisi) VALUES (?, ?)`;
        await connection.query(queryInsertPerawatan, [
          id_perusahaan,
          fakerID_ID.number.int({ min: 3, max: 15 }),
        ]);
      }

      console.log(
        `Inserted ${id_perusahaan} into PerusahaanAsuransi OR PerusahaanPerawatan`
      );
    }
  } catch (err) {
    console.error("Error selecting data:", err);
  }
}

async function seedKendaraanAndItsSpecializations() {
  let motorSet = [];
  let mobilSet = [];

  const merks = ["Honda", "Toyota", "Suzuki", "BMW", "Kijang", "Fiat"];

  for (let i = 0; i < 300; i++) {
    if (fakerID_ID.number.int({ min: 0, max: 1 }) === 0) {
      // Motor

      let currentMotor;
      let merk;
      let fullName;
      do {
        merk = faker.helpers.arrayElement(merks);
        currentMotor = faker.helpers.arrayElement(motor);
        fullName = merk + " " + currentMotor.model;
      } while (motorSet.includes(fullName));
      motorSet.push(fullName);

      const queryInsertKendaraan = `INSERT INTO Kendaraan (model, tahun_keluaran, tipe_elektrik, jumlah_kendaraan) VALUES (?, ?, ?, ?)`;
      await connection.query(queryInsertKendaraan, [
        fullName,
        currentMotor.tahun_keluaran,
        currentMotor.tipe_elektrik ? "Elektrik" : "NonElektrik",
        currentMotor.jumlah_kendaraan,
      ]);

      const queryInsertMotor = `INSERT INTO Motor (model_motor, kapasitas_mesin) VALUES (?, ?)`;
      await connection.query(queryInsertMotor, [
        fullName,
        currentMotor.kapasitas_mesin,
      ]);
    } else {
      let currentModel;
      let merk;
      do {
        merk = faker.helpers.arrayElement(merks);
        currentModel = merk + " " + faker.vehicle.model();
      } while (mobilSet.includes(currentModel));
      mobilSet.push(currentModel);

      let type = faker.vehicle.type();
      let carType;
      if (type.includes("SUV")) {
        carType = "SUV";
      } else if (
        type.includes("Van") ||
        type.includes("Minivan") ||
        type.includes("van") ||
        type.includes("minivan")
      ) {
        carType = "Van";
      } else {
        carType = "Normal";
      }

      const currentMobil = {
        model: currentModel,
        tahun_keluaran: faker.number.int({ min: 2000, max: 2022 }),
        jumlah_kursi: faker.number.int({ min: 2, max: 8 }),
        kelas: carType,
        jumlah_kendaraan: faker.number.int({ min: 1, max: 100 }),
      };

      const queryInsertKendaraan = `INSERT INTO Kendaraan (model, tahun_keluaran, tipe_elektrik, jumlah_kendaraan) VALUES (?, ?, ?, ?)`;
      await connection.query(queryInsertKendaraan, [
        currentMobil.model,
        currentMobil.tahun_keluaran,
        currentMobil.tipe_elektrik ? "Elektrik" : "NonElektrik",
        currentMobil.jumlah_kendaraan,
      ]);

      const queryInsertMobil = `INSERT INTO Mobil (model_mobil, jumlah_kursi, kelas) VALUES (?, ?, ?)`;
      await connection.query(queryInsertMobil, [
        currentMobil.model,
        currentMobil.jumlah_kursi,
        currentMobil.kelas,
      ]);
    }
  }
}

async function seedTableAsuransi() {
  const queryGetPerusahaanAsuransi = `SELECT id_PerusahaanAsuransi FROM PerusahaanAsuransi`;
  const queryGetKendaraan = `SELECT model FROM Kendaraan`;

  try {
    const [perusahaanAsuransi] = await connection.query(
      queryGetPerusahaanAsuransi
    );
    const [ListOfModelKendaraan] = await connection.query(queryGetKendaraan);

    for (const perusahaan of perusahaanAsuransi) {
      const jumlahDisediakan = faker.number.int({ min: 1, max: 10 });
      const disediakan_oleh = perusahaan.id_PerusahaanAsuransi;

      for (let i = 1; i <= jumlahDisediakan; i++) {
        dimiliki_oleh = faker.helpers.arrayElement(ListOfModelKendaraan).model;
        tanggal_exp = faker.date.future();
        harga_asuransi = faker.number.int({ min: 500000, max: 5000000 });

        const query = `INSERT INTO Asuransi (id_Asuransi, disediakan_oleh, dimiliki_oleh, tanggal_exp, harga_asuransi) VALUES (?, ?, ?, ?, ?)`;

        await connection.query(query, [
          i,
          disediakan_oleh,
          dimiliki_oleh,
          tanggal_exp,
          harga_asuransi,
        ]);
        console.log(`Inserted insurance data for ${dimiliki_oleh}`);
      }
    }
  } catch (error) {
    console.error("Error seeding Asuransi:", error);
  }
}

async function seedTablePerawatan() {
  const queryGetPerusahaanPerawatan = `SELECT id_PerusahaanPerawatan FROM PerusahaanPerawatan`;
  const queryGetKendaraan = `SELECT model FROM Kendaraan`;

  const types = [
    "Ganti oli",
    "Ganti aki",
    "Ganti lampu",
    "Steam",
    "Ganti ban",
    "Ganti kampas rem",
    "Ganti filter oli",
    "Ganti filter udara",
    "Ganti filter bensin",
    "Ganti busi",
    "Ganti kabel busi",
    "Ganti kopling",
    "Ganti rantai",
    "Ganti gear",
    "Ganti karburator",
    "Ganti shockbreaker",
    "Ganti kampas kopling",
    "Ganti kampas rem",
    "Ganti kabel gas",
    "Ganti kabel kopling",
    "Ganti kabel rem",
    "Ganti kabel speedometer",
  ];

  try {
    const [PerusahaanPerawatan] = await connection.query(
      queryGetPerusahaanPerawatan
    );
    const [ListOfModelKendaraan] = await connection.query(queryGetKendaraan);

    for (const perusahaan of PerusahaanPerawatan) {
      const jumlahDisediakan = faker.number.int({ min: 1, max: 10 });
      const disediakan_oleh = perusahaan.id_PerusahaanPerawatan;

      for (let i = 1; i <= jumlahDisediakan; i++) {
        const dimiliki_oleh =
          faker.helpers.arrayElement(ListOfModelKendaraan).model;
        const tanggal = faker.date.past();
        const tipe = faker.helpers.arrayElement(types);

        const query = `INSERT INTO Perawatan (id_Perawatan, disediakan_oleh, dimiliki_oleh, tanggal, tipe) VALUES (?, ?, ?, ?, ?)`;

        await connection.query(query, [
          i,
          disediakan_oleh,
          dimiliki_oleh,
          tanggal,
          tipe,
        ]);
        console.log(`Inserted perawatan data for ${dimiliki_oleh}`);
      }
    }
  } catch (error) {
    console.error("Error seeding Asuransi:", error);
  }
}

async function seedTableDetail() {
  const queryGetKendaraan = `SELECT model FROM Kendaraan`;

  try {
    const [kendaraan] = await connection.query(queryGetKendaraan);

    for (let i = 0; i < kendaraan.length; i++) {
      const queryGetMaksimalKuantitasPeminjaman = `SELECT jumlah_kendaraan FROM Kendaraan WHERE model = ?`;
      const [maksimalKuantitasPeminjaman] = await connection.query(
        queryGetMaksimalKuantitasPeminjaman,
        [kendaraan[i].model]
      );

      const jumlahPernahDipinjamBerapaKali = faker.number.int({
        min: 0,
        max: 3,
      });
      for (let j = 0; j < jumlahPernahDipinjamBerapaKali; j++) {
        const model_kendaraan = kendaraan[i].model;
        const harga = faker.number.int({ min: 1000000, max: 10000000 });
        const kuantitas = faker.number.int({
          min: 1,
          max: maksimalKuantitasPeminjaman[0].jumlah_kendaraan,
        });

        const query = `INSERT INTO Detail (model_kendaraan, harga, kuantitas) VALUES (?, ?, ?)`;

        await connection.query(query, [model_kendaraan, harga, kuantitas]);
        console.log(`Inserted detail data for ${model_kendaraan}`);
      }
    }
  } catch (error) {
    console.error("Error seeding Detail:", error);
  }
}

async function seedTableDetailPeminjaman() {
  try {
    // Retrieve all loan IDs
    const [loans] = await connection.query(
      "SELECT id_peminjaman FROM Peminjaman"
    );

    // Loop through each loan to associate it with vehicle details
    for (const loan of loans) {
      const id_peminjaman = loan.id_peminjaman;

      // Randomly decide how many different vehicle models are involved in this loan
      const numVehicles = fakerID_ID.number.int({ min: 1, max: 3 });

      // Get random unique vehicle models to associate with this loan
      const [details] = await connection.query(
        `SELECT id_detail, model_kendaraan FROM Detail ORDER BY RAND() LIMIT ?`,
        [numVehicles]
      );

      for (const detail of details) {
        const id_detail_peminjaman = detail.id_detail;
        const model_kendaraan = detail.model_kendaraan;

        // Insert into DetailPeminjaman
        const query = `INSERT INTO DetailPeminjaman (id_peminjaman, id_detail_peminjaman, model_kendaraan)
                         VALUES (?, ?, ?)`;
        await connection.query(query, [
          id_peminjaman,
          id_detail_peminjaman,
          model_kendaraan,
        ]);
        console.log(
          `Inserted detail loan data for model ${model_kendaraan} with loan ID ${id_peminjaman}`
        );
      }
    }
  } catch (error) {
    console.error("Error seeding DetailPeminjaman:", error);
  }
}

async function seedTablePeminjaman() {
  const statusPeminjamanValues = ["returned", "pending", "rented"];
  let startDates = [];
  let currentDate = new Date("2024-05-05");
  for (let i = 0; i < 100; i++) {
    let startDate;
    do {
      startDate = faker.date.between({ from: "2024-04-01", to: "2024-05-05" });
    } while (startDates.includes(startDate));
    startDates.push(startDate);

    let endDate = faker.date.soon({ days: 30, refDate: startDate });

    const differenceInMillis = currentDate.getTime() - endDate.getTime();
    const differenceInDays = differenceInMillis / (1000 * 3600 * 24);

    let statusPeminjaman;
    if (currentDate < endDate) {
      statusPeminjaman = statusPeminjamanValues[2];
    } else {
      // Jika lebih dari 5 hari lewat endDate peminjaman dibuat sudah dikembalikan
      if (differenceInDays > 5) {
        statusPeminjaman = statusPeminjamanValues[0];
      } else {
        // Bisa jadi peminjam lewat mengembalikan selama maksimal 5 hari
        statusPeminjaman =
          statusPeminjamanValues[fakerID_ID.number.int({ min: 0, max: 1 })];
      }
    }
    try {
      const query = `INSERT INTO Peminjaman (status_peminjaman, tanggal_mulai, tanggal_berakhir) VALUES (?, ?, ?)`;
      const [rows, fields] = await connection.query(query, [
        statusPeminjaman,
        startDate,
        endDate,
      ]);
    } catch (err) {
      console.error("Error inserting data:", err);
    }
  }
}

async function seedTablePeminjamanKlien() {
  const queryGetPegawai = `SELECT * FROM Pegawai`;
  const queryGetKlien = `SELECT id_klien FROM Klien`;
  const queryGetPeminjaman = `SELECT id_peminjaman FROM Peminjaman`;
  let entries = [];

  try {
    const [pegawai] = await connection.query(queryGetPegawai);
    const [klien] = await connection.query(queryGetKlien);
    const [peminjaman] = await connection.query(queryGetPeminjaman);

    for (let i = 0; i < 20; i++) {
      const idKlien = faker.helpers.arrayElement(klien).id_klien;

      let tempPegawai;
      do {
        tempPegawai = faker.helpers.arrayElement(pegawai);
      } while (tempPegawai.jabatan !== "staff");
      const idPegawai = tempPegawai.id_pegawai;

      const idPeminjaman = faker.helpers.arrayElement(peminjaman).id_peminjaman;

      let entry = {
        klien: idKlien,
        pegawai: idPegawai,
        peminjaman: idPeminjaman,
      };

      if (entries.includes(entry)) {
        i--;
      }

      const query = `INSERT INTO PeminjamanKlien (id_klien, id_pegawai, id_peminjaman) VALUES (?, ?, ?)`;

      await connection.query(query, [idKlien, idPegawai, idPeminjaman]);
    }
  } catch (error) {
    console.error("Error seeding PeminjamanKlien:", error);
  }
}

async function seedTables() {
  await seedTablePerusahaan();

  await seedTableKontakPerusahaan();

  await seedTablePerusahaanAsuransiAndPerusahaanPerawatan();

  await seedKendaraanAndItsSpecializations();

  await seedTablePegawai();

  await seedTableKlien();

  await seedTablePeminjaman();

  await seedTablePeminjamanKlien();

  await seedTableAsuransi();

  await seedTablePerawatan();

  await seedTableDetail();

  await seedTableDetailPeminjaman();
}

/**
 * Run the seeding, by creating the tables and insert a bunch of data.
 */
async function main() {
  fakerID_ID.seed(100);
  faker.seed(100);
  try {
    /**
     * Create tables using the relation schema we have designed
     * @ref https://app.diagrams.net/#G1KGB53olz7TQHCSylU_IqyHBWQxJqYH9P#%7B%22pageId%22%3A%22pUiTZZOMAEUaQYOUVsJx%22%7D
     */
    await createTables();

    // Seed all the tables using faker.js
    await seedTables();

    await connection.end();
  } catch (err) {
    console.error(err);
  }
}

main();
