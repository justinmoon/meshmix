var bitcoin = require('bitcoinjs-lib');

module.exports = {
  joinTxFromWallet: function(templateTx) {
    // TODO: Validate transaction
    //   * All inputs segwit
    //   * All inputs signed
    // Select unspent output to join with
    joinUtxo = null;
    // TODO: return the same output for the same inputs
    //   (to protect against )
    return joinTx(templateTx, joinUtxo, joinKeypair);
  },

  /**
   *  @param templateTx a signed bitcoinjs-lib Transaction object
   *  @return a partially-signed Pay-Joined Transaction
   */
  joinTx: function(templateTx, joinUtxo, joinKeypair) {
    // Create a PSBT to receive the data
    var partiallySigned = new bitcoin.Psbt();
    partiallySigned.addOutputs(templateTx.outs);
    partiallySigned.addInputs(templateTx.ins);
    // Join Transaction and return partially-signed transaction
    // index will point to the last input
    var inputIndex = templateTx.ins.length;
    partiallySigned.addInput({
      hash: joinUtxo.hash,
      index: joinUtxo.index
    });
    // Sign only the added input
    partiallySigned.signInput(inputIndex, joinKeypair);
    if (/* any output owned by joinKeypair */) {
      // increase the payout to the existing join output
    } else {
      // add a new output to receive the input value
      throw new Error("Non payjoin joins are not supported");
    }
    // Return partially-signed transaction hex-encoded string
    return partiallySigned.psbt;
  }
};
