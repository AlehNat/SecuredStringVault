// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract SecuredStringVault {

  mapping(address => bytes) public publicKeys;
  mapping(address => string []) public userStrings;

  error PubKeyIsMissing();
  error VerificationFailed();
  error InvalidSignatureLength();

  // we need to store user's public key to verify the signature
  function savePublicKey(bytes memory publicKey) public {
    publicKeys[msg.sender] = publicKey;
  }

  function saveStrings(string [] memory strings, bytes calldata signature) public {
    bytes memory userPublicKey = publicKeys[msg.sender];
    if(userPublicKey.length == 0){
      revert PubKeyIsMissing();
    }
    if(signature.length != 64){
      revert InvalidSignatureLength();
    }

    // hash calculations: we concatenate all strings and hash the result
    string memory concatenatedStrings = "";
    for (uint i = 0; i < strings.length; i++) {
      concatenatedStrings = string(abi.encodePacked(concatenatedStrings, strings[i]));
    }

    bytes32 hash = keccak256(abi.encodePacked(concatenatedStrings));
    bytes memory data = abi.encodePacked(userPublicKey, signature, hash);

    // use custom precompile contract to verify the schnorr signature
    (bool ok, bytes memory out) = address(0x000000000000000000000000000000000000000A).staticcall(data);

    if(!ok){
      revert VerificationFailed();
    }

    bytes32 verificationResult = abi.decode(out, (bytes32));

    if(verificationResult == bytes32(0x0000000000000000000000000000000000000000000000000000000000000001)){
      // if verification successful, store the strings
      for (uint i = 0; i < strings.length; i++) {
        userStrings[msg.sender].push(strings[i]);
      }
    }else{
      revert VerificationFailed();
    }
  }
}

