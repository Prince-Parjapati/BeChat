import { ethers } from "ethers";
import Web3Modal from "web3modal";
import axios from "axios";

import socialMediaDapp from "./SocialMediaDapp.json";

export const CONTRACT_ABI = socialMediaDapp.abi;
export const CONTRACT_ADDRESS = "0x06A7b974E64b703A299a03DA827d64EB3CfD9921";

//PINATA KEYS
export const PINATA_API_KEY = "3106b4ffae6483cf0205";
export const PINATA_SECRECT_KEY = "d065b08d28936073a1423f32d596a56e4a8508fc93881acac788fdacb7286aea";

//NETWORK
const networks = {
  base_sepolia: {
        chainId: `0x${Number(84532).toString(16)}`, // Base Sepolia Testnet
        chainName: "Base Sepolia",
        nativeCurrency: {
          name: "Ethereum",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://sepolia.base.org"],
        blockExplorerUrls: ["https://sepolia.etherscan.io"], // Corrected URL
      },
  
  localhost: {
    chainId: `0x${Number(31337).toString(16)}`,
    chainName: "localhost",
    nativeCurrency: {
      name: "GO",
      symbol: "GO",
      decimals: 18,
    },
    rpcUrls: ["http://127.0.0.1:8545/"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
};

const changeNetwork = async ({ networkName }) => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          ...networks[networkName],
        },
      ],
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const handleNetworkSwitch = async () => {
  const networkName = "polygon_amoy";
  await changeNetwork({ networkName });
};

export const checkIfWalletConnected = async () => {
  if (!window.ethereum) return console.log("Please Install MetaMask");
  const network = await handleNetworkSwitch();

  const account = await window.ethereum.request({ method: "eth_accounts" });

  if (account.length) {
    return account[0];
  } else {
    console.log("Please Install MetaMask & Connect, Reload");
  }
};

export const connectWallet = async () => {
  try {
    if (!window.ethereum) return alert("Please install MetaMask");
    const network = await handleNetworkSwitch();
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    return accounts[0];
  } catch (error) {
    console.log(error);
  }
};



// import { ethers } from "ethers";
// import Web3Modal from "web3modal";
// import axios from "axios";
// import socialMediaDapp from "./SocialMediaDapp.json";

// // Smart Contract
// export const CONTRACT_ABI = socialMediaDapp.abi;
// export const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// // Pinata API Keys (ensure to store these securely in .env files for production)
// export const PINATA_API_KEY = "3106b4ffae6483cf0205";
// export const PINATA_SECRECT_KEY = "d065b08d28936073a1423f32d596a56e4a8508fc93881acac788fdacb7286aea";

// // Network configurations
// const networks = {
//   // sepolia: {
//   //   chainId: `0x${Number(11155111).toString(16)}`, // Sepolia Testnet
//   //   chainName: "Sepolia",
//   //   nativeCurrency: {
//   //     name: "Ethereum",
//   //     symbol: "ETH",
//   //     decimals: 18,
//   //   },
//   //   rpcUrls: ["https://rpc.sepolia.org"],
//   //   blockExplorerUrls: ["https://sepolia.etherscan.io"],
//   // },
//   base_sepolia: {
//     chainId: `0x${Number(84532).toString(16)}`, // Base Sepolia Testnet
//     chainName: "Base Sepolia",
//     nativeCurrency: {
//       name: "Ethereum",
//       symbol: "ETH",
//       decimals: 18,
//     },
//     rpcUrls: ["https://sepolia.base.org"],
//     blockExplorerUrls: ["https://sepolia.etherscan.io"], // Corrected URL
//   },
//   localhost: {
//     chainId: `0x${Number(31337).toString(16)}`, // Localhost network
//     chainName: "localhost",
//     nativeCurrency: {
//       name: "GO",
//       symbol: "GO",
//       decimals: 18,
//     },
//     rpcUrls: ["http://127.0.0.1:8545/"],
//     blockExplorerUrls: ["https://bscscan.com"], // Leave as example, but adjust for local network
//   },
// };

// const changeNetwork = async ({ networkName }) => {
//     try {
//       if (!window.ethereum) throw new Error("No crypto wallet found");
//       await window.ethereum.request({
//         method: "wallet_addEthereumChain",
//         params: [
//           {
//             ...networks[networkName],
//           },
//         ],
//       });
//     } catch (err) {
//       console.log(err.message);
//     }
//   };
  
//   export const handleNetworkSwitch = async () => {
//     const networkName = "base_sepolia";
//     await changeNetwork({ networkName });
//   };
  
//   export const checkIfWalletConnected = async () => {
//     if (!window.ethereum) return console.log("Please Install MetaMask");
//     const network = await handleNetworkSwitch();
  
//     const account = await window.ethereum.request({ method: "eth_accounts" });
  
//     if (account.length) {
//       return account[0];
//     } else {
//       console.log("Please Install MetaMask & Connect, Reload");
//     }
//   };
  
//   export const connectWallet = async () => {
//     try {
//       if (!window.ethereum) return alert("Please install MetaMask");
//       const network = await handleNetworkSwitch();
//       const accounts = await window.ethereum.request({
//         method: "eth_requestAccounts",
//       });
  
//       return accounts[0];
//     } catch (error) {
//       console.log(error);
//     }
//   };

// // Function to switch network
// // const changeNetwork = async ({ networkName }) => {
// //   try {
// //     if (!window.ethereum) throw new Error("No crypto wallet found");
    
// //     // Switch network using wallet_addEthereumChain
// //     await window.ethereum.request({
// //       method: "wallet_addEthereumChain",
// //       params: [
// //         {
// //           chainId: networks[networkName].chainId,
// //           chainName: networks[networkName].chainName,
// //           nativeCurrency: networks[networkName].nativeCurrency,
// //           rpcUrls: networks[networkName].rpcUrls,
// //           blockExplorerUrls: networks[networkName].blockExplorerUrls,
// //         },
// //       ],
// //     });
// //   } catch (error) {
// //     console.error("Failed to switch network:", error);
// //   }
// // };

// // // Exported function to handle network switch
// // export const handleNetworkSwitch = async (networkName = "sepolia") => {
// //   await changeNetwork({ networkName });
// // };

// // // Check if MetaMask is connected and on the right network
// // export const checkIfWalletConnected = async () => {
// //   try {
// //     if (!window.ethereum) return console.log("Please install MetaMask");

// //     // Ensure correct network
// //     await handleNetworkSwitch();

// //     const accounts = await window.ethereum.request({ method: "eth_accounts" });

// //     if (accounts.length > 0) {
// //       return accounts[0];
// //     } else {
// //       console.log("No accounts found. Connect MetaMask.");
// //     }
// //   } catch (error) {
// //     console.error("Error checking wallet connection:", error);
// //   }
// // };

// // // Connect wallet function
// // export const connectWallet = async () => {
// //   try {
// //     if (!window.ethereum) return alert("Please install MetaMask");

// //     // Ensure correct network
// //     await handleNetworkSwitch();

// //     const accounts = await window.ethereum.request({
// //       method: "eth_requestAccounts",
// //     });

// //     return accounts[0];
// //   } catch (error) {
// //     console.error("Error connecting wallet:", error);
// //   }
// // };

// // import { ethers } from "ethers";
// // import Web3Modal from "web3modal";
// // import axios from "axios";

// // import socialMediaDapp from "./SocialMediaDapp.json";

// // export const CONTRACT_ABI = socialMediaDapp.abi;
// // export const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// // //PINATA KEYS
// // export const PINATA_API_KEY = "API_KEY";
// // export const PINATA_SECRECT_KEY = "SECERCT_KEY";

// // //NETWORK
// // const networks = {
// //   polygon_amoy: {
// //     chainId: `0x${Number(80002).toString(16)}`,
// //     chainName: "Polygon Amoy",
// //     nativeCurrency: {
// //       name: "MATIC",
// //       symbol: "MATIC",
// //       decimals: 18,
// //     },
// //     rpcUrls: ["https://rpc-amoy.polygon.technology/"],
// //     blockExplorerUrls: ["https://www.oklink.com/amoy"],
// //   },
// //   polygon_mumbai: {
// //     chainId: `0x${Number(80001).toString(16)}`,
// //     chainName: "Polygon Mumbai",
// //     nativeCurrency: {
// //       name: "MATIC",
// //       symbol: "MATIC",
// //       decimals: 18,
// //     },
// //     rpcUrls: ["https://rpc.ankr.com/polygon_mumbai"],
// //     blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
// //   },
// //   polygon: {
// //     chainId: `0x${Number(137).toString(16)}`,
// //     chainName: "Polygon Mainnet",
// //     nativeCurrency: {
// //       name: "MATIC",
// //       symbol: "MATIC",
// //       decimals: 18,
// //     },
// //     rpcUrls: ["https://rpc.ankr.com/polygon"],
// //     blockExplorerUrls: ["https://polygonscan.com/"],
// //   },
// //   bsc: {
// //     chainId: `0x${Number(56).toString(16)}`,
// //     chainName: "Binance Smart Chain Mainnet",
// //     nativeCurrency: {
// //       name: "Binance Chain Native Token",
// //       symbol: "BNB",
// //       decimals: 18,
// //     },
// //     rpcUrls: ["https://rpc.ankr.com/bsc"],
// //     blockExplorerUrls: ["https://bscscan.com"],
// //   },
// //   base_mainnet: {
// //     chainId: `0x${Number(8453).toString(16)}`,
// //     chainName: "Base Mainnet",
// //     nativeCurrency: {
// //       name: "ETH",
// //       symbol: "ETH",
// //       decimals: 18,
// //     },
// //     rpcUrls: ["https://mainnet.base.org/"],
// //     blockExplorerUrls: ["https://bscscan.com"],
// //   },
// //   base_sepolia: {
// //     chainId: `0x${Number(84532).toString(16)}`,
// //     chainName: "Base Sepolia",
// //     nativeCurrency: {
// //       name: "ETH",
// //       symbol: "ETH",
// //       decimals: 18,
// //     },
// //     rpcUrls: ["https://sepolia.base.org"],
// //     blockExplorerUrls: ["https://bscscan.com"],
// //   },
// //   localhost: {
// //     chainId: `0x${Number(31337).toString(16)}`,
// //     chainName: "localhost",
// //     nativeCurrency: {
// //       name: "GO",
// //       symbol: "GO",
// //       decimals: 18,
// //     },
// //     rpcUrls: ["http://127.0.0.1:8545/"],
// //     blockExplorerUrls: ["https://bscscan.com"],
// //   },
// // };

// // const changeNetwork = async ({ networkName }) => {
// //   try {
// //     if (!window.ethereum) throw new Error("No crypto wallet found");
// //     await window.ethereum.request({
// //       method: "wallet_addEthereumChain",
// //       params: [
// //         {
// //           ...networks[networkName],
// //         },
// //       ],
// //     });
// //   } catch (err) {
// //     console.log(err.message);
// //   }
// // };

// // export const handleNetworkSwitch = async () => {
// //   const networkName = "polygon_amoy";
// //   await changeNetwork({ networkName });
// // };

// // export const checkIfWalletConnected = async () => {
// //   if (!window.ethereum) return console.log("Please Install MetaMask");
// //   const network = await handleNetworkSwitch();

// //   const account = await window.ethereum.request({ method: "eth_accounts" });

// //   if (account.length) {
// //     return account[0];
// //   } else {
// //     console.log("Please Install MetaMask & Connect, Reload");
// //   }
// // };

// // export const connectWallet = async () => {
// //   try {
// //     if (!window.ethereum) return alert("Please install MetaMask");
// //     const network = await handleNetworkSwitch();
// //     const accounts = await window.ethereum.request({
// //       method: "eth_requestAccounts",
// //     });

// //     return accounts[0];
// //   } catch (error) {
// //     console.log(error);
// //   }
// // };
