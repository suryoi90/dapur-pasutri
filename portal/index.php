<?php
session_start();
if (empty($_SESSION['auth_user'])) {
    header('Location: login.php');
    exit;
}

$productsFile = __DIR__ . '/../data/products.json';
$products = file_exists($productsFile) ? json_decode(file_get_contents($productsFile), true) : [];
?>
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow">
<title>Admin Dashboard — Dapur Pasutri</title>
<link rel="stylesheet" href="css/admin.css">
<style>
  .admin-container { max-width: 980px; margin: 20px auto; }
  .product-table { width: 100%; border-collapse: collapse; margin-top: 24px; background: #fff; border-radius: 12px; overflow: hidden; border: 1px solid var(--border); }
  .product-table th, .product-table td { padding: 14px 18px; text-align: left; border-bottom: 1px solid var(--border); }
  .product-table th { background: #fdfaf5; font-size: 0.85rem; text-transform: uppercase; color: var(--oxblood); }
  .product-thumb { width: 48px; height: 48px; border-radius: 6px; object-fit: cover; }
  .top-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
</style>
</head>
<body>
  <div class="admin-container">
    <div class="top-bar">
      <div>
        <h1>Portal Team Dapur Pasutri</h1>
        <p style="color:var(--ink-soft)">Halo, <?= htmlspecialchars($_SESSION['auth_user']) ?>! Kelola menu dan harga produk.</p>
      </div>
      <div style="display:flex; gap:10px;">
        <a href="../" class="btn btn-ghost" style="margin-top:0;">&larr; Lihat Website</a>
        <a href="logout.php" class="btn btn-primary" style="width:auto; margin-top:0; background:#C1272D;">Keluar</a>
      </div>
    </div>

    <div class="card">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <h2>Daftar Produk Stick Kentang</h2>
        <span class="badge-tag"><?= count($products) ?> Produk Aktif</span>
      </div>

      <div style="overflow-x:auto;">
        <table class="product-table">
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nama Produk</th>
              <th>Kategori</th>
              <th>Harga</th>
              <th>Featured</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <?php foreach ($products as $p): ?>
              <tr>
                <td><img class="product-thumb" src="../<?= htmlspecialchars($p['image']) ?>" alt=""></td>
                <td>
                  <strong><?= htmlspecialchars($p['name']) ?></strong><br>
                  <small style="color:var(--ink-soft);"><?= htmlspecialchars(substr($p['desc'], 0, 60)) ?>...</small>
                </td>
                <td><span class="badge-tag"><?= htmlspecialchars($p['category']) ?></span></td>
                <td><strong>Rp <?= number_format($p['price'], 0, ',', '.') ?></strong></td>
                <td><?= $p['featured'] ? '⭐ Ya' : 'Tidak' ?></td>
                <td><span style="color:#2E6F40; font-weight:700;">● Aktif</span></td>
              </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</body>
</html>
