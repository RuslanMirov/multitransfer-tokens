import ether from './helpers/ether';
import EVMRevert from './helpers/EVMRevert';
import {
  increaseTimeTo,
  duration
} from './helpers/increaseTime';
import latestTime from './helpers/latestTime';

const BigNumber = web3.BigNumber;

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

const Token = artifacts.require('Token');
const Sender = artifacts.require('Sender');


contract('Sale', function([_, wallet2, wallet3, wallet4, wallet5, wallet6, wallet7]) {

  beforeEach(async function() {
    // Token config
    this.name = "CoTrader";
    this.symbol = "COT";
    this.decimals = 18;
    // ether convert 10 000 000 000 COT to 10000000000000000000000000000 hex
    this.totalSupply = ether(10000000000);


    // Deploy Token
    this.token = await Token.new(
      this.name,
      this.symbol,
      this.decimals,
      this.totalSupply,
    );

    this.sender = await Sender.new();

    this.token.transfer(this.sender.address, ether(1000));
  });
  describe('Sender transfer', function() {
    it('Sender contract have deposit', async function() {
      const balance = await this.token.balanceOf(this.sender.address);
      balance.should.be.bignumber.equal(ether(1000));
    });

    it('Multi transfer work', async function() {
      await this.sender.setToken(this.token.address).should.be.fulfilled;
      await this.sender.distribute([wallet2, wallet3, wallet4], [ether(100), ether(100), ether(100)]).should.be.fulfilled;
    });

    it('balance reciver increase', async function() {
      const balanceBefore = await this.token.balanceOf(wallet2);
      await this.sender.setToken(this.token.address).should.be.fulfilled;
      await this.sender.distribute([wallet2, wallet3, wallet4], [ether(100), ether(100), ether(100)]).should.be.fulfilled;
      const balanceAfter = await this.token.balanceOf(wallet2);
      assert.isTrue(balanceAfter > balanceBefore);
    });

    it('balance sender reduce', async function() {
      const balanceBefore = await this.token.balanceOf(this.sender.address);
      await this.sender.setToken(this.token.address).should.be.fulfilled;
      await this.sender.distribute([wallet2, wallet3, wallet4], [ether(100), ether(100), ether(100)]).should.be.fulfilled;
      const balanceAfter = await this.token.balanceOf(this.sender.address);
      assert.isTrue(balanceBefore != balanceAfter);
    });
  });

  describe('Get tokens back', function() {
    it('NOT Owner can NOT get back tokens', async function() {
      await this.sender.setToken(this.token.address).should.be.fulfilled;
      await this.sender.getBackTokens(ether(1000), {
        from: wallet2
      }).should.be.rejectedWith(EVMRevert);
    });

    it('Owner can get back tokens', async function() {
      await this.sender.setToken(this.token.address).should.be.fulfilled;
      await this.sender.getBackTokens(ether(1000)).should.be.fulfilled;
    });
  });

  describe('Other', function() {
    it('NOT Owner can NOT setToken', async function() {
      await this.sender.setToken(this.token.address, {
        from: wallet2
      }).should.be.rejectedWith(EVMRevert);

    });

    it('Not Owner can NOT call distribute', async function() {
      await this.sender.setToken(this.token.address).should.be.fulfilled;
      await this.sender.distribute([wallet2, wallet3, wallet4], [ether(100), ether(100), ether(100)], {
        from: wallet2
      }).should.be.rejectedWith(EVMRevert);
    });
  });
});