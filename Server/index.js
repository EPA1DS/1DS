import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import express from 'express';
import cors from 'cors';


const app = express();
const port = 8080;

app.use(cors({
  origin: 'https://epa-1-ds.vercel.app',
  methods: ['POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());


initializeApp({
  credential: cert(process.env.FIREBASE_CERT),
  storageBucket: "gs://epa-1ds.appspot.com"
})

const db = getFirestore();
const bucket = getStorage().bucket();


app.post('/cadastro/data', async (req, res) => {
  try{
    const data = req.body;
    var q = await db.collection('Usuarios').where("usuario", "==", data.usuario).get()
    if(q.empty){
      var ref = db.collection('Usuarios').doc();
      await ref.set({
        usuario: data.usuario,
        senha: data.senha,
        jogos: [],
        score: 0,
        maxVscore: [],
        maxMscore: [],
        maxFscore: []
      });
      res.status(201).send(ref.id);
    }
    else{
      res.sendStatus(403);
    }
  } catch(err) {
    res.sendStatus(500);
  }
    
    
});

app.post('/login/data', async (req, res) => {
  try{
    const data = req.body;
    var q = await db.collection('Usuarios').where("usuario", "==", data.usuario).get()
    if(!q.empty){
      q.forEach((doc) => {
        if(doc.data().senha === data.senha){
          res.status(200).send({ docID: doc.id });
          return;
        }
      })
    }
    res.sendStatus(404);
  } catch(err){
    res.status(500);
  }
})


app.post('/update/data', async (req, res) => {
  try {
    const data = req.body;
    var ref = db.collection('Usuarios').doc(data.docID);
    var q = await ref.get();
    if(!q.exists){
      res.sendStatus(404);
      return;
    }
    await ref.update(data.content);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
})

app.post('/loginID/data', async (req, res) => {
  try{
    const data = req.body;
    var ref = db.collection('Usuarios').doc(data.docID);
    var q = await ref.get();
    if(!q.exists){
      res.sendStatus(404);
      return;
    }
    res.status(200).send(q.data());
  } catch (err) {
    res.sendStatus(500);
  }
})

app.post('/delete/data', async (req, res) => {
  try{
    const data = req.body;
    var ref = db.collection('Usuarios').doc(data.docID);
    var q = await ref.get();
    if(!q.exists){
      res.sendStatus(404);
      return;
    }
    await ref.delete();
    res.sendStatus(200);
  }catch (err) {
    res.sendStatus(500);
  }
});

app.post("/updateScore/data", async (req, res) => {
  try{
    const data = req.body;
    var ref = db.collection('Usuarios').doc(data.docID);
    await ref.update(data.content);
    res.sendStatus(200);
  
  }catch(err){
    res.sendStatus(500);
  }
})

app.post("/ranking/data", async (req, res) => {
  try{
    var top6 = await db.collection('Usuarios').orderBy("score", "desc").limit(6).get();
    var safe = [];
    top6.forEach(doc => {
      safe.push({
        usuario: doc.data().usuario,
        score: doc.data().score
      });
    })
    res.status(200).send(safe);
  
  }catch(err){
    res.sendStatus(500);
  }
})

app.post('/visitantes/data', async(req, res) => {
  try{
    const [files] = await bucket.getFiles({ prefix: 'visitantes/' });
    const fileUrls = await Promise.all(files.map(async (file) => {
      const url = await file.getSignedUrl({ action: 'read', expires: Date.now() + 15 * 60 * 1000 });
      return {
          url: url[0] // Pega a URL gerada
      };
    }));

    res.status(200).send(fileUrls);

  }catch(err){
    res.sendStatus(500);
  }
});

app.post('/feedback/data', async (req, res) => {
  try{
    const data = req.body;
    await db.collection("Feedback").doc().set(data);
    res.sendStatus(200);
  }catch(err){
    res.sendStatus(500);
  }
});

export default app;

