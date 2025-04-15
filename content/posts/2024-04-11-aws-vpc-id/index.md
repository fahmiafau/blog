---
title: Setup VPC dan Network di AWS [ID]
author: Fahmi Achmad
date: 2024-04-11
hero: ./images/bruno-figueiredo-RBnP_OdmTeE-unsplash.jpg
excerpt: penasaran gimana sih cara bikin virtual private cloud di AWS? yuk kita belajar cara bikinya pake terraform.
---

Sebelum menyelami lebih jauh tentang kubernetes dan menjalankan apapun di dalam cloud computing AWS, kita perlu tahu terlebih dulu cara komputer dan service lain berkomunikasi satu sama lain. Cara yang paling umum dan cepat untuk komputer berkomunikasi satu dengan yang lain adalah dengan jaringan. VPC (virtual private cloud) tidak jauh berbeda dengan jaringan lokal yang bisa kita setup di rumah, bedanya kita berusaha membuatnya secara virtual di cloud.

Kemudian untuk mempermudah pekerjaan kita, kita akan mencoba melakukan setup jaringan ini menggunakan Terraform. Terraform merupakan salah satu teknologi yang biasa digunakan untuk melakukan pembuatan infrastructure melalui code. Contoh, daripada kita melakukan setup manual menggunakan website interface milik AWS (dengan cara mengisi form dan klik sana sini) lebih baik kita mengetik dan merangkai code. Inilah yang disebut Iac (infrastructure as code). Selain lebih mudah digunakan, tentu banyak juga keunggulan teknologi ini, saya tidak akan membahasnya satu per satu di sini karena akan sangat melenceng dari topik pembahasan kita kali ini, tapi jika butuh penjelasan lebih jauh dan mendalam, silahkan beritahu saya ya :D

Agar lebih mudah membayangkan bentuk jaringan yang akan kita setup, berikut saya gambarkan topologinya:

<div className="Image__Small">
  <img
    src="./images/vpc-topology.png"
    title="Edtree VPC Topology"
    alt="edtree-vpc-topology"
  />
</div>

Jika kalian sulit melihatnya, saya bantu jelaskan.
Jumlah AZ (availablity zone) setiap region di aws itu berbeda-beda, untuk yang kita gunakan kali ini memiliki 3, yaitu: ap-southeast-1a, ap-southeast-1b, ap-southeast-1c. Cara memahami AZ, bayangkan dalam 1 daerah data center terdapat 3 gedung dan kita berusaha menyatukan setiap gedung dalam 1 jaringan yang sama agar bisa saling berkomunikasi. Kemudian di setiap AZ dibagi menjadi 2 subnet dengan format IP CIDR, sekilas tentang IP CIDR ini adalah salah satu cara mendefinisikan ip range yang dialokasikan di tiap subnet. contoh, 10.99.0.0/19 = 10.99.0.1 - 10.99.31.254, karena IPV4 terdiri dari 32 bit, “/19” pada penulisan CIDR berarti 19 bit pertama akan digunakan sebagai prefix ip. Jika penjelasan saya masih membingungkan, silahkan untuk berkunjung ke web ini https://cidr.xyz/ . Sebenarnya untuk pembagian ip di subnet ini bebas, sesuaikan dengan kebutuhan, tapi dalam kasus ini saya bagi menjadi 2 untuk private subnet dan public subnet pada tiap AZ. Kemudian agar lebih mudah, saya akan jelaskan sambil melihat codenya di terraform.

Pertama buatlah sebuah folder, namanya bebas, tapi di sini saya menggunakan "terraform". Kemudian buatlah file dengan nama "0-provider.tf", isikan syntax berikut

```terraform
terraform {
  required_version = "~> 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region  = "ap-southeast-1"
  profile = "XXXXXXXX"
}

```

Penjelasan, di sini kita mendefinisikan requirement kita dan provider apa saja yang digunakan. untuk penjelasan attribute apa saja yang bisa digunakan pada provider aws, kalian bisa langsung kunjungi dokumentasinya di https://registry.terraform.io/providers/hashicorp/aws/latest/docs .

