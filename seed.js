const { createPool } = require('mysql2/promise');
const { fakerID_ID, faker } = require('@faker-js/faker');
const motor = require('./motorcycles.js');


const connection = createPool({
  host: 'localhost',
  user: 'grbadmin',
  password: 'password',
  database: 'grb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function createTable(tableName, query) {
    await connection.query(query)

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

    const query = 
        `
    CREATE TABLE KontakPerusahaan (
        id_perusahaan INT,
        kontak VARCHAR(20),
        PRIMARY KEY (id_perusahaan, kontak),
        FOREIGN KEY (id_perusahaan) REFERENCES Perusahaan(id_perusahaan) 
    )`

    await createTable('KontakPerusahaan', query)
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

    const query = 
        `CREATE TABLE Perusahaan (
            id_perusahaan INT AUTO_INCREMENT, 
            nama VARCHAR(255), 
            alamat VARCHAR(255), 
            PRIMARY KEY (id_perusahaan)
        )`
    
    await await createTable("Perusahaan", query);
      
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
    )`
    await createTable("PerusahaanAsuransi", query)
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
    )`
    await createTable("PerusahaanPerawatan", query)
}

async function createTableAsuransi() {
    /**
    CREATE TABLE Asuransi (
        id_Asuransi INT AUTO_INCREMENT,
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
        id_Asuransi INT AUTO_INCREMENT,
        disediakan_oleh INT,
        dimiliki_oleh VARCHAR(50),
        tanggal_exp DATE,
        harga_asuransi DECIMAL(10, 2),
        PRIMARY KEY (id_Asuransi, disediakan_oleh, dimiliki_oleh),
        FOREIGN KEY (disediakan_oleh) REFERENCES PerusahaanAsuransi(id_PerusahaanAsuransi),
        FOREIGN KEY (dimiliki_oleh) REFERENCES Kendaraan(Model)
    )
    `

    await createTable("Asuransi", query);
}

async function createTablePerawatan() {
    /**
    CREATE TABLE Perawatan (
        id_Perawatan INT AUTO_INCREMENT,
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
        id_Perawatan INT AUTO_INCREMENT,
        disediakan_oleh INT,
        dimiliki_oleh VARCHAR(50),
        tanggal DATE,
        tipe VARCHAR(50),
        PRIMARY KEY (id_Perawatan, disediakan_oleh, dimiliki_oleh),
        FOREIGN KEY (disediakan_oleh) REFERENCES PerusahaanPerawatan(id_PerusahaanPerawatan),
        FOREIGN KEY (dimiliki_oleh) REFERENCES Kendaraan(Model)
    )
    `

    await createTable("Perawatan", query)
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
    )`

    await createTable("Kendaraan", query)
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
    `

    await createTable("Motor", query)
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
    `

    await createTable("Mobil", query)
}

async function createTableDetail() {
    /**
    CREATE TABLE Detail (
        id_detail INT AUTO_INCREMENT,
        harga DECIMAL(10, 2),
        kuantitas INT,
        PRIMARY KEY (id_detail)
    );
     */
    const query = `
    CREATE TABLE Detail (
        id_detail INT AUTO_INCREMENT,
        harga DECIMAL(10, 2),
        kuantitas INT,
        PRIMARY KEY (id_detail)
    )
    `
    await createTable("Detail", query)
}

