import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const SecuredStringVault = buildModule("SecuredStringVault", (m) => {
  const securedStringVault = m.contract("SecuredStringVault");

  return { securedStringVault };
});

export default SecuredStringVault;
