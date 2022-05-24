const { Client,
    PrivateKey,
    AccountCreateTransaction,
    AccountInfoQuery,
    TransferTransaction,
    Hbar,
    FileCreateTransaction,
    FileContentsQuery,
    Status
 } = require("@hashgraph/sdk");
 require("dotenv").config();

const checkProvided = (environmentVariable)=> {
    if (environmentVariable === null) {
      return false;
    }
    if (typeof environmentVariable === "undefined") {
      return false;
    }
    return true;
}

const hederaClientForUser= (account)=>{
    //   const account = getAccountDetails(user);
      return hederaClientLocal(account.accountId, account.privateKey);
}

  // console.log(process.env.MY_ACCOUNT_ID)
const hederaClient =async () =>{

      const operatorPrivateKey = process.env.MY_PRIVATE_KEY;
      const operatorAccount = process.env.MY_ACCOUNT_ID;
      if (!checkProvided(operatorPrivateKey) || !checkProvided(operatorAccount)) {
        throw new Error(
          "environment variables APP_OPERATOR_KEY and APP_OPERATOR_ID must be present"
        );
      }
      return hederaClientLocal(operatorAccount, operatorPrivateKey);
    }
    
    const hederaClientLocal = async (operatorAccount, operatorPrivateKey)=> {
      try{
      if (!checkProvided(process.env.NETWORK)) {
        throw new Error("APP_NETWORK_NODES must be set in .env");
      }
    
      // const network = {};
      // network[process.env.NETWORK] = "0.0.3";
      // const client = Client.forNetwork(network);
      if (process.env.hederaNet == "mainnet" ){
        client = Client.forMainnet()
      }else{
        client = Client.forTestnet()
      }
      client.setOperator(operatorAccount, operatorPrivateKey);
      return client;
    }catch(e){
      // console.log(e)
      return {
        status: false,
        error:e
      };
    }
    }
    
    // ----------------------
      
const accountCreate = async (wallet) => {
        try{
        const client = await hederaClient();
        const privateKey = await PrivateKey.generate();
        console.log(privateKey.publicKey.toString())
        const response = await new AccountCreateTransaction()
          .setKey(privateKey.publicKey)
          .setMaxTransactionFee(new Hbar(1))
          .setInitialBalance(new Hbar(parseInt(process.env.ACCOUNT_INITIAL_BALANCE)))
          .execute(client);
        const transactionReceipt = await response.getReceipt(client);
        if (transactionReceipt.status !== Status.Success) {
          return {
            status: false,
            error:"Unable to transfer Tokens"
          };
        } 
        const newAccountId = transactionReceipt.accountId;
      
        const transaction = {
          id: response.transactionId.toString(),
          type: "cryptoCreate",
          inputs: "initialBalance=" + process.env.ACCOUNT_INITIAL_BALANCE,
          outputs: "accountId=" + newAccountId.toString()
        };
        return {
          status: true,
          newAccountId: newAccountId.toString(),
          privateKey: privateKey.toString(),
        };
      }catch(e){
        // console.log(e)
        return {
          status: false,
          error:e
        };
      }

    }
    
    
const accountGetInfo=async (accountId)=> {
        const client =await hederaClient();
        try {
          // cycle token relationships
          let tokenInfo = {};
          const info = await new AccountInfoQuery()
            // .setM(new Hbar(1))
            .setAccountId(accountId)
            .execute(client);


          
          const hBarBalance = info.balance;
          for (let key of info.tokenRelationships.keys()) {
            const token = {
              tokenId: key.toString(),
              balance: info.tokenRelationships.get(key).balance.toString(),
              freezeStatus: info.tokenRelationships.get(key).isFrozen,
              kycStatus: info.tokenRelationships.get(key).isKycGranted
            };
            tokenInfo[key] = token;
          }

          console.log( {
            publicKey:info.key.toString(),
            hbarBalance:hBarBalance.toString(),
            tokenInfo
          })
          return {
            status:true,
            publicKey:info.key.toString(),
            hbarBalance:hBarBalance.toString(),
            tokenInfo
          };
      } catch (err) {
        // console.log(err)
        return{
          status:false,
          error:err.message
        }
      }
    }
    // accountGetInfo("0.0.295981")
    accountGetInfo(process.env.MY_ACCOUNT_ID)


    const tokenTransfer = async (
      account, //giver
      hbar,
      destination
    ) => {
    
      const client = await hederaClientForUser(account);
      try {
        const tx = await new TransferTransaction();
          // token recipient pays in hBar and signs transaction
          
          tx.addHbarTransfer(destination.accountId, new Hbar(hbar));
          tx.addHbarTransfer(account.accountId, new Hbar(-hbar));
          tx.setMaxTransactionFee(new Hbar(1))
          tx.freezeWith(client);
          const sigKey = await PrivateKey.fromString( destination.privateKey );
          await tx.sign(sigKey);
    
        const result = await tx.execute(client);
        const transactionReceipt = await result.getReceipt(client);
          
        if (transactionReceipt.status !== Status.Success) {
          return {
            status: false,
            error:"Unable to transfer Tokens"
          };
        } else {
          const transactionAfterInfo = await new AccountInfoQuery()
            .setAccountId(account.accountId)
            .execute(client);
            // const afterhBarBalance = parseFloat(transactionAfterInfo.balance.toString().split(" ")[0]);
          const transaction = {
            status: true,
            // token: afterhBarBalance*100,
            id: result.transactionId.toString(),
            message: "from=" + account.accountId + ", to=" + destination.accountId + ", amount=" + hbar*100
          };
          return transaction
        }
      } catch (err) {
          return {
          status: false,
          error:err.message
        };;
      }
    }

 
    
    

  module.exports =   {
    hederaClient,
    hederaClientForUser,
    accountCreate,
    accountGetInfo,
    tokenTransfer
  }