async function createTableDetailPeminjaman() {
    /**
    CREATE TABLE DetailPeminjaman (
        id_peminjaman INT,
        id_detail_peminjaman INT,
        model_kendaraan VARCHAR(50),
        PRIMARY KEY (id_peminjaman, id_detail_peminjaman, model_kendaraan),
        FOREIGN KEY (id_peminjaman) REFERENCES Peminjaman(id_peminjaman),
        FOREIGN KEY (id_detail_peminjaman) REFERENCES Detail(id_detail),
        FOREIGN KEY (model_kendaraan) REFERENCES Kendaraan(model)
    );
     */
    const query = `
    CREATE TABLE DetailPeminjaman (
        id_peminjaman INT,
        id_detail_peminjaman INT,
        model_kendaraan VARCHAR(50),
        PRIMARY KEY (id_peminjaman, id_detail_peminjaman, model_kendaraan),
        FOREIGN KEY (id_peminjaman) REFERENCES Peminjaman(id_peminjaman),
        FOREIGN KEY (id_detail_peminjaman) REFERENCES Detail(id_detail),
        FOREIGN KEY (model_kendaraan) REFERENCES Kendaraan(model)
    )
    `

    await createTable("DetailPeminjaman", query)
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
    `

    await createTable("Peminjaman", query)
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
    `

    await createTable("Klien", query)
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
    `
    await createTable("PeminjamanKlien", query)
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
        jabatan VARCHAR(50),
        PRIMARY KEY (id_pegawai),
        FOREIGN KEY (id_atasan) REFERENCES Pegawai(id_pegawai)  
    )`
    await createTable("Pegawai", query)
}


async function createTables() {
        // OK !
        createTablePerusahaan();

        // OK !
        // Needs perusahaan
        createTableKontakPerusahaan();
    
        // OK !
        // Needs Perusahaan
        createTablePerusahaanAsuransi();
    
        // OK !
        // Needs Perusahaan
        createTablePerusahaanPerawatan();
    
        // OK !
        createTableKendaraan();
    
        // 
        createTableAsuransi();
    
        //
        createTablePerawatan();
    
        createTableMobil();
    
        createTableMotor();
    
        createTableDetail();
    
        createTablePeminjaman();
    
        createTableDetailPeminjaman();
    
        createTableKlien();
    
        createTablePegawai();
    
        createTablePeminjamanKlien();
    
}


async function seedTablePerusahaan() {
    let Names = [];
    let Addresses = [];
  
    for (let i = 0; i < 30; i++) {
      let companyName;
      do {
        companyName = fakerID_ID.company.name();
      } while (Names.includes(companyName));
      Names.push(companyName);
      companyName = companyName.replace(/'/g, "''");
  
      let address;
      do {
        address = faker.location.streetAddress({ useFullAddress: true })
      } while (address.length > 255 || Addresses.includes(address));
      Addresses.push(address);
      address = address.replace(/'/g, "''");
  
      try {
        const query = `INSERT INTO Perusahaan (nama, alamat) VALUES (?, ?)`;
        const [rows, fields] = await connection.query(query, [companyName, address]);
        console.log(`Inserted ${companyName} into Perusahaan`);
      } catch (err) {
        console.error('Error inserting data:', err);
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
                console.error('Error inserting data:', error);
            }
            }
        }
    } catch (error) {
        console.error('Error selecting data:', error);
    }
}

async function seedTablePegawai() {
    const jabatanValues = ["Owner", "Manager", "Staff"];
    const names = [];
    const phoneNumbers = [];
    try {
        for (let i = 0; i < 50; i++) {
            let name;
            do {
                name = fakerID_ID.person.fullName();
            } while (names.includes(name));
            names.push(name);
            
            let phoneNumber;
            do {
                phoneNumber = fakerID_ID.person.phone();
            } while (phoneNumbers.includes(phoneNumber));
            phoneNumbers.push(phoneNumber);
        }
    const emails = faker.helpers.uniqueArray(faker.internet.email, names);

    } catch (error) {
      console.error('Error selecting data:', error);
    }
}

async function seedTablePerusahaanAsuransiAndPerusahaanPerawatan() {
    const queryGetIds = `SELECT id_perusahaan FROM Perusahaan`;
    try {
        const [rows, fields] = await connection.query(queryGetIds);
        for (let i = 0; i < rows.length; i++) {
            const id_perusahaan = rows[i].id_perusahaan;
            if (fakerID_ID.number.int({ min: 0, max: 1 }) === 0){
                const queryInsertAsuransi = `INSERT INTO PerusahaanAsuransi (id_PerusahaanAsuransi) VALUES (?)`;
                await connection.query(queryInsertAsuransi, [id_perusahaan]);
            } else {
                const queryInsertPerawatan = `INSERT INTO PerusahaanPerawatan (id_PerusahaanPerawatan, jumlah_teknisi) VALUES (?, ?)`;
                await connection.query(queryInsertPerawatan, [id_perusahaan, fakerID_ID.number.int({ min: 3, max: 15 })]);
            }

            console.log(`Inserted ${id_perusahaan} into PerusahaanAsuransi OR PerusahaanPerawatan`);
        }
    } catch  (err) {
        console.error('Error selecting data:', err);
    
    }
}

