import {FirebaseFirestore} from "@firebase/firestore-types";
import {MarketplaceEntry, MarketplaceNeed, MarketplaceProvider} from "../../core/models/marketplace/marketplace";
import {UpdateNeed} from "../../core/models/marketplace/update.need";
import {UpdateProvision} from "../../core/models/marketplace/update.provision";
import * as firebase from "firebase";
import DocumentReference = firebase.firestore.DocumentReference;
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;

export {};
const express = require('express');
const router = express.Router();

router.get('/list', (((req: any, res: any, next: any) => {
    const firestore = req.firestore;
    console.log("here i am!");
    firestore.collection("marketplace")
        .limit(100000000)
        .then((ref: DocumentSnapshot[]) => {
            let entries = ref.map((r: DocumentSnapshot) => <MarketplaceEntry>{
                foodName: r.get("foodName"),
                needs: r.get("needs"),
                providers: r.get("providers")
            });

            res.status(200).send(entries);
            next();
        });
})));

router.post('/update/need', ((req: any, res: any, next: any) => {
    const firestore: FirebaseFirestore = req.firestore;
    const body: UpdateNeed = req.body;

    firestore.collection('marketplace')
        .where("foodName", "==", body.foodName)
        .limit(1)
        .get()
        .then(result => {
            if (result.size == 0) {
                var entry: MarketplaceEntry = {
                    foodName: body.foodName,
                    needs: [{
                        username: req.user.username,
                        quantity: body.newQuantity
                    }],
                    providers: []
                };

                // Create the entry
                firestore.collection("marketplace").add(entry).then(ref => {
                    if (ref) {
                        res.sendStatus(201);
                        next();
                    } else {
                        res.sendStatus(500);
                        next();
                    }
                });
            } else {
                const oldNeeds: MarketplaceNeed[] = result.docs[0].get('needs');
                const usersEntry = oldNeeds.find((need) => need.username = req.user.username);
                if (usersEntry) {
                    usersEntry.quantity = body.newQuantity;
                } else {
                    oldNeeds.push({username: req.user.username, quantity: body.newQuantity});
                }
                result.docs[0].ref.update("needs", oldNeeds).then(() => {
                    res.sendStatus(200);
                    next();
                })
            }
        });
}));

router.post('/update/provision', ((req: any, res: any, next: any) => {
    console.log("here!");
    const firestore: FirebaseFirestore = req.firestore;
    const body: UpdateProvision = req.body;

    firestore.collection('marketplace')
        .where("foodName", "==", body.foodName)
        .limit(1)
        .get()
        .then(result => {
            if (result.size == 0) {
                var entry: MarketplaceEntry = {
                    foodName: body.foodName,
                    providers: [{
                        username: req.user.username,
                        quantity: body.newQuantity
                    }],
                    needs: []
                };

                // Create the entry
                firestore.collection("marketplace").add(entry).then(ref => {
                    if (ref) {
                        res.sendStatus(201);
                        next();
                    } else {
                        res.sendStatus(500);
                        next();
                    }
                });
            } else {
                const oldProviders: MarketplaceProvider[] = result.docs[0].get('providers');
                const usersEntry = oldProviders.find((need) => need.username = "test");
                if (usersEntry) {
                    usersEntry.quantity = body.newQuantity;
                } else {
                    oldProviders.push({username: req.user.username, quantity: body.newQuantity});
                }
                result.docs[0].ref.update("providers", oldProviders).then(() => {
                    res.sendStatus(200);
                    next();
                })
            }
        });
}));

module.exports = router;