Kemudian buatlah file dengan nama "variables.tfvars", isikan syntax berikut

```terraform
variable "cluster_name" {
  default = "edtree"
}
```

Penjelasan, file ini berisikan berbagai variable yang akan kita gunakan nanti di definisi resources di terraform.

Kemudian buatlah file dengan nama "1-vpc.tf", isikan syntax berikut

```terraform
resource "aws_vpc" "edtree-vpc" {
  cidr_block = "10.99.0.0/16"

  # Must be enabled for EFS
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "${var.cluster_name}-vpc"
  }
}
```

Penjelasan, di sinilah cara kita mendefinisikan sebuah resource di AWS menggunakan provider yang sudah kita definisikan di file "0-provider.tf". Di sini kita menintruksikan terraform untuk membuat sebuah resource aws_vpc dengan nama "edtree-vpc", lalu ada tags, tags ini yang nantinya akan dijadikan nama pada vpc kita. Untuk nama yang diberikan setelah pemanggilan resource, contoh resource "aws_vpc" "xxxx" xxxx ini nanti bisa dipanggil ulang pada pembuatan resource lain.

Lalu buatlah file baru dengan nama "2-igw.tf", kemudian masukan syntax berikut

```terraform
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.edtree-vpc.id

  tags = {
    Name = "igw"
  }
}
```

Penjelasan, igw (internet gateway) seperti namanya, resource ini bertujuan agar service kita bisa diakses dari internet atau luar VPC kita.

Kemudian buatlah file dengan nama "3-subnets.tf", masukan syntax berikut

```terraform
resource "aws_subnet" "private-ap-southeast-1a" {
  vpc_id            = aws_vpc.edtree-vpc.id
  cidr_block        = "10.99.0.0/19"
  availability_zone = "ap-southeast-1a"

  tags = {
    "Name"                                      = "private-ap-southeast-1a"
    "kubernetes.io/role/internal-elb"           = "1"
    "clusterName"                               = var.cluster_name
    "kubernetes.io/cluster/${var.cluster_name}" = "owned"
  }
}

resource "aws_subnet" "private-ap-southeast-1b" {
  vpc_id            = aws_vpc.edtree-vpc.id
  cidr_block        = "10.99.32.0/19"
  availability_zone = "ap-southeast-1b"

  tags = {
    "Name"                                      = "private-ap-southeast-1b"
    "kubernetes.io/role/internal-elb"           = "1"
    "clusterName"                               = var.cluster_name
    "kubernetes.io/cluster/${var.cluster_name}" = "owned"
  }
}

resource "aws_subnet" "private-ap-southeast-1c" {
  vpc_id            = aws_vpc.edtree-vpc.id
  cidr_block        = "10.99.64.0/19"
  availability_zone = "ap-southeast-1c"

  tags = {
    "Name"                                      = "private-ap-southeast-1c"
    "kubernetes.io/role/internal-elb"           = "1"
    "clusterName"                               = var.cluster_name
    "kubernetes.io/cluster/${var.cluster_name}" = "owned"
  }
}

resource "aws_subnet" "public-ap-southeast-1a" {
  vpc_id                  = aws_vpc.edtree-vpc.id
  cidr_block              = "10.99.96.0/19"
  availability_zone       = "ap-southeast-1a"
  map_public_ip_on_launch = true

  tags = {
    "Name"                                      = "public-ap-southeast-1a"
    "kubernetes.io/role/elb"                    = "1"
    "clusterName"                               = var.cluster_name
    "kubernetes.io/cluster/${var.cluster_name}" = "owned"
  }
}

resource "aws_subnet" "public-ap-southeast-1b" {
  vpc_id                  = aws_vpc.edtree-vpc.id
  cidr_block              = "10.99.128.0/19"
  availability_zone       = "ap-southeast-1b"
  map_public_ip_on_launch = true

  tags = {
    "Name"                                      = "public-ap-southeast-1b"
    "kubernetes.io/role/elb"                    = "1"
    "clusterName"                               = var.cluster_name
    "kubernetes.io/cluster/${var.cluster_name}" = "owned"
  }
}

resource "aws_subnet" "public-ap-southeast-1c" {
  vpc_id                  = aws_vpc.edtree-vpc.id
  cidr_block              = "10.99.160.0/19"
  availability_zone       = "ap-southeast-1c"
  map_public_ip_on_launch = true

  tags = {
    "Name"                                      = "public-ap-southeast-1c"
    "kubernetes.io/role/elb"                    = "1"
    "clusterName"                               = var.cluster_name
    "kubernetes.io/cluster/${var.cluster_name}" = "owned"
  }
}
```

