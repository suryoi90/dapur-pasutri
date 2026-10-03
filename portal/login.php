<?php
session_start();
if (!empty($_SESSION['auth_user'])) {
    header('Location: index.php');
    exit;
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user = trim($_POST['username'] ?? '');
    $pass = trim($_POST['password'] ?? '');

    // Default admin credential
    if ($user === 'admin' && $pass === 'pasutri2026') {
        $_SESSION['auth_user'] = 'admin';
        header('Location: index.php');
        exit;
    } else {
        $error = 'Username atau password tidak sesuai.';
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow">
<title>Masuk Portal — Dapur Pasutri</title>
<link rel="stylesheet" href="css/admin.css">
</head>
<body>
  <div class="auth-shell">
    <div class="card">
      <h1>Portal Team</h1>
      <p style="color:var(--ink-soft)">Masuk untuk mengelola menu Dapur Pasutri.</p>

      <?php if (!empty($error)): ?>
        <div style="background:#fee2e2; color:#b91c1c; padding:10px; border-radius:6px; margin-top:12px; font-size:0.9rem;">
          <?= htmlspecialchars($error) ?>
        </div>
      <?php endif; ?>

      <form method="post" novalidate>
        <label for="username">Username</label>
        <input type="text" id="username" name="username" required autofocus autocomplete="username" placeholder="admin">

        <label for="password">Password</label>
        <input type="password" id="password" name="password" required autocomplete="current-password" placeholder="••••••••">

        <button type="submit" class="btn btn-primary">Masuk Portal</button>
      </form>

      <a class="btn btn-ghost" href="../">&larr; Kembali ke Halaman Utama</a>
    </div>
  </div>
</body>
</html>
