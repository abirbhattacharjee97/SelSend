// import * as solanaWeb3 from "https://unpkg.com/@solana/solanaWeb3.js@latest/lib/index.iife.js";

// const solanaWeb3 = require('@solana/web3.js');

// Creating a connection with devnet solana

import { Buffer } from 'buffer';

const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("devnet"), "confirmed");


const transferSolana = async () => {
    console.log(`Send Transaction started`);      
    const fromPublicKeyString = document.getElementById('payer-key').value;
    const toPublicKeyString = document.getElementById('payee-key').value;
    const solAmount = document.getElementById('amount').value;

    const fromPublicKey = new solanaWeb3.PublicKey(fromPublicKeyString);
    const toPublicKey = new solanaWeb3.PublicKey(toPublicKeyString);
    const transaction = new solanaWeb3.Transaction().add(
        solanaWeb3.SystemProgram.transfer({
            fromPubkey: fromPublicKey,
            toPubkey: toPublicKey,
            lamports: solanaWeb3.LAMPORTS_PER_SOL * solAmount,
        }),
    );

    try {
        const signature = await solanaWeb3.sendAndConfirmTransaction(
            connection,
            transaction,
            [new solanaWeb3.Account()],
            { commitment: 'confirmed' },
        );
        console.log(`https://explorer.solana.com/tx/${signature}?cluster=devnet`);
    } catch (err) {
        console.log(err);
    }
};

try{
    document.getElementById('submit-button').addEventListener('click', transferSolana)
}
catch(err){
    console.log(err);
}
