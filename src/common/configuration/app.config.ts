const appConfig = {
  api: {
    url: process.env.NEXT_PUBLIC_LEDA_API_URL,
  },
  pinataGatewayUrl: process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL,
  imageUrl: `https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}/ipfs/`,
};

export default appConfig;
