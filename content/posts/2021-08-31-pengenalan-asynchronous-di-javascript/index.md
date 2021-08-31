---
title: Pengenalan Asynchronous Di Javascript
author: Fahmi Achmad
date: 2021-08-31
hero: ./images/pexels-savvas-stavrinos-814544.jpg
excerpt: hampir semua programmer javascript pasti berurusan dengan asynchronous programming, apa itu?
---

Hampir semua programmer javascript pasti berurusan dengan proses asynchronous, apa itu?

### Synchronous

Pertama kita bahas synchronous terlebih dahulu. Synchronous adalah proses yang hasilnya bisa diketahui secara langsung. Contohnya seperti proses mendapatkan waktu saat ini.

```javascript
const currentTime = new Date();
console.log(currentTime);
// Mon Aug 30 2021 10:44:57 GMT+0700 (Western Indonesia Time)
```

### Asynchronous

Asynchronous atau biasa dipanggil async adalah proses yang hasilnya tidak bisa diketahui secara langsung. Contohnya seperti request http. Komputer tidak akan tahu hasilnya akan beres kapan dan sukses atau gagal. Async ini akan menjadi masalah ketika kita memprogramnya dengan kurang hati-hati.

```javascript
const employees = fetch("/employees");
const employeeRoles = getRoles(employees);
// Error
```

Program diatas bisa menjadi masalah. Jika hasil dari employees tidak segera diketahui hasilnya, fungsi getRoles akan menghasilkan error karena data yang akan diolah tidak tersedia.

### Callback Function

Dahulu kita biasannya menggunakan callback function untuk masalah seperti ini.

```javascript
const xhr = new XMLHttpRequest();
xhr.open("GET", "/employees", true);
xhr.onload = function(e) {
  // callback function
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      const employees = JSON.parse(xhr.responseText);
      const employeeRoles = getRoles(employee);
      console.log(employeeRoles);
      // ["CS", "HRD", "OB"]
    } else {
      console.error(xhr.statusText);
    }
  }
};
xhr.onerror = function(e) {
  // callback function
  console.error(xhr.statusText);
};
xhr.send(null);
```

Tetapi callback function ini jika disambung terus menerus akan menghasilkan program kita sulit untuk diubah atau _didebug_ (proses mencari error atau salah logika), masalah ini biasa dikenal sebagai callback hell.

### Promise

Solusi lanjutan dari callback ini adalah promise. Promise adalah wrapper untuk proses asynchronous. Lihat contoh berikut.

```javascript
// melakukan pembungkusan xhr dengan promise tidak disarankan karena ada fungsi fetch
// hanya untuk demonstasi
const employeesPromise = new Promise(function(resolve, reject) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/employees", true);
  xhr.onload = function(e) {
    // callback function
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        resolve(data); // panggil ketika proses berhasil
      } else {
        reject(xhr.statusText); // panggil ketika proses gagal
      }
    }
  };
  xhr.onerror = function(e) {
    // callback function
    reject(xhr.statusText);
  };
  xhr.send(null);
});

employeesPromise
  .then(function(employees) {
    const employeeRoles = getRoles(employees);
    return employeeRoles;
  })
  .then(function(employeeRoles) {
    // return other operation
  })
  .then(function(data) {
    // another
  })
  .catch(function(err) {
    console.log(err);
    // catch error
  });
```

Program diatas masih bisa dibuat lebih rapih lagi agar lebih mudah dibaca, diubah, dan _didebug_.

### Async/Await

Disinilah async await bersinar, masih sama seperti promise hanya saja dari segi penulisan async await ini lebih baik karena tidak terlalu jauh perbedaanya dengan synchronous.

```javascript
async function getEmployeeRoles() {
  try {
    // kali ini kita menggunakan fungsi bawaan untuk menangani http request dalam bentuk promise
    const employees = await fetch("/employees"); // await akan menunggu hasil fetch sebelum digunakan proses selanjutnya
    const employeeRoles = getRoles(employees);
    return employeeRoles;
  } catch (error) {
    console.log(error);
  }
}
// async function akan mengembalikan nilai dibalut objek Promise
// jadi syntax dibawah bisa digunakan jika diperlukan
getEmployeeRoles().then(function(employeeRoles) {
  console.log(employeeRoles);
});
// ["CS", "HRD", "OB"]
```

Selain lebih baik dari segi penulisan karena terlihat alami seperti proses synchronous, secara performa async await telah mendapat optimisasi pada nodeJS versi 8 keatas.

Sekian dari saya, semoga sedikit membantu teman-teman dalam berkenalan dengan asynchronous pada javascript :)

Artikel ini bersifat pengenalan, untuk mendalami saya sertakan link dibawah:

- https://v8.dev/blog/fast-async
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
- https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await
