const express = require('express');
const router = express.Router();
let database = require('./static/public/db/users.json');
const fs = require('fs');
const path = require('path');
const {
  DataGameBiodata, DataGameHistory, DataUserGame
} = require('./models')

// Game Biodata
//GET all articles
router.post('/game-biodata', (req, res) => {
  const {
    umur,
    alamat,
    nickname
  } = req.body

  DataGameBiodata.create({
    umur,
    alamat,
    nickname,
  }).then(biodata => {
    res.status(200).json(biodata)
  })
})

router.patch('/game-biodata/:id', (req, res) => {
  const {
    umur,
    alamat,
    nickname
  } = req.body

  const { id } = req.params

  DataGameBiodata.update({
    umur,
    alamat,
    nickname,
  }, { where: { id } }).then(biodata => {
    res.status(200).json(biodata)
  })
})

router.get('/game-biodata/:id', (req, res) => {
  const { id } = req.params
  DataGameBiodata.findAll({ where: { id } }).then(biodata => {
    res.status(200).json(biodata)
  })
})

router.delete('/game-biodata/:id', (req, res) => {
  const { id } = req.params
  DataGameBiodata.destroy({ where: { id } }).then(biodata => {
    res.status(200).json(biodata)
  })
})


// User Game
//GET all articles
router.post('/user-game', (req, res) => {
  const {
    id,
    email,
    password
  } = req.body

  DataUserGame.create({
    id,
    email,
    password,
  }).then(biodata => {
    res.status(200).json(biodata)
  })
})

router.patch('/user-game/:id', (req, res) => {
  const {
    emaill,
    password
  } = req.body

  const { id } = req.params

  DataUserGame.update({
    email,
    password,
  }, { where: { id } }).then(biodata => {
    res.status(200).json(biodata)
  })
})

router.get('/user-game/:id', (req, res) => {
  const { id } = req.params
  DataUserGame.findAll({ where: { id } }).then(biodata => {
    res.status(200).json(biodata)
  })
})

router.delete('/user-game/:id', (req, res) => {
  const { id } = req.params
  DataUserGame.destroy({ where: { id } }).then(biodata => {
    res.status(200).json(biodata)
  })
})

router.get('/user-game/:id', (req, res) => {
  const { id } = req.params
  DataUserGame.findAll({ where: { id } }).then(user => {
    res.status(200).json(user)
  })
})

// Game Histrory
//GET all articles
router.post('/game-history', (req, res) => {
  const {
    id,
    win,
    lose
  } = req.body

  DataGameHistory.create({
    id,
    win,
    lose,
  }).then(history => {
    res.status(200).json(history)
  })
})

router.patch('/game-history/:id', (req, res) => {
  const {
    win,
    lose
  } = req.body

  const { id } = req.params

  DataGameHistory.update({
    id,
    win,
    lose,
  }, { where: { id } }).then(biodata => {
    res.status(200).json(biodata)
  })
})

router.get('/game-history/:id', (req, res) => {
  const { id } = req.params
  DataGameHistory.findAll({ where: { id } }).then(biodata => {
    res.status(200).json(biodata)
  })
})

router.delete('/game-history/:id', (req, res) => {
  const { id } = req.params
  DataGameHistory.destroy({ where: { id } }).then(biodata => {
    res.status(200).json(biodata)
  })
})

router.get('/game-history', (req, res) => {
  const { id } = req.params
  DataGameHistory.findAll({ where: { id } }).then(history => {
    res.status(200).json(history)
  })
})

router.get('/', (req, res) => {
  res.render('tampilan');
});

router.get('/game', (req, res) => {
  if (req.cookies.sudah_login) {
    res.render('game');
  } else {
    res.redirect('/login');
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

// pengecekan user di database
router.post('/login', (req, res) => {
  const {
    username,
    password
  } = req.body;
  const user = database.filter((user) => user.username === username && user.password === password)[0];

  if (user) {
    req.session.logedIn = user.username;
    res.cookie('sudah_login', true, {
      maxAge: 5000
    }); // maxAge = umur cookie
    res.json({
      message: 'login sukses'
    });
  } else {
    res.status(400).json({
      message: 'password atau username salah'
    });
  }
});

router.get('/register', (req, res) => {
  res.render('register');
});

function jsonOut(data) {
  fs.writeFileSync(path.resolve(__dirname, `./static/public/db/users.json`), JSON.stringify(data));
}

router.post('/register', (req, res) => {
  const {
    username,
    password
  } = req.body;

  if (!username || !password) {
    return res.json({
      message: 'username dan password belum disediakan'
    });
  }

  database.push({
    username,
    password,
  });

  jsonOut(database);

  res.json({
    message: 'berhasil register'
  });
});

router.get('/user', (req, res) => {
  res.send(database);
});

module.exports = router;