async function seedKendaraanAndItsSpecializations() {
    let motorSet = []
    let mobilSet = []

    for (let i = 0; i < 50; i++) {
        if (fakerID_ID.number.int({ min: 0, max: 1 }) === 0) {
            // Motor

            let currentMotor;
            do {
                currentMotor = motor[fakerID_ID.number.int({ min: 0, max: motor.length - 1 })];
            } while (motorSet.includes(currentMotor.model));
            motorSet.push(currentMotor.model);

            const queryInsertKendaraan = `INSERT INTO Kendaraan (model, tahun_keluaran, tipe_elektrik, jumlah_kendaraan) VALUES (?, ?, ?, ?)`;
            await connection.query(queryInsertKendaraan, [currentMotor.model, currentMotor.tahun_keluaran, currentMotor.tipe_elektrik ? 'Elektrik' : 'NonElektrik', currentMotor.jumlah_kendaraan]);

            const queryInsertMotor = `INSERT INTO Motor (model_motor, kapasitas_mesin) VALUES (?, ?)`;
            await connection.query(queryInsertMotor, [currentMotor.model, currentMotor.kapasitas_mesin]);
        } else {
            let currentModel;
            do {
                currentModel = faker.vehicle.model()
            } while (mobilSet.includes(currentModel));
            mobilSet.push(currentModel);

            let type = faker.vehicle.type();
            let carType;
            if (type.includes('SUV')) {
                carType = 'SUV';
            } else if (type.includes('Van') || type.includes('Minivan') || type.includes('van') || type.includes('minivan')) {
                carType = 'Van';
            } else {
                carType = 'Normal';
            }
                

            const currentMobil = {
                model: currentModel,
                tahun_keluaran: faker.number.int({ min: 2000, max: 2022 }),
                jumlah_kursi: faker.number.int({ min: 2, max: 8 }),
                kelas: carType,
                jumlah_kendaraan: faker.number.int({ min: 1, max: 100 }),
            }


            const queryInsertKendaraan = `INSERT INTO Kendaraan (model, tahun_keluaran, tipe_elektrik, jumlah_kendaraan) VALUES (?, ?, ?, ?)`;
            await connection.query(queryInsertKendaraan, [currentMobil.model, currentMobil.tahun_keluaran, currentMobil.tipe_elektrik ? 'Elektrik' : 'NonElektrik', currentMobil.jumlah_kendaraan]);

            const queryInsertMobil = `INSERT INTO Mobil (model_mobil, jumlah_kursi, kelas) VALUES (?, ?, ?)`;
            await connection.query(queryInsertMobil, [currentMobil.model, currentMobil.jumlah_kursi, currentMobil.kelas]);
        }
    }
}
  

async function seedTables() {
    
    await seedTablePerusahaan();
    
    await seedTableKontakPerusahaan(); 

    await seedTablePerusahaanAsuransiAndPerusahaanPerawatan();

    await seedKendaraanAndItsSpecializations();
}

/**
 * Run the seeding, by creating the tables and insert a bunch of data.
*/
async function main() {
    fakerID_ID.seed(100)




    try {
        /**
         * Create tables using the relation schema we have designed
         * @ref https://app.diagrams.net/#G1KGB53olz7TQHCSylU_IqyHBWQxJqYH9P#%7B%22pageId%22%3A%22pUiTZZOMAEUaQYOUVsJx%22%7D
         */
        await createTables();

        // Seed all the tables using faker.js
        await seedTables();

        await connection.end();
    } catch (err){
        console.error(err);
    }



}

main();