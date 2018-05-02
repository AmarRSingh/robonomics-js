import Web3 from 'web3'
import IPFS from 'ipfs'
import Robonomics, { Provider } from 'robonomics-js'

const privateKey = '123321321'
const config = {
  repo: 'ipfs-repo/robonomics-js/simple',
  EXPERIMENTAL: {
    pubsub: true,
  }
}

const robonomics = new Robonomics({
  web3: new Web3(new Web3.providers.HttpProvider('http://localhost:8545')),
  provider: new Provider(new IPFS(config))
})

const app = () => {
  robonomics.factory.getLighthouses()
    .then((r) => {
      const chanel = robonomics.chanel(r[0])

      console.log('chanel', chanel.name);

      chanel.asks(msg => {
        console.log('new ask', msg)
        const acc = msg.recover()
        console.log('acc', acc);
      })

      chanel.bids(msg => {
        console.log('new bid', msg)
        const acc = msg.recover()
        console.log('acc', acc);
      })

      const message = robonomics.message();
      const ask = message.create({
        model: 'QmfCcLKrTCuXsf6bHbVupVv4zsbs6kjqTQ7DRftGqMLjdW',
        objective: 'Qmbdan31EbgETmJU79shwQDHcMgNoRS6RMGDNJZNp8FLCS',
        token: robonomics.address.xrt,
        cost: 1,
        count: 1,
        validator: '0x0000000000000000000000000000000000000000',
        validatorFee: 0,
        deadline: 45646546,
      });
      message.sign(privateKey, ask)
        .then(() => chanel.push(ask));
    })
}

robonomics.ready().then(() => app())
