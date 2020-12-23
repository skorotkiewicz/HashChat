const bitcoin = require("bitcoinjs-lib");
const ec = require("elliptic").ec;
const sha256 = require("js-sha256");
const ripemd160 = require("ripemd160");
const base58 = require("bs58");
const crypto = require("crypto-browserify");

let Bitcoin = {};

// Generate the key and address
Bitcoin.createWalletAddress = (callback) => {
  let privateKey = Bitcoin.createPrivateKey();
  let { publicKey, publicKeyHash } = Bitcoin.generatePublicKeyHash(privateKey);
  let address = Bitcoin.createPublicAddress(publicKeyHash);
  callback({
    pubkey: publicKey,
    privkey: privateKey,
    address: address,
  });
};

// Create the private key
Bitcoin.createPrivateKey = () => {
  var keyPair = bitcoin.ECPair.makeRandom();
  let privateKey = keyPair.publicKey.toString("hex");
  return privateKey;
};

/**
 * Generate the public key hash
 *
 * @param {String} privateKey
 */
Bitcoin.generatePublicKeyHash = (privateKey) => {
  const ecdsa = new ec("secp256k1"),
    keys = ecdsa.keyFromPrivate(privateKey),
    publicKey = keys.getPublic("hex"),
    hash = sha256(Buffer.from(publicKey, "hex")),
    publicKeyHash = new ripemd160().update(Buffer.from(hash, "hex")).digest();

  return { publicKey, publicKeyHash };
};

/**
 * Create a public address based on the hash
 *
 * @param {String} publicKeyHash
 */
Bitcoin.createPublicAddress = (publicKeyHash) => {
  // step 1 - add prefix "00" in hex
  const step1 = Buffer.from("00" + publicKeyHash.toString("hex"), "hex");
  // step 2 - create SHA256 hash of step 1
  const step2 = sha256(step1);
  // step 3 - create SHA256 hash of step 2
  const step3 = sha256(Buffer.from(step2, "hex"));
  // step 4 - find the 1st byte of step 3 - save as "checksum"
  const checksum = step3.substring(0, 8);
  // step 5 - add step 1 + checksum
  const step4 = step1.toString("hex") + checksum;
  // return base 58 encoding of step 5
  const address = base58.encode(Buffer.from(step4, "hex"));
  return address;
};

/**
 * Encrypt message
 *
 * @param {String} publicKey
 * @param {String} privateKey
 * @param {Array} buf
 */

const encrypt = (publicKey, privateKey, buf) => {
  if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf);
  const ecdhA = crypto.createECDH("secp256k1");
  ecdhA.generateKeys("hex", "compressed");
  ecdhA.setPrivateKey(privateKey, "hex");
  const secret = ecdhA.computeSecret(publicKey, "hex");
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-ctr", secret, iv);
  const crypted = Buffer.concat([iv, cipher.update(buf), cipher.final()]);

  //
  const array = [].slice.call(crypted);

  return array;
  // return crypted;
};

/**
 * Decrypt message
 *
 * @param {String} publicKey
 * @param {String} privateKey
 * @param {Array} crypted
 */

const decrypt = (publicKey, privateKey, crypted) => {
  //   if (!Buffer.isBuffer(crypted)) throw new Error(`Must be a buffer!`);
  if (!Buffer.isBuffer(crypted)) crypted = Buffer.from(crypted);
  const ecdhB = crypto.createECDH("secp256k1");
  ecdhB.generateKeys("hex");
  ecdhB.setPrivateKey(privateKey, "hex");
  const secret = ecdhB.computeSecret(publicKey, "hex");
  const iv = crypted.slice(0, 16);
  const decipher = crypto.createCipheriv("aes-256-ctr", secret, iv);
  const buf = Buffer.concat([
    decipher.update(crypted.slice(16)),
    decipher.final(),
  ]);

  const string = new TextDecoder("utf-8").decode(buf);

  return string;
  // return buf;
};

module.exports = { Bitcoin, encrypt, decrypt };