Penjelasan, di sini kita membuat resource subnet di setiap AZ, setiap AZ terdiri dari 2 tipe subnet, 1 untuk private network dan 1 lagi untuk public network. Untuk tags, tidak perlu terlalu dipusingkan, itu hanya requirement untuk aws ALB (amazon load balancer) dan EKS (elastic kubernetes service).

Kemudian buatlah file dengan nama "4-nat.tf", lalu masukan syntax berikut

```terraform
resource "aws_eip" "nat" {
  domain = "vpc"

  tags = {
    Name = "nat"
  }
}

resource "aws_nat_gateway" "nat" {
  allocation_id = aws_eip.nat.id
  subnet_id     = aws_subnet.public-ap-southeast-1a.id

  tags = {
    Name = "nat"
  }

  depends_on = [aws_internet_gateway.igw]
}
```

Penjelasan, syntax di atas bertujuan untuk membuat resource eip (elastic ip) yang kemudian dihubungkan dengan nat gateway. Nat gateway bertujuan agar service yang berjalan di private subnet bisa mengakses internet tetapi tidak bisa diakses dari internet.

Lalu buatlah sebuah file bernama "5-routes.tf", kemudian masukan syntax berikut

```terraform
resource "aws_route_table" "private" {
  vpc_id = aws_vpc.edtree-vpc.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat.id
  }

  tags = {
    Name = "private"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.edtree-vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "public"
  }
}

resource "aws_route_table_association" "private-ap-southeast-1a" {
  subnet_id      = aws_subnet.private-ap-southeast-1a.id
  route_table_id = aws_route_table.private.id
}

resource "aws_route_table_association" "private-ap-southeast-1b" {
  subnet_id      = aws_subnet.private-ap-southeast-1b.id
  route_table_id = aws_route_table.private.id
}

resource "aws_route_table_association" "private-ap-southeast-1c" {
  subnet_id      = aws_subnet.private-ap-southeast-1c.id
  route_table_id = aws_route_table.private.id
}

resource "aws_route_table_association" "public-ap-southeast-1a" {
  subnet_id      = aws_subnet.public-ap-southeast-1a.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "public-ap-southeast-1b" {
  subnet_id      = aws_subnet.public-ap-southeast-1b.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "public-ap-southeast-1c" {
  subnet_id      = aws_subnet.public-ap-southeast-1c.id
  route_table_id = aws_route_table.public.id
}
```

Penjelasan, kita membuat resource route table. Route table berfungsi untuk menghubungkan subnet yang sudah kita buat barusan dengan:

1. Internet gateway jika subnet tersebut public (bisa diakses dari luar VPC/Internet)
2. Nat gateway jika subnet tersebut private (bisa mengakses ke luar VPC/Internet tetapi tidak dapat diakses dari internet)

Lalu, kalian bisa coba jalankan perintah "terraform plan" perintah tersebut akan menampilkan output berupa resource apa saja yang akan ditambahkan pada aws cloud.
Setelah yakin, kalian bisa jalankan "terraform apply" lalu tunggu hingga prosesnya selesai, dan taraa.. vpc kita sudah siap digunakan. Kemudian jika ingin menghilangkan reourcenya, silahkan jalankan perintah "terraform destroy", canggih bukan terraform?. Sekian artikel kita kali ini, nanti jika ada waktu senggang kita akan coba menyelami kubernetes dan teknologi lain.
