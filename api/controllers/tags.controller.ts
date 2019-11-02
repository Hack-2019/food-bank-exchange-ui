import {FirebaseFirestore} from "@firebase/firestore-types";
import {FoodTag} from "../../core/models/food.tag"

export {};
const express = require('express');
const router = express.Router();

router.get('/add', (((req: any, res: any, next: any) => {
    const firestore: FirebaseFirestore = req.firestore;
    firestore.collection('tags')
        .add(req.body)
        .then(ref => {
                if (ref) {
                    res.status(200).send(ref);
                } else {
                    res.sendStatus(500);
                }

                next();
            }
        );
})));

router.get('/list', ((req: any, res: any, next: any) => {
    const firestore: FirebaseFirestore = req.firestore;
    firestore.collection('tags')
        .limit(1000)
        .get()
        .then(result => {
            res.status(200).send(result.docs.map(doc => new FoodTag(doc.get("name"))))
        });
}));

module.exports = router;
