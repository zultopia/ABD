const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'grbadmin',
  password: 'password',
  database: 'grb'
});

function createTable(tableName, query) {
    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log(`Table ${tableName} created.`);
    });
}


function createTableKontakPerusahaan() {
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

    createTable('KontakPerusahaan', query)
}

function createTablePerusahaan() {
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
    
    createTable("Perusahaan", query);
      
}


function createTablePerusahaanAsuransi() {
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
    createTable("PerusahaanAsuransi", query)
}

function createTablePerusahaanPerawatan() {
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
    createTable("PerusahaanPerawatan", query)
}

function createTableAsuransi() {
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
}

function createTablePerawatan() {
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
}

function createTableKendaraan() {
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

    createTable("Kendaraan", query)
}

function createTableMotor() {
    /**
    CREATE TABLE Motor (
        model_motor VARCHAR(50),
        kapasitas_mesin INT,
        PRIMARY KEY (model_motor),
        FOREIGN KEY (model_motor) REFERENCES Kendaraan(model)
    );
     */
}

function createTableMobil() {
    /**
    CREATE TABLE Mobil (
        model_mobil VARCHAR(50),
        jumlah_kursi INT,
        kelas ENUM('Normal', 'SUV', 'Van'),
        PRIMARY KEY (model_mobil),
        FOREIGN KEY (model_mobil) REFERENCES Kendaraan(model)
    );
     */
}

function createTableDetail() {
    /**
    CREATE TABLE Detail (
        id_detail INT AUTO_INCREMENT,
        harga DECIMAL(10, 2),
        kuantitas INT,
        PRIMARY KEY (id_detail)
    );
     */
}

function createTableDetailPeminjaman() {
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
}

function createTablePeminjaman() {
    /**
    CREATE TABLE Peminjaman (
        id_peminjaman INT AUTO_INCREMENT,
        status_peminjaman ENUM('returned', 'pending', 'rented'),
        tanggal_mulai DATE,
        tanggal_berakhir DATE,
        PRIMARY KEY (id_peminjaman)
    );
     */
}

function createTableKlien() {
    /**
    CREATE TABLE Klien (
        id_klien INT AUTO_INCREMENT,
        nama VARCHAR(255),
        email VARCHAR(255),
        nomor_telepon VARCHAR(20),
        PRIMARY KEY (id_klien)
    );
     */
}

function createTablePeminjamanKlien() {
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
}

function createTablePegawai() {
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
}




/**
 * Run the seeding, by creating the tables and insert a bunch of data.
 */
function main() {

    // Connection request to the database
    connection.connect((err) => {
        if (err) {
          console.log("Error when connecting to the database.");
          return;
        }
        console.log("Successfully connected to the database.");
    });
    

    /**
     * Create tables using the relation schema we have designed
     * @ref https://app.diagrams.net/#G1KGB53olz7TQHCSylU_IqyHBWQxJqYH9P#%7B%22pageId%22%3A%22pUiTZZOMAEUaQYOUVsJx%22%7D
     */

    // OK !
    createTablePerusahaan();

    // OK !
    createTableKontakPerusahaan();

    // OK !
    createTablePerusahaanAsuransi();

    // OK !
    createTablePerusahaanPerawatan();

    // OK !
    createTableKendaraan();






    // End the connection to the database
    connection.end((err) => {
        if (err) {
          console.log("Error when ending the connection.");
          return;
        }
        console.log("Successfully end the connection.");
    });

}

main();